# Guardian Companion: Multi-Skill Copilot Architecture
**Version 1.0** | Author: Captain Leif William Sogge (Space LEAF Corp)  
**Last Updated:** June 2026

---

## 🎯 System Overview

Guardian Companion is a **privacy-first, multi-skill AI copilot framework** designed for:
- **Families** with kids and elderly users
- **Modular AI skills** orchestrated by the Jarvondis engine
- **Guardian Mode** for child safety with real-time parental oversight
- **Secure local-first** architecture with opt-in cloud features
- **Emotional-state awareness** tuned to user wellbeing

---

## 📦 System Layers

```
┌─────────────────────────────────────────────────────┐
│          USER INTERFACE LAYER                       │
│  (Browser/Mobile Frontend - realm-based navigation) │
└────────────────┬────────────────────────────────────┘
                 │
┌─────────────────┼────────────────────────────────────┐
│  GUARDIAN MODE LAYER                                │
│  (Parental Controls, Safety Filters, Ratings)       │
└────────────────┬────────────────────────────────────┘
                 │
┌─────────────────┼────────────────────────────────────┐
│  SKILL ORCHESTRATION LAYER (Jarvondis Engine)       │
│  (Routing, Auth, Context Management)                │
└────────────────┬────────────────────────────────────┘
                 │
┌─────────────────┼────────────────────────────────────┐
│  SKILL MODULES                                      │
│  ┌──────────┬──────────┬──────────┬──────────────┐  │
│  │Research  │Creative  │Learning  │Productivity │  │
│  │& Curation│Assistant │Tutor     │Helper       │  │
│  └──────────┴──────────┴──────────┴──────────────┘  │
└────────────────┬────────────────────────────────────┘
                 │
┌─────────────────┼────────────────────────────────────┐
│  LOCAL DATA LAYER                                   │
│  (Encrypted Cache, User Profiles, Emotional State)  │
└────────────────┬────────────────────────────────────┘
                 │
┌─────────────────┼────────────────────────────────────┐
│  SECURITY LAYER                                     │
│  (Encryption, Token Management, Firewall)           │
└─────────────────────────────────────────────────────┘
```

---

## 🗂️ Directory Structure

```
Guardian-Companion/
├── src/
│   ├── core/
│   │   ├── jarvondis-engine.ts         # Main AI orchestrator
│   │   ├── skill-manager.ts            # Skill lifecycle & routing
│   │   ├── context-store.ts            # User context, memory
│   │   └── emotional-state.ts          # Emotion tracking
│   │
│   ├── skills/
│   │   ├── research/
│   │   │   ├── curator.ts              # Research aggregator
│   │   │   ├── sources.ts              # Source validation
│   │   │   └── index.ts
│   │   ├── creative/
│   │   │   ├── brainstorm.ts           # Ideation assistant
│   │   │   ├── storyteller.ts          # Story generation
│   │   │   └── index.ts
│   │   ├── learning/
│   │   │   ├── tutor.ts                # Educational guidance
│   │   │   ├── assessment.ts           # Knowledge testing
│   │   │   └── index.ts
│   │   ├── productivity/
│   │   │   ├── planner.ts              # Task management
│   │   │   ├── scheduler.ts            # Calendar & scheduling
│   │   │   └── index.ts
│   │   └── index.ts                    # Skill registry
│   │
│   ├── guardian/
│   │   ├── mode-controller.ts          # Guardian Mode toggle
│   │   ├── safety-filter.ts            # Content filtering
│   │   ├── parental-dashboard.ts       # Parent oversight UI
│   │   ├── activity-logger.ts          # Safe audit trail
│   │   ├── ratings-engine.ts           # Content ratings (ESRB-like)
│   │   └── index.ts
│   │
│   ├── security/
│   │   ├── auth.ts                     # Local token auth
│   │   ├── encryption.ts               # Data encryption
│   │   ├── firewall.ts                 # Input/output filters
│   │   ├── token-manager.ts            # Token lifecycle
│   │   └── index.ts
│   │
│   ├── realms/
│   │   ├── home-realm.ts               # Home UI realm
│   │   ├── family-grove.ts             # Family connection realm
│   │   ├── diagnostics.ts              # System diagnostics realm
│   │   ├── seasonal-realms.ts          # Seasonal UI modes
│   │   └── index.ts
│   │
│   ├── storage/
│   │   ├── local-db.ts                 # IndexedDB wrapper
│   │   ├── encryption-store.ts         # Encrypted data vault
│   │   ├── user-profiles.ts            # User data schemas
│   │   └── index.ts
│   │
│   ├── api/
│   │   ├── http-server.ts              # Express/Fastify server
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── skills.ts
│   │   │   ├── guardian.ts
│   │   │   ├── realms.ts
│   │   │   └── index.ts
│   │   └── middleware/
│   │       ├── auth-middleware.ts
│   │       ├── guardian-middleware.ts
│   │       ├── error-handler.ts
│   │       └── index.ts
│   │
│   ├── ui/
│   │   ├── components/
│   │   │   ├── SkillPanel.tsx          # Skill UI wrapper
│   │   │   ├── GuardianMode.tsx        # Guardian UI
│   │   │   ├── ParentalDashboard.tsx   # Parent controls
│   │   │   ├── RealmNav.tsx            # Realm navigation
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── SkillsPage.tsx
│   │   │   ├── GuardianSetup.tsx
│   │   │   └── index.ts
│   │   └── App.tsx                     # Main app
│   │
│   └── index.ts                        # App entry point
│
├── ai_companion_core/                  # Jarvondis model definitions
│   ├── model-config.ts
│   ├── prompts/
│   ├── personas/
│   └── index.ts
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── security/
│   └── fixtures/
│
├── docs/
│   ├── SETUP.md                        # Installation guide
│   ├── SKILLS.md                       # Skill development
│   ├── GUARDIAN-MODE.md                # Guardian Mode docs
│   ├── PARENTAL-CONTROLS.md            # Parental setup
│   ├── SECURITY.md                     # Security architecture
│   └── API.md                          # API reference
│
├── scripts/
│   ├── setup.ts                        # Project initialization
│   ├── generate-tokens.ts              # Token generation
│   ├── seed-data.ts                    # Test data
│   └── build.ts                        # Build pipeline
│
├── config/
│   ├── env.example                     # Environment template
│   ├── jarvondis.config.ts             # Jarvondis settings
│   ├── guardian.config.ts              # Guardian Mode config
│   └── security.config.ts              # Security settings
│
├── .github/
│   └── workflows/
│       ├── test.yml
│       ├── security-audit.yml
│       └── build.yml
│
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
├── vite.config.ts                      # Vite build config
├── jest.config.js                      # Test runner
└── README.md                           # Project README
```

