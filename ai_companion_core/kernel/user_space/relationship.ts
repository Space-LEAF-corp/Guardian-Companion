export interface RelationshipEvent {
  id: string;
  ownerId: string;
  companionId: string;
  kind: 'milestone' | 'repair' | 'checkin';
  note: string;
  emotionalTone: 'positive' | 'neutral' | 'strained';
  createdAt: string;
}

export interface RelationshipHistory {
  log(event: RelationshipEvent): Promise<void>;
  getTimeline(ownerId: string, companionId: string): Promise<RelationshipEvent[]>;
  reset(ownerId: string, companionId: string): Promise<void>; // user-triggered reset
}
