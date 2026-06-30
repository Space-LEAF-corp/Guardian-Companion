GUARDIAN Dependency Lockdown Policy 1.0
A Space LEAF Corp Ceremonial Safety Standard

1. Purpose
The Guardian Dependency Lockdown Policy ensures that all software dependencies used by the Guardian-Companion engine are:

Verified

Version‑locked

Hash‑validated

Free from known vulnerabilities

Free from supply‑chain compromise

Safe for children, families, and crew

This policy protects the emotional, digital, and operational integrity of the Guardian ecosystem.

2. Core Principles
2.1 No Floating Versions
All dependencies must use exact version pins:

Code
"package-name": "1.2.3"
Not allowed:

"^1.2.3"

"~1.2.3"

"*"

"latest"

Floating versions introduce unpredictable behavior and supply‑chain risk.

2.2 Hash Verification Required
Every dependency must include an integrity hash in package-lock.json or npm-shrinkwrap.json.

This ensures:

The dependency cannot be silently replaced

The build is reproducible

The supply chain is cryptographically anchored

2.3 No Unreviewed Transitive Dependencies
Transitive dependencies must be scanned and approved via:

npm audit

OSS Index

CodeQL

If a transitive dependency is unsafe, the parent package must be replaced or patched.

2.4 No Deprecated or Unmaintained Packages
Any dependency that:

has not been updated in 18+ months

has unresolved CVEs

has abandoned maintainers

has unclear licensing

must be removed or replaced.

2.5 Emotional Safety Alignment
Dependencies that introduce:

dark patterns

manipulative UX

surveillance behavior

unbounded data collection

are prohibited.

This aligns with the Emotional Safety Standard 1.0 and the Seal of Guardianship.

3. Required Tools & Checks
3.1 Dependency Audit
Every commit to main, dev, or staging must pass:

npm audit --audit-level=moderate

OSS Index vulnerability scan

CodeQL static analysis

These are already integrated into your Guardian Security Scan Workflow.

3.2 Dependency Freeze
The following files must be committed and never ignored:

package-lock.json

npm-shrinkwrap.json (optional alternative)

These files enforce deterministic builds.

3.3 Approved Dependency List
A new file must be added:

Code
/docs/policies/APPROVED-DEPENDENCIES.json
This file lists:

allowed packages

allowed versions

allowed hashes

I can generate this next if you want.

4. Enforcement Rules
4.1 Development
Developers may propose new dependencies, but they must:

justify the need

provide security scan results

provide emotional safety justification

pin exact version

include integrity hash

4.2 Staging
Staging environment must:

validate dependency hashes

validate policy compliance

run full vulnerability scans

4.3 Production
Production environment must:

reject any dependency not in APPROVED-DEPENDENCIES.json

reject any dependency with unresolved CVEs

reject any dependency with mismatched integrity hash

5. Emergency Protocol
If a dependency is compromised:

Guardian enters Safe Mode

All risky modules are sandboxed

A CRITICAL audit event is logged

The dependency is immediately removed

A patch release is issued

The Seal of Modular Integrity is reaffirmed

6. Ceremonial Alignment
This policy is governed by:

Seal of Guardianship 1.0

Emotional Safety Standard 1.0

Seal of Modular Integrity 1.0

Seal of Full Transparency Unexpected 1.0

It ensures that every dependency respects the dignity of children, families, and crew.

7. Version
Guardian Dependency Lockdown Policy
Version 1.0 — June 29, 2026  
Ocala, Florida
Captain Leif W. Sogge, Steward of Space LEAF Corp
