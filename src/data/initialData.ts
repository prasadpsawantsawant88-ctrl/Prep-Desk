import { PrepDeskData, SectionMeta } from '../types';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'company-research',
    title: 'Company & Role Research',
    subtitle: 'CPCC framework, growth metrics & JD keywords',
    icon: 'domain',
    docCode: 'DOC. 01A',
  },
  {
    id: 'cv-prep',
    title: 'CV Preparation',
    subtitle: 'Master vs Final CV, RCR builder & Slap Test',
    icon: 'description',
    docCode: 'DOC. 02B',
  },
  {
    id: 'gd-notes',
    title: 'Group Discussion Notes',
    subtitle: 'Consistency, timing & psychometric cues',
    icon: 'groups',
    docCode: 'DOC. 03C',
  },
  {
    id: 'qa-bank',
    title: 'Personal Q&A Bank',
    subtitle: '9 core strategic prompts & custom drills',
    icon: 'quiz',
    docCode: 'DOC. 04D',
  },
  {
    id: 'case-practice',
    title: 'Situational & Case Practice',
    subtitle: '5-step supply chain & case resolution',
    icon: 'account_tree',
    docCode: 'DOC. 05E',
  },
  {
    id: 'star-behavioural',
    title: 'Behavioural Questions (STAR)',
    subtitle: 'Situation, Task, Action & Result framework',
    icon: 'psychology',
    docCode: 'DOC. 06F',
  },
  {
    id: 'guesstimates',
    title: 'Guesstimates Practice',
    subtitle: 'Independent vs dependent variables analysis',
    icon: 'calculate',
    docCode: 'DOC. 07G',
  },
  {
    id: 'technical-prep',
    title: 'Technical Round Prep',
    subtitle: 'JD alignment, honesty policy & core curriculum',
    icon: 'terminal',
    docCode: 'DOC. 08H',
  },
];

