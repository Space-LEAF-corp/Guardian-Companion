// user_space/identity/models.ts
export interface UserProfile {
  id: string;
  handle: string;
  createdAt: string;
}

export interface CompanionProfile {
  id: string;
  ownerId: string;
  label: string;          // "Studio Coach", "Guardian", etc.
  activePersonalityId: string;
}
