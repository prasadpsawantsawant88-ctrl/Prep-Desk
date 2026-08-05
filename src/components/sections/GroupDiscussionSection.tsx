import React from 'react';
import { PrepDeskData, PreparationStatus } from '../../types';
import { SectionAiToolbar } from '../SectionAiToolbar';

interface GroupDiscussionSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const GroupDiscussionSection: React.FC<GroupDiscussionSectionProps> = ({
  data,
  onChangeData,
}) => {
  const toggleStatus = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      gdChecklist: prev.gdChecklist.map((item) =>
        item.id === id
          ? {
              ...item,
              status: (item.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus,
            }
          : item
      ),
    }));
  };

  const updateNotes = (id: string, notes: string) => {
    onChangeData((prev) => ({
      ...prev,
      gdChecklist: prev.gdChecklist.map((item) => (item.id === id ? { ...item, notes } : item)),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Gemini AI Customisation Toolbar */}
      <SectionAiToolbar
        sectionId="gd"
        sectionTitle="Group Discussion Debates & Trends"
        data={data}
        buttonLabel="✨ AI Generate GD Topic"
        onApplyGeneratedItems={(newItems) => {
          onChangeData((prev) => {
            const formatted = newItems.map((item, idx) => ({
              id: item.id || `gd-ai-${Date.now()}-${idx}`,
              title: item.title || 'Industry Disruption Debate',
              description: item.description || 'Trending market topic',
              notes: item.notes || 'Opening thesis & counter-arguments',
              status: item.status || 'Needs work',
            }));
            return {
              ...prev,
              gdChecklist: [...formatted, ...prev.gdChecklist],
            };
          });
        }}
      />

      {/* Overview Callout */}
      <section className="bg-[#183828] text-white p-6 md:p-8 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fdbd71]">groups</span>
            <h2 className="font-headline-md text-xl text-white font-bold">
              Group Discussion Strategy Ledger
            </h2>
          </div>
          <p className="font-body-md text-sm text-[#9cc0aa] leading-relaxed">
            In Group Discussions, evaluators test for logical consistency, active listening, composure, and turn-taking finesse rather than aggressive volume.
          </p>
        </div>

        <div className="bg-[#2f4f3e] p-4 rounded-sm border border-[#9cc0aa]/20 flex flex-col gap-1 min-w-[200px] text-center">
          <span className="font-label-caps text-[10px] text-[#fdbd71] uppercase tracking-wider">
            Target Focus
          </span>
          <span className="font-headline-md text-base text-white">3-4 Quality Entries</span>
        </div>
      </section>

      {/* Checklist Grid */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">checklist</span>
            GD Execution Pillars
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">
            {data.gdChecklist.filter((i) => i.status === 'Prepared').length} / {data.gdChecklist.length} Prepared
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data.gdChecklist.map((item) => {
            const isPrep = item.status === 'Prepared';
            return (
              <div
                key={item.id}
                className={`p-6 rounded-sm border transition-all flex flex-col gap-4 ${
                  isPrep
                    ? 'bg-[#eaf7ed] border-[#183828]/20'
                    : 'bg-[#ffffff] border-[#727973]/20 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`w-6 h-6 rounded-sm flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${
                        isPrep
                          ? 'bg-[#183828] text-white border-[#183828]'
                          : 'bg-white text-transparent border-[#727973]/40 hover:border-[#835411]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>
                    <h4 className="font-headline-md text-base text-[#183828] font-semibold break-words leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`font-label-caps text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer border self-start sm:self-auto ${
                      isPrep
                        ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                        : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                <p className="font-body-md text-sm text-[#424843] pl-9">
                  {item.description}
                </p>

                <div className="pl-9 flex flex-col gap-1">
                  <label className="font-label-caps text-[10px] text-[#835411] uppercase font-bold">
                    My Strategy Notes & Tactical Prompts
                  </label>
                  <textarea
                    rows={3}
                    value={item.notes}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Enter your notes on how you will demonstrate this pillar..."
                    className="w-full bg-[#ffffff] text-xs p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
