export interface AvatarConfig {
  id: string;
  ownerId: string;
  companionId: string;
  style: '2D' | '3D' | 'text-only';
  theme: string; // "cosmic panther", "starship steward"
}
