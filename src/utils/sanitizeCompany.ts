import { PrepDeskData, QAQuestion, PreparationStatus } from '../types';

export function sanitizeAndTailorPrepData(
  data: PrepDeskData,
  targetCompany: string,
  targetRole: string
): PrepDeskData {
  const company = targetCompany.trim() || 'Target Company';
  const role = targetRole.trim() || 'Target Role';

  const isKPMG = company.toUpperCase().includes('KPMG');

  // Deep clone
  const updated: PrepDeskData = JSON.parse(JSON.stringify(data));

  // Helper to replace old company names with new company name
  const replaceNames = (text: string): string => {
    if (!text) return text;
    let result = text
      .replace(/Acme Enterprise Solutions/gi, company)
      .replace(/Acme Enterprise/gi, company)
      .replace(/Acme Corp/gi, company)
      .replace(/Acme Solutions/gi, company)
      .replace(/Acme/g, company);

    if (isKPMG) {
      // Clean up generic tech buzzwords if it's KPMG professional services
      result = result
        .replace(/modular analytics suite/gi, 'Audit & Advisory solutions (KPMG Clara), Tax & Legal transformation')
        .replace(/Fortune 500 operations leads/gi, 'Fortune 500 CFOs, Audit Committees, & Enterprise Boards');
    }

    return result;
  };

  // Update brief
  updated.brief.companyName = company;
  updated.brief.jobTitle = role;

  // 1. Company Snapshot
  if (updated.companySnapshot) {
    if (isKPMG && (!updated.companySnapshot.overview || updated.companySnapshot.overview.includes('Acme'))) {
      updated.companySnapshot = {
        overview: `${company} is a Big 4 global professional services network specializing in Audit & Assurance, Tax & Legal, and Strategy & Digital Advisory. KPMG is known for its data-driven audit platform (KPMG Clara), ESG assurance leadership, and high-accountability client culture.`,
        recentNews: [
          'KPMG expands AI Audit & Assurance capabilities with KPMG Clara integration',
          'Global headcount expansion in Digital Advisory and Cybersecurity practices',
          'Accelerated investment in ESG assurance and Regulatory Compliance reporting',
        ],
        cultureAndValues: [
          { title: 'Integrity & Excellence', desc: 'Doing what is right and delivering unmatched quality across all client engagements.' },
          { title: 'Courage & Innovation', desc: 'Thinking boldly and embracing AI transformation in traditional professional services.' },
          { title: 'For Better & Together', desc: 'Collaborating across multidisciplinary teams to drive lasting business impact.' },
        ],
      };
    } else {
      updated.companySnapshot.overview = replaceNames(updated.companySnapshot.overview);
      updated.companySnapshot.recentNews = updated.companySnapshot.recentNews.map(replaceNames);
      updated.companySnapshot.cultureAndValues = updated.companySnapshot.cultureAndValues.map((cv) => ({
        title: replaceNames(cv.title),
        desc: replaceNames(cv.desc),
      }));
    }
  }

  // 2. CPCC
  if (updated.cpcc) {
    if (isKPMG && (updated.cpcc.company.includes('Acme') || updated.cpcc.company.includes('cloud & AI'))) {
      updated.cpcc = {
        company: `${company} - Big 4 Global Audit, Tax, and Management Consulting Network`,
        product: 'KPMG Clara AI Audit Platform, Tax & Legal Advisory, Strategy & Operations Consulting',
        client: 'Global 2000 Enterprises, Financial Institutions, Public Sector & Multinationals',
        competitors: 'PwC, EY, Deloitte, Accenture, McKinsey & Company',
      };
    } else {
      updated.cpcc.company = replaceNames(updated.cpcc.company);
      updated.cpcc.product = replaceNames(updated.cpcc.product);
      updated.cpcc.client = replaceNames(updated.cpcc.client);
      updated.cpcc.competitors = replaceNames(updated.cpcc.competitors);
    }
  }

  // 3. Company Facts
  if (updated.companyFacts && Array.isArray(updated.companyFacts)) {
    if (isKPMG && updated.companyFacts.some((f) => f.description.includes('Acme') || f.label.includes('Core'))) {
      updated.companyFacts = [
        {
          id: 'kpmg-fact-1',
          label: 'Multidisciplinary Model (MMM) & Practice Integration',
          description: `KPMG combines Audit, Tax, and Advisory under a unified client delivery model to maximize cross-functional value.`,
          notes: `Emphasize your ability as a ${role} to bridge technical and business stakeholders across matrix practices.`,
          status: 'Prepared',
        },
        {
          id: 'kpmg-fact-2',
          label: 'KPMG Clara & Smart Audit Automation',
          description: 'Pioneering AI-driven audit tools that provide real-time data analytics and risk identification for enterprise clients.',
          notes: 'Discuss your experience leveraging analytics tools to streamline complex workflows.',
          status: 'Needs work',
        },
        {
          id: 'kpmg-fact-3',
          label: 'ESG & Regulatory Compliance Focus',
          description: 'Rapid growth in ESG reporting assurance, risk governance, and regulatory transformation services.',
          notes: 'Prepare talking points on compliance, risk mitigation, and metric reporting.',
          status: 'Needs work',
        },
      ];
    } else {
      updated.companyFacts = updated.companyFacts.map((f) => ({
        ...f,
        label: replaceNames(f.label),
        description: replaceNames(f.description),
        notes: replaceNames(f.notes),
      }));
    }
  }

  // 4. JD Research Notes
  if (updated.jdResearchNotes) {
    updated.jdResearchNotes = replaceNames(updated.jdResearchNotes);
  }

  // 5. Resume Fit
  if (updated.resumeFit) {
    updated.resumeFit.alignment = replaceNames(updated.resumeFit.alignment);
    updated.resumeFit.whatsWorking = (updated.resumeFit.whatsWorking || []).map(replaceNames);
    updated.resumeFit.whatsMissing = (updated.resumeFit.whatsMissing || []).map(replaceNames);
    updated.resumeFit.keywordsToSurface = (updated.resumeFit.keywordsToSurface || []).map(replaceNames);
    if (updated.resumeFit.suggestedRewrite) {
      updated.resumeFit.suggestedRewrite = {
        original: replaceNames(updated.resumeFit.suggestedRewrite.original),
        rewritten: replaceNames(updated.resumeFit.suggestedRewrite.rewritten),
        reason: replaceNames(updated.resumeFit.suggestedRewrite.reason),
      };
    }
  }

  // 6. RCR Bullets
  if (updated.rcrBullets) {
    updated.rcrBullets = updated.rcrBullets.map((b) => ({
      ...b,
      bulletTitle: replaceNames(b.bulletTitle),
      roleAndResponsibility: replaceNames(b.roleAndResponsibility),
      contribution: replaceNames(b.contribution),
      result: replaceNames(b.result),
    }));
  }

  // 7. Q&A Bank
  if (updated.qaBank) {
    if (isKPMG && updated.qaBank.some((q) => q.question.includes('Acme') || q.question.includes('Senior Product Specialist'))) {
      const kpmgItems: QAQuestion[] = [
        {
          id: 'kpmg-qa-1',
          category: 'Behavioral',
          question: `Why KPMG, and why are you interested in this ${role} position?`,
          draftAnswer: `KPMG's multidisciplinary practice model and focus on data-driven client delivery strongly align with my background in leading high-stakes engagements. I excel at converting complex requirements into measurable client outcomes.`,
          sampleAnswer: '20s Motivation for KPMG culture -> 30s Core CV achievement -> 20s Value proposition for this role.',
          hint: `Reference KPMG's values (Integrity, Excellence, For Better) and mention past project delivery metrics from your CV.`,
          status: 'Needs work',
        },
        {
          id: 'kpmg-qa-2',
          category: 'Company-Specific',
          question: `How do you manage client expectations and partner stakeholders in a matrix environment at ${company}?`,
          draftAnswer: 'I establish transparent communication cadence, define scope milestones early, and use data dashboards to keep executive partners aligned.',
          sampleAnswer: 'STAR response highlighting a difficult stakeholder engagement.',
          hint: 'Focus on partner diplomacy, scope control, and structured risk escalation.',
          status: 'Needs work',
        },
        {
          id: 'kpmg-qa-3',
          category: 'Resume-Based',
          question: `Walk me through a complex engagement from your resume where you drove measurable efficiency or cost savings.`,
          draftAnswer: 'In my recent role, I led a cross-functional team that streamlined operational reporting, reducing cycle times by 35% and saving 120+ team hours quarterly.',
          sampleAnswer: 'RCR Framework: Role -> Contribution -> Measurable Result ($ or %).',
          hint: 'Quantify your impact clearly with percentages or dollar figures.',
          status: 'Prepared',
        },
      ];

      const mappedOthers: QAQuestion[] = updated.qaBank.map((q) => ({
        ...q,
        question: replaceNames(q.question),
        draftAnswer: replaceNames(q.draftAnswer),
        sampleAnswer: replaceNames(q.sampleAnswer),
        hint: replaceNames(q.hint),
      }));

      updated.qaBank = [...kpmgItems, ...mappedOthers].slice(0, 8);
    } else {
      updated.qaBank = updated.qaBank.map((q) => ({
        ...q,
        question: replaceNames(q.question),
        draftAnswer: replaceNames(q.draftAnswer),
        sampleAnswer: replaceNames(q.sampleAnswer),
        hint: replaceNames(q.hint),
      }));
    }
  }

  // 8. STAR Stories
  if (updated.starStories) {
    updated.starStories = updated.starStories.map((s) => ({
      ...s,
      promptTitle: replaceNames(s.promptTitle),
      situation: replaceNames(s.situation),
      task: replaceNames(s.task),
      action: replaceNames(s.action),
      result: replaceNames(s.result),
    }));
  }

  // 9. Cases
  if (updated.cases) {
    if (isKPMG && updated.cases.some((c) => c.title.includes('Acme') || c.title.includes('Supply Chain'))) {
      updated.cases = [
        {
          id: 'kpmg-case-1',
          title: `${company} Strategic Advisory Case: Operating Model Transformation`,
          prompt: `A Fortune 500 client is facing declining operating margins across international divisions. How would you structure a diagnostic and recommendation framework for the client engagement team?`,
          steps: [
            { id: 1, stepName: 'Diagnostic & Data Audit', description: 'Audit cost centers, revenue streams, and operational bottlenecks across divisions.', completed: false },
            { id: 2, stepName: 'Root Cause & Industry Benchmarking', description: 'Benchmark operating metrics against Big 4 peer standards.', completed: false },
            { id: 3, stepName: 'Solution Architecture & Roadmap', description: 'Design a phased 12-month implementation plan focused on automation and margin expansion.', completed: false },
          ],
          userAnswer: '',
          sampleFrameworkAnswer: '3-Pillar Strategy: Financial Audit -> Process Optimization -> Tech-Enabled Automation.',
          status: 'Needs work',
        },
      ];
    } else {
      updated.cases = updated.cases.map((c) => ({
        ...c,
        title: replaceNames(c.title),
        prompt: replaceNames(c.prompt),
        sampleFrameworkAnswer: replaceNames(c.sampleFrameworkAnswer),
        steps: c.steps.map((s) => ({
          ...s,
          stepName: replaceNames(s.stepName),
          description: replaceNames(s.description),
        })),
      }));
    }
  }

  // 10. Guesstimates
  if (updated.guesstimates) {
    updated.guesstimates = updated.guesstimates.map((g) => ({
      ...g,
      prompt: replaceNames(g.prompt),
      dependentVariable: replaceNames(g.dependentVariable),
      variables: g.variables.map(replaceNames),
      notes: replaceNames(g.notes),
    }));
  }

  // 11. Technical Topics
  if (updated.technicalTopics) {
    updated.technicalTopics = updated.technicalTopics.map((t) => ({
      ...t,
      topic: replaceNames(t.topic),
      notes: replaceNames(t.notes),
    }));
  }

  // 12. GD Checklist
  if (updated.gdChecklist) {
    updated.gdChecklist = updated.gdChecklist.map((gd) => ({
      ...gd,
      title: replaceNames(gd.title),
      description: replaceNames(gd.description),
      notes: replaceNames(gd.notes),
    }));
  }

  return updated;
}
