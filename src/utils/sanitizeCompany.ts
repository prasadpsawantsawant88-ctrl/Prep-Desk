import { PrepDeskData } from '../types';

export function sanitizeAndTailorPrepData(
  data: PrepDeskData,
  targetCompany: string,
  targetRole: string
): PrepDeskData {
  const company = targetCompany.trim() || 'Target Company';
  const role = targetRole.trim() || 'Target Role';

  // Deep clone
  const updated: PrepDeskData = JSON.parse(JSON.stringify(data));

  // Helper to replace legacy or mismatched company names with new target company name
  const replaceNames = (text: string): string => {
    if (!text) return text;
    let result = text
      .replace(/Acme Enterprise Solutions/gi, company)
      .replace(/Acme Enterprise/gi, company)
      .replace(/Acme Corp/gi, company)
      .replace(/Acme Solutions/gi, company)
      .replace(/Acme/gi, company);

    // If target company is not KPMG, sanitize any stale KPMG default text
    if (!company.toUpperCase().includes('KPMG')) {
      result = result
        .replace(/KPMG Clara/gi, `${company} Platform`)
        .replace(/KPMG/gi, company);
    }

    return result;
  };

  // Update brief
  updated.brief.companyName = company;
  updated.brief.jobTitle = role;

  // 1. Company Snapshot
  if (updated.companySnapshot) {
    updated.companySnapshot.overview = replaceNames(updated.companySnapshot.overview);
    updated.companySnapshot.recentNews = (updated.companySnapshot.recentNews || []).map(replaceNames);
    updated.companySnapshot.cultureAndValues = (updated.companySnapshot.cultureAndValues || []).map((cv) => ({
      title: replaceNames(cv.title),
      desc: replaceNames(cv.desc),
    }));
  }

  // 2. CPCC
  if (updated.cpcc) {
    updated.cpcc.company = replaceNames(updated.cpcc.company);
    updated.cpcc.product = replaceNames(updated.cpcc.product);
    updated.cpcc.client = replaceNames(updated.cpcc.client);
    updated.cpcc.competitors = replaceNames(updated.cpcc.competitors);
  }

  // 3. Company Facts
  if (updated.companyFacts && Array.isArray(updated.companyFacts)) {
    updated.companyFacts = updated.companyFacts.map((f) => ({
      ...f,
      label: replaceNames(f.label),
      description: replaceNames(f.description),
      notes: replaceNames(f.notes),
    }));
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
    updated.qaBank = updated.qaBank.map((q) => ({
      ...q,
      question: replaceNames(q.question),
      draftAnswer: replaceNames(q.draftAnswer),
      sampleAnswer: replaceNames(q.sampleAnswer),
      hint: replaceNames(q.hint),
    }));
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
    updated.cases = updated.cases.map((c) => ({
      ...c,
      title: replaceNames(c.title),
      prompt: replaceNames(c.prompt),
      sampleFrameworkAnswer: replaceNames(c.sampleFrameworkAnswer),
      steps: (c.steps || []).map((s) => ({
        ...s,
        stepName: replaceNames(s.stepName),
        description: replaceNames(s.description),
      })),
    }));
  }

  // 10. Guesstimates
  if (updated.guesstimates) {
    updated.guesstimates = updated.guesstimates.map((g) => ({
      ...g,
      prompt: replaceNames(g.prompt),
      dependentVariable: replaceNames(g.dependentVariable),
      variables: (g.variables || []).map(replaceNames),
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
