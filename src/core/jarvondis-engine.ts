/**
 * JARVONDIS ENGINE - Multi-Skill AI Orchestrator
 * 
 * Core intelligent system that:
 * - Routes queries to appropriate skills
 * - Manages conversational context & memory
 * - Enforces Guardian Mode safety
 * - Tracks emotional state
 * - Coordinates multi-skill workflows
 */

import { EventEmitter } from "events";
import { SkillManager } from "./skill-manager";
import { ContextStore } from "./context-store";
import { EmotionalState, EmotionalStateTracker } from "./emotional-state";
import { SecurityLayer } from "../security/firewall";

/**
 * User context and state
 */
export interface UserContext {
  userId: string; // hashed
  sessionId: string;
  role: "parent" | "child" | "admin";
  age?: number;
  guardianModeEnabled: boolean;
  emotionalState: EmotionalState;
  preferences: UserPreferences;
  conversationHistory: ConversationTurn[];
}

export interface UserPreferences {
  skillsEnabled: string[];
  emotionalAwarenessLevel: "off" | "low" | "medium" | "high";
  contentRating: "E" | "T" | "M" | "A";
  dailyMinutes: number;
  bedtimeStart?: string;
  bedtimeEnd?: string;
}

/**
 * A single turn in conversation
 */
export interface ConversationTurn {
  id: string;
  timestamp: Date;
  userId: string;
  userMessage: string;
  skillUsed: string;
  skillResponse: string;
  emotionalState: EmotionalState;
  duration: number; // milliseconds
  flagged?: boolean;
  flagReason?: string;
}

/**
 * Skill routing result
 */
export interface SkillRoute {
  skillId: string;
  confidence: number; // 0-1
  reasoning: string;
  params: Record<string, any>;
  alternatives?: Array<{ skillId: string; confidence: number }>;
}

/**
 * Skill execution parameters
 */
export interface SkillParams {
  userQuery: string;
  context: UserContext;
  maxTokens?: number;
  temperature?: number;
  forceSkillId?: string; // Override auto-routing
}

/**
 * Skill execution result
 */
export interface SkillResult {
  id: string;
  skillId: string;
  success: boolean;
  output: string;
  metadata: {
    executionTime: number;
    tokensUsed?: number;
    sourcesCited?: string[];
    emotionalImpact?: string;
  };
  error?: {
    code: string;
    message: string;
    suggestion?: string;
  };
}

/**
 * Validated output (post-Guardian Mode filtering)
 */
export interface ValidatedOutput {
  safe: boolean;
  output: string;
  contentRating: string;
  flags: string[];
  modified: boolean;
}

/**
 * Jarvondis Engine - Main AI Orchestrator
 */
export class JarvondisEngine extends EventEmitter {
  private skillManager: SkillManager;
  private contextStore: ContextStore;
  private emotionalTracker: EmotionalStateTracker;
  private securityLayer: SecurityLayer;
  private maxContextHistory: number = 50;
  private routingModel: Map<string, number> = new Map(); // skill confidence cache

  constructor(
    skillManager: SkillManager,
    contextStore: ContextStore,
    emotionalTracker: EmotionalStateTracker,
    securityLayer: SecurityLayer
  ) {
    super();
    this.skillManager = skillManager;
    this.contextStore = contextStore;
    this.emotionalTracker = emotionalTracker;
    this.securityLayer = securityLayer;
    this.initializeRoutingModel();
  }

  /**
   * Initialize routing confidence weights
   */
  private initializeRoutingModel(): void {
    // Skills and their base routing weights
    const skillWeights = {
      "research": 0.85,
      "creative": 0.80,
      "learning": 0.88,
      "productivity": 0.82,
    };
    
    for (const [skill, weight] of Object.entries(skillWeights)) {
      this.routingModel.set(skill, weight);
    }
  }