export const INITIAL_PREP_DATA: PrepDeskData = {
  brief: {
    companyName: 'Acme Enterprise Solutions',
    jobTitle: 'Senior Product Specialist / Manager',
    jobDescription:
      'We are looking for a data-driven product strategist to spearhead operational efficiency, streamline cross-functional delivery, and quantify impact across matrix teams.',
    resumeText:
      'Demonstrated 5+ years of cross-functional leadership managing $5M+ operational budgets, building real-time reporting dashboards, and driving agile delivery.',
    resumeFileName: 'Candidate_Resume_Master.pdf',
  },

  sectionsStatus: {
    'company-research': 'Needs work',
    'cv-prep': 'Needs work',
    'gd-notes': 'Prepared',
    'qa-bank': 'Needs work',
    'case-practice': 'Needs work',
    'star-behavioural': 'Prepared',
    'guesstimates': 'Needs work',
    'technical-prep': 'Needs work',
  },

  // Section 1: Company & Role Research
  companyFacts: [
    {
      id: 'fact-1',
      label: 'Core Company Overview & Mission',
      description: 'Pivoting heavily towards AI-driven enterprise solutions and operational efficiency over raw growth.',
      notes: 'Focus on enterprise AI integration and cost optimization metrics.',
      status: 'Prepared',
    },
    {
      id: 'fact-2',
      label: 'YoY Growth & Financial Health',
      description: 'Q3 quarterlies show 18% YoY growth in enterprise ARR with emphasis on margin expansion.',
      notes: 'Mention operational efficiency as a key driver of margin growth.',
      status: 'Needs work',
    },
    {
      id: 'fact-3',
      label: 'Hiring Trends & Team Structure',
      description: 'Expansion in cross-functional product and engineering matrix groups across North America & APAC.',
      notes: 'Prepare examples of managing distributed matrix teams.',
      status: 'Needs work',
    },
    {
      id: 'fact-4',
      label: 'Glassdoor & LinkedIn Sentiment',
      description: 'Employees praise fast iteration speed and high accountability ("Data over Dogma").',
      notes: 'Emphasize comfort with direct feedback ("Radical Candor").',
      status: 'Prepared',
    },
    {
      id: 'fact-5',
      label: 'Growth Opportunities & Threat Vectors',
      description: 'Key threat: legacy migration latency. Major opportunity: real-time analytics integrations.',
      notes: 'Formulate a 90-day plan addressing legacy system integration.',
      status: 'Needs work',
    },
  ],

  cpcc: {
    company: 'Enterprise cloud & AI solutions provider with data-heavy culture.',
    product: 'Modular analytics suite, real-time workflow engine, automated reporting API.',
    client: 'Fortune 500 operations leads, CTOs, and cross-functional directors.',
    competitors: 'Legacy ERP giants, agile niche AI startups, custom in-house tooling.',
  },

  jdResearchNotes:
    'Key concepts to research before the interview:\n- Matrix organizational dynamics\n- SLA vs latency trade-offs in real-time reporting\n- Agile sprint velocity vs enterprise compliance constraints',

  companySnapshot: {
    overview:
      'Acme Enterprise Solutions is pivoting heavily towards AI-driven enterprise software. Recent quarterlies indicate a strong push for operational efficiency over raw growth. Their culture is notoriously data-driven, favoring candidates who can quantify their impact and navigate ambiguous matrix organizations.',
    recentNews: [
      'Acquisition of TechFlow (Q3)',
      'New VP of Engineering Appointed',
      'Cloud Infrastructure Expansion into APAC',
    ],
    cultureAndValues: [
      {
        title: 'Radical Candor',
        desc: 'Open and direct feedback is expected at all levels.',
      },
      {
        title: 'Data over Dogma',
        desc: 'Decisions must be backed by metrics, not just intuition.',
      },
      {
        title: 'Bias for Action',
        desc: 'Speed and iteration are prioritized over perfect planning.',
      },
    ],
  },

  // Section 2: CV Preparation
  masterCvNotes:
    'Master CV contains all 14 projects, internal awards, and full technical stack details across all previous roles.',
  finalCvNotes:
    'Tailored CV pruned down to 4 high-impact bullets focusing strictly on $5M+ budget management, cross-functional delivery, and analytics dashboards.',
  
  rcrBullets: [
    {
      id: 'rcr-1',
      bulletTitle: 'Analytics Dashboard Deployment',
      roleAndResponsibility: 'Lead Product Manager for enterprise reporting suite.',
      contribution: 'Spearheaded a 5-person engineering team to architect and deploy a real-time analytics dashboard.',
      result: 'Reduced reporting latency by 40% and saved 120 hours of manual reporting per quarter.',
      status: 'Prepared',
    },
    {
      id: 'rcr-2',
      bulletTitle: 'Budget Reallocation & Optimization',
      roleAndResponsibility: 'Operations Owner for $5M departmental budget.',
      contribution: 'Reallocated $1.5M from agency spend into 3 in-house strategic hires and automated workflow tooling.',
      result: 'Increased output volume by 40% while maintaining 99.2% QA accuracy.',
      status: 'Prepared',
    },
  ],

  resumeFit: {
    alignment: 'Strong Alignment Detected',
    scorePercentage: 88,
    whatsWorking: [
      'Demonstrated scale: Managing $5M+ budgets aligns directly with the JD requirements.',
      'Cross-functional leadership is highly visible in your last two roles.',
      'Quantified outcomes align with their "Data over Dogma" cultural pillar.',
    ],
    whatsMissing: [
      'Light on direct technical implementations; be prepared to discuss architecture basics.',
      'No explicit mention of international market expansion experience.',
    ],
    keywordsToSurface: [
      'Stakeholder Management',
      'Python / SQL',
      'Agile Methodology',
      'GTM Strategy',
      'Operational Efficiency',
    ],
    suggestedRewrite: {
      original: 'Led a team to build a new reporting dashboard.',
      rewritten:
        'Spearheaded a 5-person engineering team to deploy a real-time analytics dashboard, reducing reporting latency by 40%.',
      reason: "Quantifies impact and specifies team size, addressing their 'Data over Dogma' value.",
    },
  },

  // Section 3: Group Discussion Notes
  gdChecklist: [
    {
      id: 'gd-1',
      title: 'Consistency & Logical Structure',
      description: 'Maintain a single cohesive viewpoint throughout the discussion rather than flip-flopping under pressure.',
      notes: 'State clear thesis early, anchor arguments on facts, and synthesize others’ inputs into my framework.',
      status: 'Prepared',
    },
    {
      id: 'gd-2',
      title: 'Timing & Turn-Taking Strategy',
      description: 'Aim for 3-4 impactful entries rather than dominating airtime; enter within the first 2 minutes.',
      notes: 'Use opening entry to define scope; use middle entry to bridge two opposing viewpoints gracefully.',
      status: 'Prepared',
    },
    {
      id: 'gd-3',
      title: 'Psychometric & Body Language Awareness',
      description: 'Demonstrate active listening, open posture, nods of acknowledgement, and non-confrontational eye contact.',
      notes: 'Address the group, not just the loudest speaker. Never interrupt aggressively; use "Building on what X mentioned..."',
      status: 'Needs work',
    },
  ],

  // Section 4: Personal Interview Q&A Bank
  qaBank: [
    {
      id: 'qa-1',
      category: 'Behavioral',
      question: 'Tell me something about yourself',
      draftAnswer:
        'I am an operations-focused product leader with over 5 years of experience bridging technical teams and business goals. Throughout my career, I have specialized in turning ambiguous requirements into structured workflows, having recently scaled a $5M operations budget and delivered real-time analytics tools that cut latency by 40%. What sets me apart is my ability to combine deep metric rigor with cross-functional empathy—ensuring teams ship fast without compromising quality.',
      sampleAnswer:
        'Start with a strong 15-second elevator hook, outline 2 core career achievements with metrics, highlight your Unique Selling Proposition (USP), and close by connecting your trajectory directly to this role.',
      hint: 'Build a story hook, highlight your USP vs other candidates, target ~90 sec, have a short version too',
      status: 'Prepared',
    },
    {
      id: 'qa-2',
      category: 'General',
      question: 'Why MBA?',
      draftAnswer:
        'My work experience gave me deep execution skills in product delivery, but I recognized that to drive enterprise-level strategy and capital allocation, I needed formal grounding in corporate finance, organizational design, and global market expansion. Pursuing my MBA was the deliberate step to transition from managing projects to steering business strategy.',
      sampleAnswer:
        'Structure systematically: (1) Past Work Experience -> (2) Identified Knowledge/Leadership Gap -> (3) Specific Skills MBA Provides -> (4) Immediate Post-MBA Goal.',
      hint: 'Structure as work experience → reason for MBA',
      status: 'Prepared',
    },
    {
      id: 'qa-3',
      category: 'Behavioral',
      question: 'Strengths & Weaknesses',
      draftAnswer:
        'Strength: High analytical rigor and structured problem-solving under tight deadlines.\n\nWeakness: In the past, I tended to over-index on raw technical perfection before sharing early drafts with non-technical stakeholders. To address this, I implemented a "low-fidelity RFC" practice where I share 50% drafts early to get early feedback.',
      sampleAnswer:
        'Ensure the weakness is a genuine professional skill gap directly tied to workflow/JD context—NEVER personality-based or emotional.',
      hint: 'Weakness should be a skill gap tied to the JD, never personality/emotion-based',
      status: 'Needs work',
    },
    {
      id: 'qa-4',
      category: 'Resume-Based',
      question: 'Quick profile summary',
      draftAnswer:
        '5-year data-driven product strategist. Expertise in $5M+ budget governance, cross-functional engineering leadership, and real-time enterprise software delivery. Known for driving a 40% reduction in reporting latency and fostering "Data over Dogma" team cultures.',
      sampleAnswer:
        'Concise 35–45 second synopsis cleanly aligning core skills with the Job Description keywords.',
      hint: '35–45 sec, aligned to JD',
      status: 'Prepared',
    },
    {
      id: 'qa-5',
      category: 'General',
      question: 'Why should we hire you? / best in your class?',
      draftAnswer:
        'You should hire me because I bring the precise mix of operational scale and metric discipline this role demands. While my peers bring varied backgrounds, my track record in scaling $5M budgets and optimizing matrix team delivery means I can hit the ground running on day one without a long onboarding curve.',
      sampleAnswer:
        'Focus purely on your own JD-aligned strengths and track record. Never compare yourself negatively to or insult classmates.',
      hint: 'Never insult classmates, focus on your own JD-aligned strengths',
      status: 'Needs work',
    },
    {
      id: 'qa-6',
      category: 'Company-Specific',
      question: 'How will you add value to the team?',
      draftAnswer:
        'I will add immediate value by auditing current reporting bottlenecks, introducing automated tracking workflows, and applying my experience with cross-functional matrix teams to accelerate Q4 product milestones.',
      sampleAnswer:
        'Answer directly using the key requirements, deliverables, and pain points explicitly highlighted in the Job Description.',
      hint: 'Answer from the JD',
      status: 'Needs work',
    },
    {
      id: 'qa-7',
      category: 'General',
      question: 'Where do you see yourself in 5 years?',
      draftAnswer:
        'In 5 years, I aim to be leading a major product line or operational business unit within enterprise software, having mastered the domain and mentored a high-performing team. My focus is on continuous impact and mastering end-to-end P&L management.',
      sampleAnswer:
        'Show long-term ambition and leadership vision, deflecting overly specific title commitments gracefully if pushed.',
      hint: 'Show ambition, deflect specifics gracefully if pushed',
      status: 'Needs work',
    },
    {
      id: 'qa-8',
      category: 'Company-Specific',
      question: 'Why do you want to work with us?',
      draftAnswer:
        'I am inspired by your shift toward AI-driven enterprise efficiency and your strong "Data over Dogma" cultural commitment. Your recent Q3 expansion and TechFlow acquisition show a team executing boldly on vision, which aligns perfectly with my background in scaling complex systems.',
      sampleAnswer:
        'Demonstrate genuine depth of research using specific company news, recent quarterlies, products, and culture pillars.',
      hint: 'Use your JD-based research',
      status: 'Prepared',
    },
    {
      id: 'qa-9',
      category: 'General',
      question: 'What if you get a better offer elsewhere?',
      draftAnswer:
        'My decision is driven by alignment with team culture, role impact, and long-term growth rather than marginal financial differences. If selected here first, this is my top choice, and I am fully committed to accepting and joining.',
      sampleAnswer:
        'Frame your answer around commitment, integrity, and clear prioritization: "If selected here first, I\'ll go with this offer."',
      hint: 'Frame around commitment ("If selected here first, I\'ll go with this offer")',
      status: 'Prepared',
    },
  ],

  // Section 5: Situational / Case Question Practice
  cases: [
    {
      id: 'case-1',
      title: 'Supply Chain Delivery Latency: Parle-G vs Britannia',
      prompt:
        'Parle-G takes 4 days to deliver to Bihar, Britannia takes 3 — how would you cut Parle-G\'s time to 3 days?',
      steps: [
        {
          id: 1,
          stepName: 'Study what the competitor does better',
          description:
            'Benchmark Britannia\'s hub-and-spoke distribution network, warehouse placements, and transit routes into Bihar.',
          completed: true,
        },
        {
          id: 2,
          stepName: 'Find supply-chain choke points',
          description:
            'Identify bottlenecks in Parle-G\'s order processing, loading dock turnover, regional dispatch, or rail vs road freight.',
          completed: true,
        },
        {
          id: 3,
          stepName: 'Consider more inventory / regional safety stock',
          description:
            'Evaluate holding higher buffer stock at local distribution centers (DCs) near Bihar border nodes.',
          completed: false,
        },
        {
          id: 4,
          stepName: 'Consider a local manufacturing plant or co-packer',
          description:
            'Analyze feasibility of local contract manufacturing in eastern UP/Bihar to shorten radial distance.',
          completed: false,
        },
        {
          id: 5,
          stepName: 'Cost-benefit the options and recommend one',
          description:
            'Quantify capital expenditure vs lead time savings, margin impact per pack, and deliver final strategic recommendation.',
          completed: false,
        },
      ],
      userAnswer:
        'Step 1: Benchmark Britannia\'s Bihar logistics (direct road transit vs rail).\nStep 2: Pinpoint Parle-G bottleneck at the regional transit hub (takes 24hrs to cross-dock).\nStep 3 & 4: Compare establishing a local contract manufacturing unit in UP border vs leasing 15% more warehouse buffer space in Patna.\nStep 5: Recommendation: Lease Patna regional warehouse space for fast turnaround in the short term, while evaluating long-term local co-packing contracts.',
      sampleFrameworkAnswer:
        '1. Benchmark: Britannia uses direct line-haul trucking with dedicated Patna cross-docking.\n2. Choke point: Parle-G uses central rail freight which adds 24h waiting time.\n3. Buffer inventory: Adding 3 days of safety stock in Patna reduces fulfillment time immediately to 2 days.\n4. Local Plant: A contract manufacturer in Patna eliminates interstate transit tax & transit time.\n5. Recommendation: Hybrid approach - Immediate DC expansion in Patna (low CapEx) + contract manufacturing evaluation for Q3.',
      status: 'Needs work',
    },
  ],

  // Section 6: Behavioural Questions (STAR)
  starStories: [
    {
      id: 'star-1',
      promptTitle: 'Biggest Disappointment',
      situation:
        'In my previous role, we spent 4 months preparing to launch a major automated compliance auditing tool that I was leading.',
      task: 'My goal was to launch on schedule to meet new Q3 enterprise partner compliance mandates.',
      action: 'Two weeks prior to launch, critical edge-case API rate limits caused unexpected test failures. Rather than hiding the issue or pushing broken code, I immediately flagged the blocker to leadership, presented 3 trade-off options, and scoped a fast-follow release plan.',
      result: 'Although missing the original launch date by 10 days was a disappointment, my transparent handling earned stakeholder trust, and the delayed release achieved 99.8% uptime with zero post-launch compliance bugs.',
      status: 'Prepared',
      isExample: true,
    },
  ],

  // Section 7: Guesstimates
  guesstimates: [
    {
      id: 'guest-1',
      prompt: 'Estimate the daily coffee consumption in Chicago',
      dependentVariable: 'Total cups of coffee consumed per day in Chicago',
      variables: [
        'Total population of Chicago (~2.7 Million)',
        'Age distribution (% adults aged 18-65 who drink coffee ~ 70%)',
        'Average cups per coffee drinker per day (~1.8 cups)',
        'Workday vs Weekend variation factor (1.2x on workdays)',
        'Out-of-home (cafes/offices) vs In-home brewing proportion (40% / 60%)',
      ],
      notes:
        'Formula: Population (2.7M) x Adult % (75% = 2.02M) x Coffee Drinkers (70% = 1.41M) x Avg Cups/Day (1.8) = ~2.54 Million cups per day.\nSanity check against number of coffee shops (~1,200 cafes x 400 cups/day = 480k commercial cups + office/home).',
      status: 'Needs work',
    },
  ],

  // Section 8: Technical Round Prep
  technicalTopics: [
    {
      id: 'tech-1',
      topic: 'SQL Database Indexing & Query Optimization',
      source: 'JD',
      notes: 'Review B-Trees, composite indexes, EXPLAIN ANALYZE for latency troubleshooting.',
      status: 'Prepared',
    },
    {
      id: 'tech-2',
      topic: 'REST vs gRPC & Real-Time WebSockets',
      source: 'CV',
      notes: 'Be prepared to explain why WebSockets were chosen for the analytics dashboard.',
      status: 'Prepared',
    },
    {
      id: 'tech-3',
      topic: 'Agile Metrics: Cycle Time, Lead Time & Throughput',
      source: 'Curriculum',
      notes: 'Define lead time vs cycle time clearly; explain how to remove workflow bottlenecks.',
      status: 'Needs work',
    },
  ],
  technicalGeneralNotes:
    'Golden Rule for Technical Rounds:\n1. If you don\'t know an answer, say so honestly immediately: "I don\'t know the exact syntax off the top of my head, but based on first principles, here is how I would reason through it... I\'d be glad to follow up afterwards."\n2. ~95% of technical questions stem directly from terms on your CV, requirements in the JD, or core curriculum topics.',
};
