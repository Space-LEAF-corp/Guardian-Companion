Guardian Audit Specification 1.0
1. Event Schema
json
{
  "timestamp": "ISO-8601",
  "event": "string",
  "severity": "INFO | WARN | BLOCK | CRITICAL",
  "role": "CHILD | PARENT | SYSTEM",
  "metadata": {
    "category": "string",
    "redacted": true
  }
}
2. Severity Levels
INFO — normal operation

WARN — suspicious or borderline

BLOCK — policy violation

CRITICAL — severe emotional or safety risk

3. Redaction Rules
All child-related metadata must be redacted

Sensitive categories must be tokenized

No raw content stored

4. Storage
Local-first

Optional encryption layer

Optional remote relay for starship systems