  /**
   * Main entry point: Process user input and return response
   */
  async processUserInput(
    userMessage: string,
    params: SkillParams
  ): Promise<SkillResult> {
    const startTime = Date.now();
    const context = params.context;

    try {
      // 1. Validate input (security/firewall)
      const validatedInput = await this.securityLayer.validateInput(
        userMessage,
        context.guardianModeEnabled ? "kid" : "adult"
      );
      
      if (!validatedInput.safe) {
        return this.createErrorResult(
          "BLOCKED_INPUT",
          "Input contains potentially harmful content",
          "Please rephrase your question in a respectful way."
        );
      }

      // 2. Update emotional state
      const emotionalSignals = {
        messageLength: userMessage.length,
        messageType: this.classifyMessageType(userMessage),
        timestamp: new Date(),
      };
      context.emotionalState = await this.emotionalTracker.updateState(
        context.userId,
        emotionalSignals
      );

      // 3. Route to appropriate skill
      let skillRoute: SkillRoute;
      if (params.forceSkillId) {
        skillRoute = await this.createForcedRoute(params.forceSkillId, params);
      } else {
        skillRoute = await this.routeQuery(userMessage, context);
      }

      // 4. Check if skill is allowed in Guardian Mode
      if (context.guardianModeEnabled) {
        const allowed = await this.checkSkillPermission(
          skillRoute.skillId,
          context
        );
        if (!allowed) {
          return this.createErrorResult(
            "SKILL_BLOCKED",
            `The ${skillRoute.skillId} skill is not available in Guardian Mode`,
            "Ask a parent to enable this skill."
          );
        }
      }

      // 5. Check time limits in Guardian Mode
      if (context.guardianModeEnabled) {
        const timeOk = await this.checkTimeLimit(context);
        if (!timeOk) {
          return this.createErrorResult(
            "TIME_LIMIT_EXCEEDED",
            "Daily time limit reached",
            "Come back tomorrow or ask a parent to adjust your time limits."
          );
        }
      }

      // 6. Execute skill
      const skillResult = await this.skillManager.executeSkill(
        skillRoute.skillId,
        {
          query: userMessage,
          context: context,
          params: skillRoute.params,
          maxTokens: params.maxTokens || 500,
          temperature: params.temperature || 0.7,
        }
      );

      if (!skillResult.success) {
        return skillResult;
      }

      // 7. Validate and filter output through Guardian Mode if enabled
      let finalOutput = skillResult.output;
      let validatedOutput: ValidatedOutput;

      if (context.guardianModeEnabled) {
        validatedOutput = await this.validateOutput(
          skillResult.output,
          context.preferences
        );
        finalOutput = validatedOutput.output;

        // Flag if content was modified
        if (validatedOutput.modified) {
          this.emit("output_modified", {
            userId: context.userId,
            original: skillResult.output,
            modified: finalOutput,
            reason: validatedOutput.flags,
          });
        }
      }

      // 8. Store conversation turn
      const turn: ConversationTurn = {
        id: `turn-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        userId: context.userId,
        userMessage: userMessage,
        skillUsed: skillRoute.skillId,
        skillResponse: finalOutput,
        emotionalState: context.emotionalState,
        duration: Date.now() - startTime,
        flagged: validatedOutput?.flags?.length > 0 || false,
        flagReason: validatedOutput?.flags?.join(", ") || undefined,
      };

      await this.contextStore.storeTurn(context.sessionId, turn);

      // 9. Return final result
      return {
        id: turn.id,
        skillId: skillRoute.skillId,
        success: true,
        output: finalOutput,
        metadata: {
          executionTime: turn.duration,
          tokensUsed: skillResult.metadata.tokensUsed,
          sourcesCited: skillResult.metadata.sourcesCited,
          emotionalImpact: context.emotionalState.primary,
        },
      };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return this.createErrorResult(
        "ENGINE_ERROR",
        `Error processing request: ${errorMessage}`,
        "Please try again or contact support."
      );
    }
  }

  /**
   * Route user query to most appropriate skill
   */
  async routeQuery(userMessage: string, context: UserContext): Promise<SkillRoute> {
    // Keywords for each skill
    const skillKeywords: Record<string, string[]> = {
      "research": [
        "research", "find", "look up", "sources", "information",
        "how do", "what is", "explain", "tell me about"
      ],
      "creative": [
        "write", "story", "poem", "idea", "brainstorm", "create",
        "imagine", "design", "make", "generate"
      ],
      "learning": [
        "teach", "learn", "math", "science", "history", "quiz",
        "explain", "help me understand", "tutor", "lesson"
      ],
      "productivity": [
        "plan", "schedule", "task", "organize", "manage", "track",
        "deadline", "calendar", "remind", "break down"
      ],
    };

    const lowerMessage = userMessage.toLowerCase();
    const scores: Record<string, number> = {};

    // Score each skill based on keyword matches
    for (const [skillId, keywords] of Object.entries(skillKeywords)) {
      let score = this.routingModel.get(skillId) || 0;
      const matchCount = keywords.filter((kw) =>
        lowerMessage.includes(kw)
      ).length;
      score += matchCount * 0.1;
      scores[skillId] = Math.min(score, 1.0);
    }

    // Find highest scoring skill
    const topSkill = Object.entries(scores).sort(([, a], [, b]) => b - a)[0];
    const topSkillId = topSkill[0];
    const topConfidence = topSkill[1];

    // Get alternatives
    const alternatives = Object.entries(scores)
      .filter(([id]) => id !== topSkillId)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([id, conf]) => ({ skillId: id, confidence: conf }));

    return {
      skillId: topSkillId,
      confidence: topConfidence,
      reasoning: `Routed to ${topSkillId} based on keyword analysis (${Math.round(
        topConfidence * 100
      )}% confidence).`,
      params: {},
      alternatives,
    };
  }

  /**
   * Check if a skill is allowed in Guardian Mode
   */
  private async checkSkillPermission(
    skillId: string,
    context: UserContext
  ): Promise<boolean> {
    return context.preferences.skillsEnabled.includes(skillId);
  }

  /**
   * Check if user has time remaining today
   */
  private async checkTimeLimit(context: UserContext): Promise<boolean> {
    if (!context.preferences.dailyMinutes) {
      return true; // No limit set
    }

    const today = new Date().toDateString();
    const history = await this.contextStore.getTurnsForDay(
      context.sessionId,
      today
    );
    const totalMinutes = history.reduce(
      (sum, turn) => sum + turn.duration / 60000,
      0
    );

    return totalMinutes < context.preferences.dailyMinutes;
  }

  /**
   * Validate and filter output through Guardian Mode
   */
  async validateOutput(
    output: string,
    preferences: UserPreferences
  ): Promise<ValidatedOutput> {
    const flags: string[] = [];
    let modified = false;
    let filteredOutput = output;

    // Check for content based on age rating
    const contentChecks = await this.securityLayer.validateOutput(
      output,
      preferences.contentRating
    );

    if (!contentChecks.safe) {
      flags.push(...contentChecks.flags);
      modified = true;
      // Apply filtering/redaction
      filteredOutput = await this.securityLayer.filterContent(
        output,
        preferences.contentRating
      );
    }

    return {
      safe: contentChecks.safe,
      output: filteredOutput,
      contentRating: preferences.contentRating,
      flags,
      modified,
    };
  }

  /**
   * Store & recall conversation memory
   */
  async storeContext(turn: ConversationTurn): Promise<void> {
    await this.contextStore.storeTurn(turn.userId, turn);
  }

  async recallContext(
    sessionId: string,
    limit: number = 10
  ): Promise<ConversationTurn[]> {
    return this.contextStore.getTurns(sessionId, limit);
  }

  /**
   * Get user context summary
   */
  async getContextSummary(sessionId: string): Promise<string> {
    const turns = await this.recallContext(sessionId, 5);
    return turns
      .map(
        (t) =>
          `User: ${t.userMessage}\nAssistant (${t.skillUsed}): ${t.skillResponse}`
      )
      .join("\n---\n");
  }

  /**
   * Classify message type (question, command, etc.)
   */
  private classifyMessageType(message: string): string {
    if (message.endsWith("?")) return "question";
    if (
      message.startsWith("please") ||
      message.startsWith("can you") ||
      message.startsWith("could you")
    )
      return "request";
    if (message.length < 20) return "short";
    return "statement";
  }

  /**
   * Create forced skill route
   */
  private async createForcedRoute(
    skillId: string,
    params: SkillParams
  ): Promise<SkillRoute> {
    return {
      skillId,
      confidence: 1.0,
      reasoning: `Forced to use ${skillId} skill.`,
      params: {},
    };
  }

  /**
   * Helper: create error result
   */
  private createErrorResult(
    code: string,
    message: string,
    suggestion: string
  ): SkillResult {
    return {
      id: `error-${Date.now()}`,
      skillId: "system",
      success: false,
      output: message,
      metadata: {
        executionTime: 0,
      },
      error: {
        code,
        message,
        suggestion,
      },
    };
  }

  /**
   * Emit event for monitoring/logging
   */
  emitEvent(eventType: string, data: any): void {
    this.emit(eventType, data);
  }
}

export default JarvondisEngine;
