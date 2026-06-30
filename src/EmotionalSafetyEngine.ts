import { GuardianRequest, GuardianDecision } from './types';

export type EmotionalRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface EmotionalSafetyConfig {
  enabled: boolean;
  riskLevels: {
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
  defaultGuidance: {
    HIGH: string;
    MEDIUM: string;
    LOW: string;
  };
}

export interface EmotionalSafetyContext {
  fearTriggers: string[];
  violenceTriggers: string[];
  isolationTriggers: string[];
  overstimulationTriggers: string[];
}

export interface EmotionalEvaluationResult {
  risk: EmotionalRiskLevel;
  score: number;
  guidance: string;
  reason: string;
}

export class EmotionalSafetyEngine {
  private config: EmotionalSafetyConfig;
  private context: EmotionalSafetyContext;

  constructor(config: EmotionalSafetyConfig, context: EmotionalSafetyContext) {
    this.config = config;
    this.context = context;
  }

  evaluate(request: GuardianRequest): EmotionalEvaluationResult {
    if (!this.config.enabled) {
      return {
        risk: 'LOW',
        score: 0,
        guidance: this.config.defaultGuidance.LOW,
        reason: 'EmotionalSafetyEngine: disabled in config'
      };
    }

    const score = this.computeScore(request);
    const risk = this.mapScoreToRisk(score);
    const guidance = this.config.defaultGuidance[risk];

    const reason = `EmotionalSafetyEngine: evaluated category ${request.category} with score ${score.toFixed(
      2
    )}`;

    return {
      risk,
      score,
      guidance,
      reason
    };
  }

  attachToDecision(
    request: GuardianRequest,
    decision: GuardianDecision
  ): GuardianDecision {
    const evaluation = this.evaluate(request);

    return {
      ...decision,
      guidance:
        decision.guidance ??
        `${evaluation.guidance} (Risk: ${evaluation.risk}, Reason: ${evaluation.reason})`
    };
  }

  private computeScore(request: GuardianRequest): number {
    let score = 0;

    switch (request.category) {
      case 'FEAR':
        score += 0.9;
        break;
      case 'VIOLENCE':
        score += 0.9;
        break;
      case 'EXPLOITATION':
        score += 0.8;
        break;
      case 'SENSITIVE':
        score += 0.6;
        break;
      case 'NEUTRAL':
        score += 0.3;
        break;
      case 'EDUCATIONAL':
        score += 0.1;
        break;
      case 'PUBLIC':
        score += 0.2;
        break;
      default:
        score += 0.2;
        break;
    }

    return Math.min(1, Math.max(0, score));
  }

  private mapScoreToRisk(score: number): EmotionalRiskLevel {
    if (score >= this.config.riskLevels.HIGH) {
      return 'HIGH';
    }
    if (score >= this.config.riskLevels.MEDIUM) {
      return 'MEDIUM';
    }
    return 'LOW';
  }
}