---

## 🧠 Jarvondis Engine (Core AI Orchestrator)

### Purpose
The **Jarvondis Engine** is the intelligent core that:
1. Routes user queries to appropriate skills
2. Manages context across conversational turns
3. Enforces Guardian Mode safety filters
4. Maintains emotional-state awareness
5. Coordinates multi-skill workflows

### Key Methods

```typescript
class JarvondisEngine {
  // Analyze user intent and route to skills
  async routeQuery(userInput: string, context: UserContext): Promise<SkillRoute>
  
  // Execute a multi-step skill workflow
  async executeSkill(skillId: string, params: SkillParams): Promise<SkillResult>
  
  // Enforce safety filters in Guardian Mode
  async validateOutput(output: string, guardianMode: boolean): Promise<ValidatedOutput>
  
  // Track and update emotional state
  async updateEmotionalState(signals: EmotionalSignals): Promise<EmotionState>
  
  // Store & recall conversation memory
  async storeContext(turn: ConversationTurn): Promise<void>
  async recallContext(sessionId: string, limit: number): Promise<ConversationHistory>
}
```

---

## 🛡️ Guardian Mode Architecture

### Features
- **Real-time content filtering** with age-appropriate ratings
- **Parental dashboard** showing child activity & interests
- **Emotional safety** monitoring for overwhelm/distress signals
- **Time-based limits** on skill usage
- **Emergency mode** for rapid parental override

### Guardian Mode Flow

```typescript
interface GuardianModeConfig {
  enabled: boolean
  childAge: number
  contentRating: "E" | "T" | "M" | "A"  // ESRB-like
  skillsAllowed: string[]
  maxDailyMinutes: number
  bedtimeSchedule: { start: string; end: string }
  parentalAlerts: {
    emotionalDistress: boolean
    unusualActivity: boolean
    timeExceeded: boolean
  }
}

async function evaluateContentSafety(
  output: string,
  childAge: number,
  config: GuardianModeConfig
): Promise<{ safe: boolean; rating: string; flags?: string[] }>
```

---

## 🎯 Multi-Skill System

### Core Skills

#### 1. **Research & Curation**
- Aggregates information from trusted sources
- Validates credibility and citations
- Summarizes complex topics
- **Kid-Safe Version:** Filtered sources, simplified language, age-verified content

#### 2. **Creative Assistant**
- Brainstorming and ideation
- Storytelling and narrative structure
- Poetry and creative writing
- **Kid-Safe:** Fantasy-focused, no dark themes, encourages imagination

#### 3. **Learning Tutor**
- Subject tutoring (math, science, history, languages)
- Adaptive difficulty
- Knowledge assessment
- **Kid-Safe:** Encouragement-based, positive reinforcement, progress tracking

#### 4. **Productivity Helper**
- Task planning and decomposition
- Schedule management
- Focus timers and notifications
- **Kid-Safe:** Age-appropriate tasks, celebration of small wins

### Skill Interface

```typescript
interface Skill {
  id: string
  name: string
  description: string
  version: string
  
  // Metadata
  author: string
  tags: string[]
  dependencies: string[]
  
  // Config
  maxContextLength: number
  emotionalStates: string[]  // Compatible emotions
  ageRestriction?: { min: number; max?: number }
  
  // Methods
  canExecute(context: UserContext): Promise<boolean>
  execute(input: SkillInput): Promise<SkillResult>
  validate(output: SkillResult): Promise<boolean>
}
```

---

