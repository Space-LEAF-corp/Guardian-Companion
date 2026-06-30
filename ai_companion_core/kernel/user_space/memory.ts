// user_space/memory/store.ts
export interface MemoryRecord {
  id: string;
  ownerId: string;
  companionId: string;
  type: 'fact' | 'preference' | 'event';
  content: string;
  tags: string[];
  createdAt: string;
}

export interface MemoryStore {
  save(record: MemoryRecord): Promise<void>;
  query(ownerId: string, companionId: string, tags: string[]): Promise<MemoryRecord[]>;
  exportAll(ownerId: string, companionId: string): Promise<Buffer>;   // user-owned export
  wipeRelationship(ownerId: string, companionId: string): Promise<void>; // reset
}
