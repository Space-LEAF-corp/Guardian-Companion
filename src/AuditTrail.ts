import { AuditEvent } from './types';

export class AuditTrail {
  private events: AuditEvent[] = [];

  log(event: AuditEvent): void {
    this.events.push(event);
    // In future: send to storage, encryption, remote relay, etc.
  }

  getEvents(): AuditEvent[] {
    return this.events;
  }
}
