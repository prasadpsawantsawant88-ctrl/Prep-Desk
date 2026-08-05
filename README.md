# Prep Desk — Executive Interview Preparation Platform

Prep Desk is a personalized, comprehensive interview preparation platform tailored for high-stakes candidate preparation. It transforms target job descriptions (JDs) and candidate resumes into customized, actionable 8-section interview packages.

---

## 🚀 Key Modules & Capabilities

1. **Document 01 — Target Brief & AI Customizer**
   - Inputs target company, job title, job description, and resume/CV text.
   - Generates fully aligned, tailored preparation content across all 8 modules.

2. **Document 02 — Company & Market Research**
   - **Company & Culture Pillars**: Key strategic drivers and cultural values mapped to candidate expectations.
   - **CPCC Matrix**: Company, Product, Client Persona, and Top Competitors breakdown.
   - **Company Facts Tracker**: Track key metrics, recent developments, and strategic talking points.

3. **Document 03 — CV Alignment & RCR Bullets**
   - **Match Score & Fit Analysis**: Key strengths matching JD requirements, gaps to address, and critical keywords to surface.
   - **Role-Contribution-Result (RCR) Bullets**: Quantifiable, metrics-driven bullet rewrites addressing target role demands.

4. **Document 04 — Behavioral STAR Stories**
   - Structured **Situation, Task, Action, Result** stories for key leadership and execution scenarios.

5. **Document 05 — Comprehensive Q&A Bank**
   - Categorized questions (Behavioral, Company-Specific, Resume-Based, General) with draft candidate answers, framework hints, and sample responses.

6. **Document 06 — Business & Technical Case Practice**
   - Interactive step-by-step case resolution frameworks with diagnostic questions and sample executive summaries.

7. **Document 07 — Market Estimation & Guesstimates**
   - Variable breakdowns, formulas, and step-by-step logic checks for quantitative estimation questions.

8. **Document 08 — Technical Competencies & GD Prep**
   - **Technical Deep-Dives**: Key JD and CV concepts to master.
   - **Group Discussion Checklist**: Industry debates, opening theses, and counter-arguments.

---

## 🔒 API Key & Vercel Deployment Security

### 1. Server-Side Security Architecture
All content generation calls are proxied through a secure server backend (`/api/generate-prep`) running on Node.js / Express. Your primary API key is loaded from server environment variables and is **never exposed to client browser code**.

### 2. Vercel Deployment Instructions
When deploying this application to **Vercel**:
1. Go to your Vercel Project Dashboard &rarr; **Settings** &rarr; **Environment Variables**.
2. Add a new variable:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** *Your API Key*
3. Save and redeploy your project. The serverless route on Vercel will execute calls securely on the backend without revealing your key to visitors.

### 3. Session-Only Custom API Keys
If you provide a custom API key using the in-app **Settings** modal:
- The key is saved exclusively in `sessionStorage`.
- It exists **only for that active browser session**.
- Reloading or closing the tab **automatically clears/refreshes** the key from memory.

---

## 🛠️ Local Development & Scripts

### Prerequisites
- Node.js 18+

### Setup
```bash
# Install dependencies
npm install

# Start development server (runs Express + Vite on http://localhost:3000)
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📂 Project Structure
```
.
├── server.ts                    # Node.js / Express API route handler & Vite dev server integration
├── src/
│   ├── App.tsx                  # Main workspace view layout & section router
│   ├── components/
│   │   ├── Header.tsx           # Top navigation bar with readiness meter & settings trigger
│   │   ├── Sidebar.tsx          # Collapsible navigation drawer with document codes & section stats
│   │   ├── SettingsModal.tsx    # Session-based API key & Vercel deployment modal
│   │   ├── CandidateBriefForm.tsx # Brief customizer form for Company, JD, & CV
│   │   └── sections/            # Individual preparation document sections
│   ├── data/
│   │   └── initialData.ts       # Structured fallback & initial preparation data
│   ├── lib/
│   │   └── storage.ts           # Local progress & preparation status persistence
│   └── types.ts                 # TypeScript interfaces for all prep modules
├── package.json
└── README.md
```
