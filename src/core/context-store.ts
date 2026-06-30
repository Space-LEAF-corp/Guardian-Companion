// Minimal in-memory ContextStore for development & tests

import type { ConversationTurn } from "./jarvondis-engine"; // types only if TS resolves; otherwise use any

type AnyTurn = any;

export class ContextStore {
  private store: Map<string, AnyTurn[]> = new Map();

  async storeTurn(sessionId: string, turn: AnyTurn): Promise<void> {
    const arr = this.store.get(sessionId) || [];
    arr.unshift(turn); // keep newest first
    // cap to a reasonable size
    if (arr.length > 200) arr.splice(200);
    this.store.set(sessionId, arr);
  }

  async getTurns(sessionId: string, limit = 10): Promise<AnyTurn[]> {
    const arr = this.store.get(sessionId) || [];
    return arr.slice(0, limit);
  }

  async getTurnsForDay(sessionId: string, _dayString: string): Promise<AnyTurn[]> {
    // Very small implementation: return all turns (no date partition)
    return this.getTurns(sessionId, 1000);
  }
}

export default ContextStore;
