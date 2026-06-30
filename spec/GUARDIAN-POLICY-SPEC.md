Guardian Policy Specification 1.0
1. Policy Format
Policies are defined in JSON or YAML.

Example
json
{
  "id": "child-content-filter",
  "roles": ["CHILD"],
  "rules": [
    { "type": "block", "category": "violence" },
    { "type": "block", "category": "fear" },
    { "type": "allow", "category": "educational" }
  ]
}
2. Rule Types
allow — explicitly permitted

block — explicitly denied

flag — requires emotional safety evaluation

transform — sanitize or redact

3. Categories
violence

fear

exploitation

unsafe-communication

educational

neutral

4. Evaluation Model
Identify user role

Load applicable policies

Evaluate rules in priority order

Return decision object

Log via AuditTrail
