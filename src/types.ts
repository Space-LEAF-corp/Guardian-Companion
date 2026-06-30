export type Role = 'CHILD' | 'PARENT' | 'SYSTEM';

export type DataCategory =
  | 'PUBLIC'
  | 'SENSITIVE'
  | 'CHILD'
  | 'VIOLENCE'
  | 'FEAR'
  | 'EXPLOITATION'
  | 'EDUCATIONAL'
  | 'NEUTRAL';

export interface GuardianRequest {
  role: Role;
  category: DataCategory;
  action: string;
  metadata?: Record<string, unknown>;
}

export interface GuardianDecision {
  allowed: boolean;
  reason: string;
  guidance?: string;
}

export interface AuditEvent {
  timestamp: string;
  event: string;
  severity: 'INFO' | 'WARN' | 'BLOCK' | 'CRITICAL';
  role: Role;
  metadata?: Record<string, unknown>;
}
