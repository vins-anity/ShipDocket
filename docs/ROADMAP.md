# Trail AI Roadmap 🗺️

> **Strategic direction for Trail AI's development from V1 to Enterprise V2.**

---

## 📍 Current Status: V1 (Metadata-First SaaS)
**Goal:** Agencies can install in minutes and send clients Proof Packet links for invoices/updates.

### ✅ Completed
- **Core Security**: Metadata-First Architecture (No Source Code Access).
- **Onboarding**: GitHub App (Zero-Knowledge) + Jira/Slack Connection Gate.
- **Event Ingestion**: Webhook Router with optimized signature verification.
- **Data Integrity**: Hash-Chained Event Log (Tamper-Evident).
- **Proof Intelligence**: Basic "Smart Proof Packets" with AI Summaries.

### 🚧 In Progress / Next Up
1.  **Deployment**: Productionize on Fly.io/Render.
2.  **Polish**: Enhance Proof Packet Viewer for mobile/client experience.
3.  **Exports**: Generate PDF reports for billing attachments.

---

## 🔮 V1.1: The "Deep Proof" Layer
**Goal:** Stronger client evidence without becoming a "code auditor" or taking on liability.

- **GitHub Action Integration**:
  - Run a "Deep Proof" action on PR merge/release.
  - Generate sanctioned payloads: Dependency trees, Build/Test logs (Pass/Fail), Artifact Hashes.
  - **Security**: Action runs in user's CI; Trail only receives the *result* (sanitized JSON), never the source.
  
- **CLI Tool (`trail-cli`)**:
  - For agencies without GitHub Actions (e.g., Jenkins, GitLab CI).
  - Standardizes evidence submission from any environment.

---

## 🚀 V2: Enterprise & Self-Hosted
**Goal:** "Trail Appliance" for regulated industries and large agencies.

- **Dockerized Appliance**:
  - Full Trail stack (API + DB + Worker) in a single container.
  - Data stays on-prem; License key activation.
- **Custom Policy Engine**:
  - Allow agencies to write custom OPA (Open Policy Agent) rules for closure.
