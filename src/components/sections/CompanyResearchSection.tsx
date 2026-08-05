import React from 'react';
import { PrepDeskData, PreparationStatus } from '../../types';
import { SectionAiToolbar } from '../SectionAiToolbar';

interface CompanyResearchSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const CompanyResearchSection: React.FC<CompanyResearchSectionProps> = ({
  data,
  onChangeData,
}) => {
  const toggleFactStatus = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      companyFacts: prev.companyFacts.map((f) =>
        f.id === id
          ? { ...f, status: (f.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : f
      ),
    }));
  };

  const updateFactNotes = (id: string, notes: string) => {
    onChangeData((prev) => ({
      ...prev,
      companyFacts: prev.companyFacts.map((f) => (f.id === id ? { ...f, notes } : f)),
    }));
  };

  const updateCPCC = (key: keyof PrepDeskData['cpcc'], value: string) => {
    onChangeData((prev) => ({
      ...prev,
      cpcc: { ...prev.cpcc, [key]: value },
    }));
  };

  const updateJDNotes = (value: string) => {
    onChangeData((prev) => ({
      ...prev,
      jdResearchNotes: value,
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Gemini AI Customisation Toolbar */}
      <SectionAiToolbar
        sectionId="company-research"
        sectionTitle="Company Deep Dive & Market Intelligence"
        data={data}
        buttonLabel="✨ AI Research Company Facts"
        onApplyGeneratedItems={(newItems) => {
          onChangeData((prev) => {
            const formatted = newItems.map((item, idx) => ({
              id: item.id || `fact-ai-${Date.now()}-${idx}`,
              label: item.label || 'Strategic Insight',
              description: item.description || 'Company intelligence',
              notes: item.notes || 'Interview talking point',
              status: item.status || 'Needs work',
            }));
            return {
              ...prev,
              companyFacts: [...formatted, ...prev.companyFacts],
            };
          });
        }}
      />

      {/* Company Snapshot Panel (Imported Design Screen 2) */}
      <section className="relative bg-[#ffffff] shadow-[0_12px_24px_-4px_rgba(47,79,62,0.08)] border border-[#727973]/15 p-6 md:p-10 rounded-sm overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#835411]"></div>
        
        <div className="flex items-center justify-between mb-6 border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#835411] text-[20px]">domain</span>
            <h2 className="font-label-caps text-label-caps text-[#835411] tracking-[0.2em] uppercase font-bold">
              Company Snapshot
            </h2>
          </div>
          <span className="font-ui-button text-xs text-[#424843]/70 uppercase tracking-widest">
            {data.brief.companyName || 'Target Company'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="font-body-lg text-body-lg text-[#131e18] leading-relaxed">
              {data.companySnapshot.overview}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <h3 className="font-label-caps text-label-caps text-[#424843] uppercase tracking-widest">
                Recent News & Catalysts
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.companySnapshot.recentNews.map((news, idx) => (
                  <span
                    key={idx}
                    className="font-ui-button text-[12px] bg-[#dfebe2] text-[#131e18] px-3.5 py-1.5 rounded-full shadow-sm border border-[#727973]/20"
                  >
                    {news}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#e4f1e7] p-6 rounded-sm relative overflow-hidden border border-[#727973]/15">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#abcfb9]/20 rounded-full blur-2xl"></div>
            <h3 className="font-label-caps text-label-caps text-[#183828] uppercase tracking-widest mb-4 font-bold">
              Culture & Core Values
            </h3>
            <ul className="flex flex-col gap-3 font-body-md text-[#131e18]">
              {data.companySnapshot.cultureAndValues.map((val, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#183828] mt-2 shrink-0"></div>
                  <span className="text-sm">
                    <strong className="text-[#183828]">{val.title}:</strong> {val.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CPCC Framework Tracker */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">hub</span>
            <h3 className="font-headline-md text-xl text-[#183828]">
              CPCC Framework Tracker
            </h3>
          </div>
          <span className="text-xs font-label-caps text-[#424843] uppercase tracking-widest">
            Company / Product / Client / Competitors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#835411] uppercase tracking-wider flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">apartment</span>
              Company
            </label>
            <textarea
              rows={3}
              value={data.cpcc.company}
              onChange={(e) => updateCPCC('company', e.target.value)}
              placeholder="Company profile, business model, culture & values..."
              className="w-full bg-[#eaf7ed]/50 text-sm p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#835411] uppercase tracking-wider flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              Product
            </label>
            <textarea
              rows={3}
              value={data.cpcc.product}
              onChange={(e) => updateCPCC('product', e.target.value)}
              placeholder="Core products, APIs, features, roadmap..."
              className="w-full bg-[#eaf7ed]/50 text-sm p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#835411] uppercase tracking-wider flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">person_pin</span>
              Client
            </label>
            <textarea
              rows={3}
              value={data.cpcc.client}
              onChange={(e) => updateCPCC('client', e.target.value)}
              placeholder="Target ICPs, buyer personas, pain points..."
              className="w-full bg-[#eaf7ed]/50 text-sm p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#835411] uppercase tracking-wider flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[16px]">swords</span>
              Competitors
            </label>
            <textarea
              rows={3}
              value={data.cpcc.competitors}
              onChange={(e) => updateCPCC('competitors', e.target.value)}
              placeholder="Key market rivals, differentiators, moats..."
              className="w-full bg-[#eaf7ed]/50 text-sm p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>
        </div>
      </section>

      {/* "Why This Organization" Checklist */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">fact_check</span>
            <h3 className="font-headline-md text-xl text-[#183828]">
              "Why This Organization" Checklist
            </h3>
          </div>
          <span className="text-xs font-ui-button text-[#424843]">
            Mark items as Prepared / Needs work
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {data.companyFacts.map((fact) => {
            const isPrep = fact.status === 'Prepared';
            return (
              <div
                key={fact.id}
                className={`p-4 rounded-sm border transition-all ${
                  isPrep
                    ? 'bg-[#eaf7ed] border-[#183828]/20'
                    : 'bg-[#ffffff] border-[#727973]/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleFactStatus(fact.id)}
                      className={`w-6 h-6 rounded-sm flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${
                        isPrep
                          ? 'bg-[#183828] text-white border-[#183828]'
                          : 'bg-white text-transparent border-[#727973]/40 hover:border-[#835411]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>
                    <span className="font-headline-md text-base text-[#183828] font-semibold break-words leading-snug">
                      {fact.label}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFactStatus(fact.id)}
                    className={`font-label-caps text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer border ${
                      isPrep
                        ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                        : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                    }`}
                  >
                    {fact.status}
                  </button>
                </div>

                <p className="font-body-md text-sm text-[#424843] mb-3 pl-9">
                  {fact.description}
                </p>

                <div className="pl-9">
                  <input
                    type="text"
                    value={fact.notes}
                    onChange={(e) => updateFactNotes(fact.id, e.target.value)}
                    placeholder="Add your personal notes for this checklist item..."
                    className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* JD Research Notes Field */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">note_alt</span>
            JD Research Notes (Keywords & Concepts)
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">Auto-saved</span>
        </div>

        <textarea
          rows={4}
          value={data.jdResearchNotes}
          onChange={(e) => updateJDNotes(e.target.value)}
          placeholder="List industry keywords, technical concepts, or specific metrics from the JD to look up before your interview..."
          className="w-full bg-[#eaf7ed]/40 text-sm p-4 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none font-mono"
        />
      </section>
    </div>
  );
};
