export type PreparationStatus = 'Prepared' | 'Needs work';

export type SectionId =
  | 'company-research'
  | 'cv-prep'
  | 'gd-notes'
  | 'qa-bank'
  | 'case-practice'
  | 'star-behavioural'
  | 'guesstimates'
  | 'technical-prep';

export interface SectionMeta {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: string;
  docCode: string;
}

export interface CandidateBrief {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  resumeText: string;
  resumeFileName?: string;
}

export interface CPCCData {
  company: string;
  product: string;
  client: string;
  competitors: string;
}

export interface CompanyFactItem {
  id: string;
  label: string;
  description: string;
  notes: string;
  status: PreparationStatus;
}

export interface RCRBullet {
  id: string;
  bulletTitle: string;
  roleAndResponsibility: string;
  contribution: string;
  result: string;
  status: PreparationStatus;
}

export interface GDChecklistItem {
  id: string;
  title: string;
  description: string;
  notes: string;
  status: PreparationStatus;
}

export interface QAQuestion {
  id: string;
  category: 'Behavioral' | 'Resume-Based' | 'Company-Specific' | 'General';
  question: string;
  draftAnswer: string;
  sampleAnswer?: string;
  hint: string;
  status: PreparationStatus;
  isCustom?: boolean;
}

export interface CaseStep {
  id: number;
  stepName: string;
  description: string;
  completed: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  prompt: string;
  steps: CaseStep[];
  userAnswer: string;
  sampleFrameworkAnswer?: string;
  status: PreparationStatus;
}

export interface STARStory {
  id: string;
  promptTitle: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  status: PreparationStatus;
  isExample?: boolean;
}

export interface GuesstimatesItem {
  id: string;
  prompt: string;
  dependentVariable: string;
  variables: string[];
  notes: string;
  status: PreparationStatus;
}

export interface TechnicalTopic {
  id: string;
  topic: string;
  source: 'JD' | 'CV' | 'Curriculum';
  notes: string;
  status: PreparationStatus;
}

export interface PrepDeskData {
  brief: CandidateBrief;
  sectionsStatus: Record<SectionId, PreparationStatus>;
  
  // Section 1: Company Research
  companyFacts: CompanyFactItem[];
  cpcc: CPCCData;
  jdResearchNotes: string;
  companySnapshot: {
    overview: string;
    recentNews: string[];
    cultureAndValues: { title: string; desc: string }[];
  };

  // Section 2: CV Preparation
  masterCvNotes: string;
  finalCvNotes: string;
  rcrBullets: RCRBullet[];
  resumeFit: {
    alignment: string; // e.g. "Strong Alignment Detected"
    scorePercentage: number; // e.g. 85
    whatsWorking: string[];
    whatsMissing: string[];
    keywordsToSurface: string[];
    suggestedRewrite: {
      original: string;
      rewritten: string;
      reason: string;
    };
  };

  // Section 3: Group Discussion Notes
  gdChecklist: GDChecklistItem[];

  // Section 4: Personal Q&A Bank
  qaBank: QAQuestion[];

  // Section 5: Situational / Case Practice
  cases: CaseStudy[];

  // Section 6: Behavioural (STAR)
  starStories: STARStory[];

  // Section 7: Guesstimates
  guesstimates: GuesstimatesItem[];

  // Section 8: Technical Prep
  technicalTopics: TechnicalTopic[];
  technicalGeneralNotes: string;
}
