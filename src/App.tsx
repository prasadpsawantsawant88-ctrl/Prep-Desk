import { useState, useEffect } from 'react';
import { SectionId, PrepDeskData } from './types';
import { SECTIONS } from './data/initialData';
import { loadPrepData, savePrepData, resetPrepData, calculateReadinessStats } from './lib/storage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { CandidateBriefForm } from './components/CandidateBriefForm';
import { SettingsModal } from './components/SettingsModal';

import { CompanyResearchSection } from './components/sections/CompanyResearchSection';
import { CVPreparationSection } from './components/sections/CVPreparationSection';
import { GroupDiscussionSection } from './components/sections/GroupDiscussionSection';
import { QABankSection } from './components/sections/QABankSection';
import { CasePracticeSection } from './components/sections/CasePracticeSection';
import { STARSection } from './components/sections/STARSection';
import { GuesstimatesSection } from './components/sections/GuesstimatesSection';
import { TechnicalPrepSection } from './components/sections/TechnicalPrepSection';

export default function App() {
  const [data, setData] = useState<PrepDeskData>(() => loadPrepData());
  const [activeView, setActiveView] = useState<'brief' | 'desk'>('desk');
  const [activeSection, setActiveSection] = useState<SectionId>('company-research');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist whenever data changes
  useEffect(() => {
    savePrepData(data);
  }, [data]);

  const stats = calculateReadinessStats(data);

  const handleUpdateData = (updater: (prev: PrepDeskData) => PrepDeskData) => {
    setData((prev) => {
      const next = updater(prev);
      savePrepData(next);
      return next;
    });
  };

  const handleSaveBrief = (brief: PrepDeskData['brief'], generatedData?: any) => {
    handleUpdateData((prev) => {
      const updated = {
        ...prev,
        brief,
      };

      if (generatedData) {
        if (generatedData.companyOverview) {
          updated.companySnapshot = {
            overview: generatedData.companyOverview,
            recentNews: generatedData.recentNews || prev.companySnapshot.recentNews,
            cultureAndValues: generatedData.cultureAndValues || prev.companySnapshot.cultureAndValues,
          };
        }

        if (generatedData.cpcc) {
          updated.cpcc = {
            ...prev.cpcc,
            ...generatedData.cpcc,
          };
        }

        if (generatedData.companyFacts && Array.isArray(generatedData.companyFacts)) {
          updated.companyFacts = generatedData.companyFacts;
        }

        if (generatedData.jdResearchNotes) {
          updated.jdResearchNotes = generatedData.jdResearchNotes;
        }

        if (generatedData.alignment) {
          updated.resumeFit = {
            alignment: generatedData.alignment,
            scorePercentage: generatedData.scorePercentage || 88,
            whatsWorking: generatedData.whatsWorking || prev.resumeFit.whatsWorking,
            whatsMissing: generatedData.whatsMissing || prev.resumeFit.whatsMissing,
            keywordsToSurface: generatedData.keywordsToSurface || prev.resumeFit.keywordsToSurface,
            suggestedRewrite: generatedData.suggestedRewrite || prev.resumeFit.suggestedRewrite,
          };
        }

        if (generatedData.rcrBullets && Array.isArray(generatedData.rcrBullets)) {
          updated.rcrBullets = generatedData.rcrBullets;
        }

        if (generatedData.qaBank && Array.isArray(generatedData.qaBank)) {
          updated.qaBank = generatedData.qaBank;
        } else if (generatedData.customQuestions && Array.isArray(generatedData.customQuestions)) {
          const generatedItems = generatedData.customQuestions.map((q: any, i: number) => ({
            id: `gen-qa-${Date.now()}-${i}`,
            category: q.category || 'Company-Specific',
            question: q.question,
            draftAnswer: q.draftAnswer || '',
            hint: q.hint || 'Tailored prompt',
            status: 'Needs work',
            isCustom: true,
          }));
          updated.qaBank = [...generatedItems, ...prev.qaBank];
        }

        if (generatedData.starStories && Array.isArray(generatedData.starStories)) {
          updated.starStories = generatedData.starStories;
        }

        if (generatedData.cases && Array.isArray(generatedData.cases)) {
          updated.cases = generatedData.cases;
        }

        if (generatedData.guesstimates && Array.isArray(generatedData.guesstimates)) {
          updated.guesstimates = generatedData.guesstimates;
        }

        if (generatedData.technicalTopics && Array.isArray(generatedData.technicalTopics)) {
          updated.technicalTopics = generatedData.technicalTopics;
        }

        if (generatedData.gdChecklist && Array.isArray(generatedData.gdChecklist)) {
          updated.gdChecklist = generatedData.gdChecklist;
        }
      }

      return updated;
    });

    setActiveView('desk');
  };

  const handleReset = () => {
    const defaultData = resetPrepData();
    setData(defaultData);
    setActiveView('desk');
    setActiveSection('company-research');
  };

  const currentSectionMeta = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  return (
    <div className="bg-[#f0fdf3] font-sans text-[#131e18] min-h-screen flex flex-row">
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Sidebar Navigation */}
      <Sidebar
        sections={SECTIONS}
        activeSection={activeSection}
        onSelectSection={(id) => {
          setActiveSection(id);
          if (activeView === 'brief') setActiveView('desk');
        }}
        stats={stats}
        targetBrief={data.brief}
        onOpenBrief={() => setActiveView('brief')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={handleReset}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Bar */}
        <Header
          stats={stats}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenBrief={() => setActiveView('brief')}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Content Workspace */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 lg:px-8 py-6 flex flex-col gap-6">
          {activeView === 'brief' ? (
            <CandidateBriefForm
              initialBrief={data.brief}
              onSaveBrief={handleSaveBrief}
              onSkipToDesk={() => setActiveView('desk')}
            />
          ) : (
            <div className="flex flex-col gap-6">
              {/* Target Brief Overview Banner */}
              <div className="bg-[#ffffff] border border-[#727973]/15 p-4 md:p-6 rounded-sm shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-sm bg-[#183828] text-[#fdbd71] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {currentSectionMeta.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-label-caps text-[10px] text-[#835411] tracking-wider uppercase font-bold">
                        {currentSectionMeta.docCode}
                      </span>
                      <span className="text-xs text-[#727973]">·</span>
                      <span className="text-xs text-[#183828] font-medium truncate">
                        {data.brief.jobTitle || 'Target Role'} @ {data.brief.companyName || 'Target Company'}
                      </span>
                    </div>
                    <h1 className="font-headline-md text-xl text-[#183828] font-bold truncate">
                      {currentSectionMeta.title}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveView('brief')}
                    className="font-ui-button text-xs bg-[#183828] hover:bg-[#2f4f3e] text-white px-3.5 py-2 rounded-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>Customise for CV / JD</span>
                  </button>
                </div>
              </div>

              {/* Active Section View */}
              <div className="transition-all duration-300">
                {activeSection === 'company-research' && (
                  <CompanyResearchSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'cv-prep' && (
                  <CVPreparationSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'gd-notes' && (
                  <GroupDiscussionSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'qa-bank' && (
                  <QABankSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'case-practice' && (
                  <CasePracticeSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'star-behavioural' && (
                  <STARSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'guesstimates' && (
                  <GuesstimatesSection data={data} onChangeData={handleUpdateData} />
                )}
                {activeSection === 'technical-prep' && (
                  <TechnicalPrepSection data={data} onChangeData={handleUpdateData} />
                )}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer onReset={handleReset} />
      </div>
    </div>
  );
}

