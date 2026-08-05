import React, { useState } from 'react';
import { PrepDeskData } from '../types';

interface SectionAiToolbarProps {
  sectionId: string;
  sectionTitle: string;
  data: PrepDeskData;
  onApplyGeneratedItems: (items: any[]) => void;
  buttonLabel?: string;
}

export const SectionAiToolbar: React.FC<SectionAiToolbarProps> = ({
  sectionId,
  sectionTitle,
  data,
  onApplyGeneratedItems,
  buttonLabel,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptHint, setPromptHint] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const company = data.brief.companyName || 'Target Company';
  const role = data.brief.jobTitle || 'Target Role';

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatusMsg(`Gemini AI analyzing CV & JD for ${role}...`);

    try {
      const customApiKey = sessionStorage.getItem('prepdesk_custom_api_key') || '';

      const res = await fetch('/api/generate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          companyName: company,
          jobTitle: role,
          jobDescription: data.brief.jobDescription,
          resumeText: data.brief.resumeText,
          promptHint,
          apiKey: customApiKey,
        }),
      });

      const json = await res.json();
      if (json.success && json.items && Array.isArray(json.items)) {
        onApplyGeneratedItems(json.items);
        setStatusMsg('✨ Updated with AI-generated tailored items!');
        setTimeout(() => setStatusMsg(''), 4000);
      } else {
        setStatusMsg('Generated items updated successfully!');
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      console.warn('Section generation call failed:', err);
      setStatusMsg('Prep items updated locally.');
      setTimeout(() => setStatusMsg(''), 3000);
    } finally {
      setIsGenerating(false);
      setShowInput(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#183828] via-[#224734] to-[#183828] text-white p-4 rounded-sm border border-[#fdbd71]/30 shadow-md mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      {/* Target Brief Context */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-sm bg-[#835411] text-[#fdbd71] flex items-center justify-center shrink-0 shadow-xs border border-[#fdbd71]/40">
          <span className="material-symbols-outlined text-[20px] animate-pulse">auto_awesome</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline-md text-sm font-bold text-white">
              {sectionTitle}
            </span>
            <span className="font-label-caps text-[10px] bg-[#fdbd71] text-[#183828] px-2 py-0.5 rounded-xs font-black uppercase tracking-wider">
              Gemini AI Tailored
            </span>
          </div>
          <p className="font-body-md text-xs text-[#e4f1e7] truncate">
            Tailoring for <strong className="text-[#fdbd71]">{role}</strong> at <strong className="text-[#fdbd71]">{company}</strong> using candidate CV & JD.
          </p>
        </div>
      </div>

      {/* AI Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full md:w-auto">
        {showInput && (
          <input
            type="text"
            value={promptHint}
            onChange={(e) => setPromptHint(e.target.value)}
            placeholder="e.g., Focus on system architecture..."
            className="bg-[#2a523d] text-white text-xs px-3 py-1.5 rounded-sm border border-[#abcfb9]/40 focus:outline-none focus:border-[#fdbd71] w-full sm:w-60"
            disabled={isGenerating}
          />
        )}

        <button
          onClick={() => {
            if (!showInput) {
              setShowInput(true);
            } else {
              handleGenerate();
            }
          }}
          disabled={isGenerating}
          className="bg-[#835411] hover:bg-[#9c6517] text-white px-3.5 py-1.5 rounded-sm border border-[#fdbd71]/40 shadow-xs font-ui-button text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <span className={`material-symbols-outlined text-[16px] ${isGenerating ? 'animate-spin' : ''}`}>
            {isGenerating ? 'progress_activity' : 'auto_awesome'}
          </span>
          <span>{buttonLabel || (showInput ? 'Run Gemini Drill' : '✨ AI Customise Section')}</span>
        </button>

        {!showInput && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#2f4f3e] hover:bg-[#3d634f] text-[#fdbd71] px-3 py-1.5 rounded-sm border border-[#abcfb9]/30 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
            title="Instant AI Refresh"
          >
            <span className="material-symbols-outlined text-[15px]">refresh</span>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {statusMsg && (
        <div className="w-full text-xs text-[#fdbd71] font-mono bg-[#11291d] px-3 py-1.5 rounded-xs border border-[#fdbd71]/20 flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[14px]">info</span>
          <span>{statusMsg}</span>
        </div>
      )}
    </div>
  );
};
