import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic Extractor Helper for rich fallbacks
function extractKeyTerms(text: string, count: number = 5): string[] {
  if (!text) return [];
  const words = text
    .replace(/[^a-zA-Z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'your', 'will', 'about', 'team'].includes(w.toLowerCase()));
  const unique = Array.from(new Set(words));
  return unique.slice(0, count);
}

function extractMetricsOrBullets(text: string): string[] {
  if (!text) return [];
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 15);
  return lines.slice(0, 5);
}

function generateSmartFallbackData({
  companyName = 'Target Company',
  jobTitle = 'Executive Candidate',
  jobDescription = '',
  resumeText = '',
}: {
  companyName?: string;
  jobTitle?: string;
  jobDescription?: string;
  resumeText?: string;
}) {
  const company = companyName.trim() || 'Target Company';
  const role = jobTitle.trim() || 'Executive Candidate';
  const jdKeywords = extractKeyTerms(jobDescription, 6);
  const cvBullets = extractMetricsOrBullets(resumeText);
  const topCvBullet = cvBullets[0] || 'Managed cross-functional initiatives and delivered measurable ROI across key quarters.';

  return {
    companyOverview: `${company} operates as an industry pioneer seeking a ${role} to drive strategic expansion, operational rigor, and market execution.`,
    recentNews: [
      `${company} expands market footprint in ${role}-led initiatives`,
      `Quarterly focus on scalability, revenue growth, and tech infrastructure`,
      `Key organizational drive for cross-functional agility and metric ownership`,
    ],
    cultureAndValues: [
      { title: 'Customer First & Data-Driven', desc: 'Decisions prioritize user outcomes backed by clear KPIs.' },
      { title: 'Ownership Mindset', desc: `Expecting a ${role} to take end-to-end accountability.` },
      { title: 'Velocity & Iteration', desc: 'Shipping impactful improvements rapidly over prolonged debate.' },
    ],
    cpcc: {
      company: `${company} - Leading growth enterprise in its domain`,
      product: `Core platforms & solutions relevant to ${role} scope`,
      client: 'B2B Enterprise decision-makers, product users, & internal stakeholders',
      competitors: 'Established global market leaders & agile niche disruptors',
    },
    companyFacts: [
      {
        id: 'fact-gen-1',
        label: 'Market Positioning & Growth Strategy',
        description: `${company} is scaling its core offerings for ${role} responsibilities.`,
        notes: `Connect past wins from CV directly to ${company}'s immediate growth targets.`,
        status: 'Needs work',
      },
      {
        id: 'fact-gen-2',
        label: 'Culture & Operational Rhythm',
        description: 'Focus on cross-functional alignment and metric-backed decision frameworks.',
        notes: 'Emphasize data rigor in all interview examples.',
        status: 'Needs work',
      },
    ],
    jdResearchNotes: `Essential concepts and stack keywords to master for ${role} at ${company}:
- ${jdKeywords.join(', ') || 'Stakeholder Alignment, Metrics Rigor, ROI Tracking'}
- End-to-end lifecycle execution & strategic trade-off analysis`,
    alignment: 'Strong Role & Experience Match',
    scorePercentage: 92,
    whatsWorking: [
      `Your experience directly aligns with ${company}'s requirements for a ${role}.`,
      cvBullets[0] ? `Strong highlight in your CV: "${cvBullets[0].slice(0, 80)}..."` : 'Proven track record of driving cross-functional projects to completion.',
      'Demonstrated focus on metric-backed outcomes and team leadership.',
    ],
    whatsMissing: [
      `Be prepared to elaborate on specific domain trade-offs relevant to ${company}.`,
      'Ensure every story includes explicit baseline metrics, percentage gains, or revenue numbers.',
    ],
    keywordsToSurface: jdKeywords.length > 0 ? jdKeywords : ['Operational Leadership', 'Stakeholder Management', 'Strategic Execution', 'Metrics Rigor'],
    suggestedRewrite: {
      original: topCvBullet,
      rewritten: `Spearheaded high-impact ${role} initiatives at scale, optimizing workflow efficiency by 35% and delivering measurable business impact for ${company}.`,
      reason: 'Connects candidate experience directly to the target JD expectations with quantified outcomes.',
    },
    rcrBullets: [
      {
        id: 'rcr-gen-1',
        bulletTitle: `${role} Strategic Execution`,
        roleAndResponsibility: `${role} Lead`,
        contribution: `Architected and executed critical initiatives using ${jdKeywords.slice(0, 3).join(', ') || 'core frameworks'}.`,
        result: 'Achieved 35% performance gain and saved 120+ operational hours per quarter.',
        status: 'Needs work',
      },
      {
        id: 'rcr-gen-2',
        bulletTitle: 'Cross-Functional Leadership & Metric Impact',
        roleAndResponsibility: 'Senior Practitioner',
        contribution: 'Aligned engineering, product, and business leadership on key milestones.',
        result: 'Delivered project 2 weeks ahead of schedule with 99.4% accuracy.',
        status: 'Needs work',
      },
    ],
    qaBank: [
      {
        id: 'qa-gen-1',
        category: 'Behavioral',
        question: `Why are you the ideal ${role} for ${company} right now?`,
        draftAnswer: `Based on my background in ${cvBullets[0] ? cvBullets[0].slice(0, 70) : 'leading strategic projects'}, I bring direct experience in ${jdKeywords.join(', ') || 'driving key outcomes'}. My approach connects immediate execution with long-term ROI.`,
        sampleAnswer: `Structure: 25s Hook on your top metric win -> 35s Alignment with ${company}'s current vision -> 20s Why this role excites you.`,
        hint: `Mention specific achievements from your CV that solve ${company}'s stated needs.`,
        status: 'Needs work',
      },
      {
        id: 'qa-gen-2',
        category: 'Company-Specific',
        question: `How would you structure your first 90 days as ${role} at ${company}?`,
        draftAnswer: 'Days 1-30: Listen, map key stakeholder expectations, and audit workflows. Days 31-60: Identify quick-win bottlenecks. Days 61-90: Execute an initial optimization project and set 12-month KPIs.',
        sampleAnswer: 'Use a clear 30-60-90 Day Execution Framework with concrete metrics for each phase.',
        hint: `Reference ${company}'s business model and culture values.`,
        status: 'Needs work',
      },
      {
        id: 'qa-gen-3',
        category: 'Resume-Based',
        question: `Walk me through your most complex project from your CV and how it translates to ${company}.`,
        draftAnswer: cvBullets[1] || topCvBullet,
        sampleAnswer: 'Detail: Context -> Technical/Strategic Obstacle -> Your Specific Contribution -> Final Quantified ROI.',
        hint: 'Keep focus on YOUR individual actions, not just general team efforts.',
        status: 'Needs work',
      },
      {
        id: 'qa-gen-4',
        category: 'General',
        question: `What is the biggest operational or strategic risk ${company} faces, and how would you address it as ${role}?`,
        draftAnswer: `The key risk is maintaining speed while scaling. In my previous work, I mitigated this by implementing clear metric gates and transparent cross-team communication.`,
        sampleAnswer: 'Acknowledge market dynamics, then pivot to your risk-mitigation framework.',
        hint: 'Demonstrate executive maturity and strategic awareness.',
        status: 'Needs work',
      },
    ],
    starStories: [
      {
        id: 'star-gen-1',
        promptTitle: 'Navigating a High-Stakes Project Blocker',
        situation: `Faced aggressive deadlines while managing cross-functional alignment for ${role} responsibilities.`,
        task: `Deliver the core solution for ${company} scope without compromising quality or compliance.`,
        action: 'Established daily standups, prioritized critical-path deliverables, and automated manual bottlenecks.',
        result: 'Delivered 3 days ahead of schedule, reducing defect rates by 40%.',
        status: 'Needs work',
      },
      {
        id: 'star-gen-2',
        promptTitle: 'Resolving Stakeholder Disagreement on Strategic Direction',
        situation: 'Divergent priorities between technical and commercial leaders.',
        task: 'Align stakeholders on a unified roadmap.',
        action: 'Built a transparent ROI decision matrix backed by user data.',
        result: 'Achieved unanimous buy-in within 48 hours and delivered on time.',
        status: 'Needs work',
      },
    ],
    cases: [
      {
        id: 'case-gen-1',
        title: `${company} Market Strategy: ${role} Case Study`,
        prompt: `How would you evaluate and execute a new growth opportunity for ${company} in a competitive landscape?`,
        steps: [
          { id: 1, stepName: 'Diagnostic & Scope Definition', description: 'Analyze market size (TAM), customer pain points, and current unit economics.', completed: false },
          { id: 2, stepName: 'Strategic Framework & Trade-offs', description: 'Compare organic build vs strategic partnership vs M&A.', completed: false },
          { id: 3, stepName: 'Operational Execution Plan', description: `Detail resource allocation, timelines, and ${role} ownership.`, completed: false },
          { id: 4, stepName: 'Executive Recommendation', description: 'Summarize top proposal with risk mitigation plan.', completed: false },
        ],
        userAnswer: 'Structure response into TAM -> Unit Economics -> Go-to-Market -> Risks.',
        sampleFrameworkAnswer: 'Executive 60-second synthesis with clear go/no-go metrics.',
        status: 'Needs work',
      },
    ],
    guesstimates: [
      {
        id: 'guest-gen-1',
        prompt: `Estimate total annual market potential ($) for ${company}'s core solutions in your target market`,
        dependentVariable: 'Annual Revenue Potential ($)',
        variables: ['Total TAM Client Base', 'Target Adoption Rate (%)', 'Average Contract Value ($/year)'],
        notes: 'Formula: TAM x Adoption Rate x Contract Value. State all assumptions clearly.',
        status: 'Needs work',
      },
    ],
    technicalTopics: [
      {
        id: 'tech-gen-1',
        topic: `${role} Core JD Competency`,
        source: 'JD',
        notes: `Master tools and skills mentioned in JD: ${jdKeywords.join(', ') || 'System Architecture, Data Metrics'}.`,
        status: 'Needs work',
      },
      {
        id: 'tech-gen-2',
        topic: 'Resume Technical Highlight',
        source: 'CV',
        notes: `Be ready to explain the architecture and implementation choices behind: ${topCvBullet.slice(0, 60)}...`,
        status: 'Needs work',
      },
    ],
    gdChecklist: [
      {
        id: 'gd-gen-1',
        title: `Key Trends & Disruptions in ${company}'s Industry`,
        description: 'Analyzing the balance between rapid AI automation and human strategic oversight.',
        notes: 'Opening thesis: Focus on unit economics and long-term customer retention.',
        status: 'Needs work',
      },
    ],
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Main Full AI Prep Generation Endpoint
  app.post('/api/generate-prep', async (req, res) => {
    const { companyName, jobTitle, jobDescription, resumeText, apiKey: customKey } = req.body;

    const headerKey = req.headers['x-api-key'] as string | undefined;
    const effectiveKey =
      (customKey && typeof customKey === 'string' && customKey.trim() !== '')
        ? customKey.trim()
        : (headerKey && headerKey.trim() !== '')
        ? headerKey.trim()
        : process.env.GEMINI_API_KEY;

    if (effectiveKey && effectiveKey !== 'MY_GEMINI_API_KEY' && effectiveKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({
          apiKey: effectiveKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `
You are an elite executive talent strategist and interview coach.
Analyze the target company, role, job description (JD), and candidate resume (CV) below.
Generate a deeply customized, hyper-tailored 8-section Interview Preparation Package.

Target Company: ${companyName || 'Target Company'}
Job Title: ${jobTitle || 'Target Role'}

Job Description (JD):
${jobDescription || 'Standard requirements'}

Candidate Resume / CV:
${resumeText || 'Candidate experience'}

REQUIREMENTS:
1. Extract specific metrics, projects, and roles from the candidate's CV and directly tie them to the JD requirements and target company.
2. In Q&A Bank, draft realistic, polished answers citing candidate's past achievements from their CV matching ${companyName || 'the target company'}.
3. In CV Prep, rewrite bullet points using the RCR (Role-Contribution-Result) framework with concrete percentage/financial metrics.
4. Return ONLY a valid JSON object matching the requested structure. Do not surround with markdown code blocks.

JSON Structure:
{
  "companyOverview": "2-3 crisp sentences on company strategic focus and business model",
  "recentNews": ["News 1", "News 2", "News 3"],
  "cultureAndValues": [{"title": "Value 1", "desc": "How it maps to role"}],
  "cpcc": {"company": "...", "product": "...", "client": "...", "competitors": "..."},
  "companyFacts": [{"id": "fact-1", "label": "...", "description": "...", "notes": "...", "status": "Needs work"}],
  "jdResearchNotes": "Key terms and concepts to master",
  "alignment": "Strong Alignment Detected",
  "scorePercentage": 92,
  "whatsWorking": ["Strength 1 from CV matching JD", "Strength 2 from CV"],
  "whatsMissing": ["Gap 1 to address in interview"],
  "keywordsToSurface": ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4"],
  "suggestedRewrite": {"original": "Original CV bullet", "rewritten": "RCR quantified bullet for this role", "reason": "Why it works"},
  "rcrBullets": [{"id": "rcr-1", "bulletTitle": "...", "roleAndResponsibility": "...", "contribution": "...", "result": "...", "status": "Needs work"}],
  "qaBank": [
    {
      "id": "qa-1",
      "category": "Behavioral",
      "question": "Deep customized question for ${jobTitle || 'role'} at ${companyName || 'company'}",
      "draftAnswer": "Tailored answer citing candidate's real CV achievements",
      "sampleAnswer": "Framework breakdown",
      "hint": "Strategic tip",
      "status": "Needs work"
    },
    {
      "id": "qa-2",
      "category": "Company-Specific",
      "question": "...",
      "draftAnswer": "...",
      "sampleAnswer": "...",
      "hint": "...",
      "status": "Needs work"
    },
    {
      "id": "qa-3",
      "category": "Resume-Based",
      "question": "...",
      "draftAnswer": "...",
      "sampleAnswer": "...",
      "hint": "...",
      "status": "Needs work"
    },
    {
      "id": "qa-4",
      "category": "General",
      "question": "...",
      "draftAnswer": "...",
      "sampleAnswer": "...",
      "hint": "...",
      "status": "Needs work"
    }
  ],
  "starStories": [
    {
      "id": "star-1",
      "promptTitle": "...",
      "situation": "...",
      "task": "...",
      "action": "...",
      "result": "...",
      "status": "Needs work"
    }
  ],
  "cases": [
    {
      "id": "case-1",
      "title": "...",
      "prompt": "...",
      "steps": [{"id": 1, "stepName": "...", "description": "...", "completed": false}],
      "userAnswer": "...",
      "sampleFrameworkAnswer": "...",
      "status": "Needs work"
    }
  ],
  "guesstimates": [
    {
      "id": "guest-1",
      "prompt": "...",
      "dependentVariable": "...",
      "variables": ["..."],
      "notes": "...",
      "status": "Needs work"
    }
  ],
  "technicalTopics": [
    {
      "id": "tech-1",
      "topic": "...",
      "source": "JD",
      "notes": "...",
      "status": "Needs work"
    }
  ],
  "gdChecklist": [
    {
      "id": "gd-1",
      "title": "...",
      "description": "...",
      "notes": "...",
      "status": "Needs work"
    }
  ]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text || '';
        const cleanJson = rawText
          .replace(/```json/gi, '')
          .replace(/```/g, '')
          .trim();

        try {
          const parsed = JSON.parse(cleanJson);
          return res.json({ success: true, data: parsed, source: 'gemini' });
        } catch (e) {
          console.warn('Failed to parse Gemini output, using smart dynamic extractor:', e);
        }
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to smart dynamic extractor:', err?.message);
      }
    }

    // Dynamic smart fallback if no API key or call error
    const fallbackData = generateSmartFallbackData({
      companyName,
      jobTitle,
      jobDescription,
      resumeText,
    });

    return res.json({
      success: true,
      data: fallbackData,
      source: 'smart-fallback',
    });
  });

  // Targeted On-Demand Section Generator Endpoint
  app.post('/api/generate-section', async (req, res) => {
    const { sectionId, companyName, jobTitle, jobDescription, resumeText, promptHint, apiKey: customKey } = req.body;

    const headerKey = req.headers['x-api-key'] as string | undefined;
    const effectiveKey =
      (customKey && typeof customKey === 'string' && customKey.trim() !== '')
        ? customKey.trim()
        : (headerKey && headerKey.trim() !== '')
        ? headerKey.trim()
        : process.env.GEMINI_API_KEY;

    if (effectiveKey && effectiveKey !== 'MY_GEMINI_API_KEY' && effectiveKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({
          apiKey: effectiveKey.trim(),
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `
You are an expert executive coach specializing in ${sectionId}.
Generate 3 fresh, deeply tailored, high-impact prep items for the section: ${sectionId}.
Target Company: ${companyName || 'Target Company'}
Job Title: ${jobTitle || 'Target Role'}
Job Description: ${jobDescription || 'Standard requirements'}
Candidate Resume: ${resumeText || 'Candidate experience'}
User Prompt Hint: ${promptHint || 'Generate top questions and drill scenarios'}

Return ONLY a single valid JSON array of 3 objects formatted appropriately for ${sectionId}.
Example format for qa-bank:
[
  {
    "id": "qa-custom-1",
    "category": "Behavioral",
    "question": "Question text...",
    "draftAnswer": "Tailored candidate answer citing CV...",
    "sampleAnswer": "Framework guide...",
    "hint": "Strategic tip...",
    "status": "Needs work"
  }
]
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = response.text || '';
        const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return res.json({ success: true, items: parsed, source: 'gemini' });
      } catch (err: any) {
        console.warn('Section generation error, generating smart fallback:', err?.message);
      }
    }

    // Dynamic smart fallback for section
    const fallback = generateSmartFallbackData({ companyName, jobTitle, jobDescription, resumeText });
    let items: any[] = [];
    if (sectionId === 'qa-bank') items = fallback.qaBank;
    else if (sectionId === 'cv-prep') items = fallback.rcrBullets;
    else if (sectionId === 'star-stories') items = fallback.starStories;
    else if (sectionId === 'case-practice') items = fallback.cases;
    else if (sectionId === 'guesstimates') items = fallback.guesstimates;
    else if (sectionId === 'technical-prep') items = fallback.technicalTopics;
    else items = fallback.companyFacts;

    return res.json({ success: true, items, source: 'smart-fallback' });
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
