// kernel/safety_layer/safety_pipeline.ts
export interface SafetyPipeline {
  preCheck(input: string, userId: string): Promise<void>;
  postCheck(output: string, userId: string): Promise<string>;
}
