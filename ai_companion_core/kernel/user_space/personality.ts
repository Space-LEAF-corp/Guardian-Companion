// user_space/personality/personality.ts
export interface PersonalityConfig {
  id: string;
  ownerId: string;
  name: string;              // "Gentle Mentor", "Direct Coach"
  style: 'warm' | 'clinical' | 'playful';
  systemPrompt: string;      // injected into base intelligence
  boundaries: string[];      // extra constraints per personality
}

export interface PersonalityManager {
  getActive(ownerId: string, companionId: string): Promise<PersonalityConfig>;
  switch(ownerId: string, companionId: string, personalityId: string): Promise<void>;
}
