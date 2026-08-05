import { PrepDeskData, PreparationStatus, SectionId } from '../types';
import { INITIAL_PREP_DATA, SECTIONS } from '../data/initialData';

const STORAGE_KEY = 'prep_desk_data_v1';

export function loadPrepData(): PrepDeskData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with initial structure to ensure new fields are safely populated
      return {
        ...INITIAL_PREP_DATA,
        ...parsed,
        sectionsStatus: {
          ...INITIAL_PREP_DATA.sectionsStatus,
          ...(parsed.sectionsStatus || {}),
        },
      };
    }
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
  }
  return INITIAL_PREP_DATA;
}

export function savePrepData(data: PrepDeskData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

export function resetPrepData(): PrepDeskData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }
  return INITIAL_PREP_DATA;
}

export interface ReadinessStats {
  preparedCount: number;
  totalCount: number;
  percentage: number;
  sectionStats: Record<SectionId, { prepared: number; total: number; percentage: number }>;
}

export function calculateReadinessStats(data: PrepDeskData): ReadinessStats {
  let totalItems = 0;
  let preparedItems = 0;

  const sectionStats: Record<SectionId, { prepared: number; total: number; percentage: number }> = {
    'company-research': { prepared: 0, total: 0, percentage: 0 },
    'cv-prep': { prepared: 0, total: 0, percentage: 0 },
    'gd-notes': { prepared: 0, total: 0, percentage: 0 },
    'qa-bank': { prepared: 0, total: 0, percentage: 0 },
    'case-practice': { prepared: 0, total: 0, percentage: 0 },
    'star-behavioural': { prepared: 0, total: 0, percentage: 0 },
    'guesstimates': { prepared: 0, total: 0, percentage: 0 },
    'technical-prep': { prepared: 0, total: 0, percentage: 0 },
  };

  function countStatus(secId: SectionId, status: PreparationStatus) {
    sectionStats[secId].total += 1;
    totalItems += 1;
    if (status === 'Prepared') {
      sectionStats[secId].prepared += 1;
      preparedItems += 1;
    }
  }

  // Section 1
  data.companyFacts.forEach((f) => countStatus('company-research', f.status));

  // Section 2
  data.rcrBullets.forEach((r) => countStatus('cv-prep', r.status));

  // Section 3
  data.gdChecklist.forEach((g) => countStatus('gd-notes', g.status));

  // Section 4
  data.qaBank.forEach((q) => countStatus('qa-bank', q.status));

  // Section 5
  data.cases.forEach((c) => countStatus('case-practice', c.status));

  // Section 6
  data.starStories.forEach((s) => countStatus('star-behavioural', s.status));

  // Section 7
  data.guesstimates.forEach((g) => countStatus('guesstimates', g.status));

  // Section 8
  data.technicalTopics.forEach((t) => countStatus('technical-prep', t.status));

  // Calculate percentages
  SECTIONS.forEach((sec) => {
    const s = sectionStats[sec.id];
    s.percentage = s.total > 0 ? Math.round((s.prepared / s.total) * 100) : 0;
  });

  const percentage = totalItems > 0 ? Math.round((preparedItems / totalItems) * 100) : 0;

  return {
    preparedCount: preparedItems,
    totalCount: totalItems,
    percentage,
    sectionStats,
  };
}
