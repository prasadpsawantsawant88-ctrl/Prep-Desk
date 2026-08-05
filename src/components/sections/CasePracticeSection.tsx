import React from 'react';
import { PrepDeskData, PreparationStatus } from '../../types';

interface CasePracticeSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const CasePracticeSection: React.FC<CasePracticeSectionProps> = ({
  data,
  onChangeData,
}) => {
  const currentCase = data.cases[0] || {
    id: 'case-1',
    title: 'Parle-G vs Britannia Bihar Supply Chain Latency',
    prompt:
      'Parle-G takes 4 days to deliver to Bihar, Britannia takes 3 — how would you cut Parle-G\'s time to 3 days?',
    steps: [],
    userAnswer: '',
    status: 'Needs work',
  };

  const toggleStep = (stepId: number) => {
    onChangeData((prev) => ({
      ...prev,
      cases: prev.cases.map((c, idx) =>
        idx === 0
          ? {
              ...c,
              steps: c.steps.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s)),
            }
          : c
      ),
    }));
  };

  const updateAnswer = (answer: string) => {
    onChangeData((prev) => ({
      ...prev,
      cases: prev.cases.map((c, idx) => (idx === 0 ? { ...c, userAnswer: answer } : c)),
    }));
  };

  const toggleCaseStatus = () => {
    onChangeData((prev) => ({
      ...prev,
      cases: prev.cases.map((c, idx) =>
        idx === 0
          ? { ...c, status: (c.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : c
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Worked Example Banner */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#835411] text-[24px]">account_tree</span>
            <div>
              <span className="font-label-caps text-[10px] text-[#835411] tracking-widest uppercase font-bold">
                Worked Case Example
              </span>
              <h2 className="font-headline-md text-xl text-[#183828] font-bold">
                {currentCase.title}
              </h2>
            </div>
          </div>

          <button
            onClick={toggleCaseStatus}
            className={`font-label-caps text-xs px-3 py-1 rounded-sm uppercase tracking-wider cursor-pointer border self-start md:self-auto ${
              currentCase.status === 'Prepared'
                ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
            }`}
          >
            {currentCase.status}
          </button>
        </div>

        {/* Prompt Callout */}
        <div className="bg-[#eaf7ed] p-5 rounded-sm border-l-4 border-[#183828] flex flex-col gap-2">
          <span className="font-label-caps text-xs text-[#183828] font-bold uppercase">
            Case Prompt
          </span>
          <p className="font-body-lg text-base md:text-lg text-[#131e18] font-serif italic">
            "{currentCase.prompt}"
          </p>
        </div>
      </section>

      {/* 5-Step Layered Approach Checklist */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">format_list_numbered</span>
            The 5-Step Layered Case Approach
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">
            {currentCase.steps.filter((s) => s.completed).length} / {currentCase.steps.length} Steps Completed
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {currentCase.steps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`p-4 rounded-sm border cursor-pointer transition-all flex items-start gap-4 ${
                step.completed
                  ? 'bg-[#eaf7ed] border-[#183828]/20'
                  : 'bg-[#ffffff] border-[#727973]/20 hover:border-[#835411]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-sm flex items-center justify-center border shrink-0 mt-0.5 ${
                  step.completed
                    ? 'bg-[#183828] text-white border-[#183828]'
                    : 'bg-white text-transparent border-[#727973]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-headline-md text-base text-[#183828] font-semibold">
                  Step {step.id}: {step.stepName}
                </span>
                <p className="font-body-md text-xs text-[#424843] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free-Text Area for Drafting Solution */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">edit_note</span>
            Draft Your Strategic Solution
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">
            Follow the 5-step framework
          </span>
        </div>

        <textarea
          rows={7}
          value={currentCase.userAnswer}
          onChange={(e) => updateAnswer(e.target.value)}
          placeholder="Step 1: Benchmark Britannia's distribution network...\nStep 2: Identify supply-chain bottlenecks in Bihar transit hubs...\nStep 3: Analyze regional buffer inventory requirements...\nStep 4: Evaluate local contract manufacturing feasibility...\nStep 5: Provide final cost-benefit recommendation."
          className="w-full bg-[#eaf7ed]/40 text-sm p-4 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none font-mono leading-relaxed"
        />

        {currentCase.sampleFrameworkAnswer && (
          <div className="bg-[#e4f1e7] p-4 rounded-sm border border-[#727973]/20 mt-2">
            <span className="font-label-caps text-[10px] text-[#183828] uppercase font-bold block mb-2">
              Reference Solution Framework
            </span>
            <p className="font-body-md text-xs text-[#131e18] whitespace-pre-line leading-relaxed">
              {currentCase.sampleFrameworkAnswer}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
