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
      params: {} as Record<string, unknown>,
      alternatives,
    };
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
      params: {} as Record<string, unknown>,
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
  emitEvent(eventType: string, data: unknown): void {
    this.emit(eventType, data);
  }
}

export default JarvondisEngine;
