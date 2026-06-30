export type EmotionalSignals = {
  messageLength?: number;
  [key: string]: unknown;
};

export type EmotionalState = {
  primary: "Calm" | "Boundary" | "Overwhelm" | "Active" | "Insight" | "Growth";
  secondary: string[];
  confidence: number;
  timestamp: Date;
};

export class EmotionalStateTracker {
  private states: Map<string, EmotionalState> = new Map();

  async updateState(userId: string, signals: EmotionalSignals): Promise<EmotionalState> {
    // Simple heuristic-based stub
    const len = typeof signals.messageLength === "number" ? signals.messageLength : 0;
    const primary = len > 200 ? "Overwhelm" : len > 80 ? "Active" : "Calm";
    const state: EmotionalState = {
      primary,
      secondary: [],
      confidence: 0.8,
      timestamp: new Date(),
    };
    this.states.set(userId, state);
    return state;
  }

  async getState(userId: string): Promise<EmotionalState | undefined> {
    return this.states.get(userId);
  }
}

export default EmotionalStateTracker;