## 🔐 Security & Privacy Architecture

### Principles
1. **Local-first by default** — no cloud sync without explicit opt-in
2. **End-to-end encryption** for all user data
3. **Zero PII in logs** — hashed identifiers only
4. **Capability-based auth** — granular token scopes
5. **Firewall overlay** — validates all inputs/outputs

### Security Layers

```typescript
// Token & Capability-Based Auth
interface CapabilityToken {
  userId: string  // hashed
  skills: string[]
  permissions: string[]
  expiresAt: Date
  issuedAt: Date
  signature: string
}

// Encryption for Local Storage
async function encryptData(data: any, key: string): Promise<Buffer>
async function decryptData(buffer: Buffer, key: string): Promise<any>

// Input/Output Firewall
async function validateInput(input: string, mode: "kid" | "adult"): Promise<boolean>
async function filterOutput(output: string, guardianConfig: GuardianModeConfig): Promise<string>
```

---

## 👨‍👩‍👧 Parental Controls Dashboard

### Features
- **Activity Log** — what child asked, which skills used, time spent
- **Content Filter Settings** — customize allowed skills and content ratings
- **Time Limits** — set daily/weekly usage limits
- **Emotional Insights** — trends in child's emotional states
- **Skill Permissions** — granular enable/disable per skill
- **Emergency Pause** — instantly disable copilot
- **Weekly Reports** — summaries of learning & interests

### Dashboard Structure

```typescript
interface ParentalDashboard {
  childProfiles: ChildProfile[]
  activityLog: ActivityEntry[]
  contentFilters: ContentFilterConfig
  timeSchedule: ScheduleConfig
  emotionalTrends: EmotionalTrendData[]
  skillPermissions: Map<string, boolean>
  emergencyControls: EmergencyControlPanel
}

interface ActivityEntry {
  timestamp: Date
  childId: string
  skillUsed: string
  query: string  // sanitized
  duration: number
  emotionalState: string
  flagged?: boolean
}
```

---

## 🌳 Realm-Based UI Navigation

### Realms
1. **Home Realm** — Main dashboard, family check-ins
2. **Family Grove** — Shared family space, emotional check-ins, rituals
3. **Skill Lab** — Access individual skills with visual interfaces
4. **Diagnostics** — System health, data privacy status, parental controls
5. **Seasonal Realms** — UI themes tied to seasons/emotions

---

## 📊 Emotional State Tracking

```typescript
interface EmotionalState {
  primary: "Calm" | "Boundary" | "Overwhelm" | "Active" | "Insight" | "Growth"
  secondary: string[]
  confidence: number  // 0-1
  signals: {
    queryLength: number
    responseTime: number
    retryCount: number
    pauseBetweenTurns: number
  }
  timestamp: Date
}

// Detects signs of overwhelm or distress
async function detectEmotionalDistress(
  signals: EmotionalSignals
): Promise<{ distressed: boolean; recommendation?: string }>
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A modern browser (Chrome, Firefox, Safari, Edge)

### Installation
1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment: `cp config/env.example .env.local`
4. Generate security tokens: `npm run generate-tokens`
5. Build: `npm run build`
6. Start: `npm start`

### First Run
1. Parent creates account & sets Guardian Mode preferences
2. Parent creates child profile with age & safety settings
3. Child logs in with generated child token
4. Onboarding wizard introduces realms and skills
5. Parent reviews parental dashboard

---

## 📈 Development Roadmap

### Phase 1: Foundation (June-July 2026)
- [x] Architecture design
- [ ] Core Jarvondis engine
- [ ] Basic skill framework
- [ ] Guardian Mode MVP
- [ ] Local storage encryption

### Phase 2: Skills & Safety (July-August 2026)
- [ ] 4 core skills fully functional
- [ ] Parental dashboard complete
- [ ] Safety filter refinement
- [ ] Emotional state tracking
- [ ] Activity logging

### Phase 3: Polish & Testing (August-September 2026)
- [ ] UI/UX refinement
- [ ] Security audit
- [ ] Accessibility testing
- [ ] Performance optimization
- [ ] Documentation complete

### Phase 4: Extension (September-October 2026)
- [ ] Cloud sync (opt-in)
- [ ] Multi-device support
- [ ] Advanced skills
- [ ] Family ceremonies framework
- [ ] Mobile app

---

## 📚 Documentation

See these files for detailed information:
- **SETUP.md** — Installation and configuration
- **SKILLS.md** — Creating and customizing skills
- **GUARDIAN-MODE.md** — Guardian Mode implementation
- **PARENTAL-CONTROLS.md** — Parent dashboard features
- **SECURITY.md** — Security practices and principles
- **API.md** — Backend API reference

---

## 🛠️ Contributing

This project is maintained by Space LEAF Corp. For contributions:
1. Fork the repository
2. Create a feature branch
3. Ensure all tests pass
4. Submit a pull request
5. Participate in security review

---

## ⚖️ License

BSD 3-Clause License (See LICENSE file)

---

**Last Updated:** June 29, 2026  
**Status:** In Active Development  
**Contact:** Captain Leif William Sogge (Space LEAF Corp)
