// kernel/base_intelligence/engine.ts
export interface ReasoningEngine {
  respond(input: string, context: any): Promise<string>;
}
