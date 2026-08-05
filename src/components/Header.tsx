import React from 'react';
import { ReadinessStats } from '../lib/storage';

interface HeaderProps {
  stats: ReadinessStats;
  companyName?: string;
  jobTitle?: string;
  activeView: 'brief' | 'desk';
  setActiveView: (view: 'brief' | 'desk') => void;
  onOpenBrief: () => void;
  onOpenSettings?: () => void;
  onToggleGuide?: () => void;
  isGuideOpen?: boolean;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  companyName,
  jobTitle,
  activeView,
  setActiveView,
  onOpenBrief,
  onOpenSettings,
  onToggleGuide,
  isGuideOpen,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f0fdf3]/95 backdrop-blur-md border-b border-[#727973]/15 shadow-xs">
      <div className="h-16 px-4 lg:px-8 flex items-center justify-between">
        {/* Mobile Hamburger & Brand */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-sm bg-[#ffffff] border border-[#727973]/20 text-[#183828] hover:bg-[#e4f1e7] transition-colors cursor-pointer"
              title="Toggle Sidebar Menu"
            >
              <span className="material-symbols-outlined text-[20px] block">menu</span>
            </button>
          )}

          <button
            onClick={() => setActiveView('desk')}
            className="border border-[#835411]/40 px-2.5 py-1 rounded-sm shadow-xs bg-[#ffffff] hover:bg-[#eaf7ed] transition-all flex items-center gap-2 group cursor-pointer"
          >
            <img
              src="/logo.svg"
              alt="Prep Desk"
              className="w-5 h-5 rounded-xs object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="font-label-caps text-[12px] text-[#835411] tracking-widest font-bold">
              PREP DESK
            </span>
          </button>

          {companyName && (
            <div className="hidden sm:flex items-center gap-1.5 bg-[#183828] text-white px-2.5 py-1 rounded-xs border border-[#fdbd71]/40 text-xs shadow-xs">
              <span className="material-symbols-outlined text-[14px] text-[#fdbd71]">domain</span>
              <span className="font-bold text-[#fdbd71]">{companyName}</span>
              {jobTitle && <span className="text-[#e4f1e7]/80 truncate max-w-[120px]">({jobTitle})</span>}
            </div>
          )}
        </div>

        {/* Action Controls & Readiness Widget */}
        <div className="flex items-center gap-3">
          {/* Customise Brief Action */}
          <button
            onClick={onOpenBrief}
            className="bg-[#183828] hover:bg-[#2f4f3e] text-white text-xs font-ui-button font-medium px-3.5 py-1.5 rounded-sm transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span className="hidden sm:inline">AI Customiser (CV/JD)</span>
            <span className="sm:hidden">Customise</span>
          </button>

          {/* Guide Help Trigger */}
          {onToggleGuide && (
            <button
              onClick={onToggleGuide}
              className="bg-[#ffffff] hover:bg-[#e4f1e7] text-[#835411] px-2.5 py-1.5 rounded-sm border border-[#835411]/30 transition-all cursor-pointer shadow-xs font-ui-button text-xs font-semibold flex items-center gap-1"
              title="View Instruction Demo & API Key Setup"
            >
              <span className="material-symbols-outlined text-[16px]">help_outline</span>
              <span className="hidden sm:inline">Guide</span>
            </button>
          )}

          {/* Settings Action Button with Callout Arrow */}
          {onOpenSettings && (
            <div className="relative">
              <button
                id="settings-header-btn"
                onClick={onOpenSettings}
                className={`p-2 rounded-sm border transition-all cursor-pointer shadow-xs relative flex items-center justify-center ${
                  isGuideOpen
                    ? 'bg-[#fdbd71] text-[#183828] border-[#835411] ring-2 ring-[#835411]/60 font-bold'
                    : 'bg-[#ffffff] hover:bg-[#e4f1e7] text-[#183828] border-[#727973]/20'
                }`}
                title="Settings & API Key"
              >
                <span className={`material-symbols-outlined text-[20px] block ${isGuideOpen ? 'animate-spin-slow' : ''}`}>
                  settings
                </span>
              </button>

              {/* Direct Upward Pointer Callout Tag */}
              {isGuideOpen && (
                <div className="absolute top-full mt-1.5 right-0 sm:left-1/2 sm:-translate-x-1/2 z-[60] whitespace-nowrap flex flex-col items-end sm:items-center pointer-events-none animate-bounce">
                  {/* Triangle Arrow pointing directly UP to the gear */}
                  <div className="w-0 h-0 border-x-[7px] border-x-transparent border-b-[8px] border-b-[#835411] mr-3 sm:mr-0"></div>
                  <div className="bg-[#fdbd71] text-[#183828] border-2 border-[#835411] text-[11px] font-bold font-mono px-2.5 py-1 rounded-sm shadow-xl flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#835411]">arrow_upward</span>
                    <span>Add API Key Here ⚙️</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Readiness Pill */}
          <div className="hidden md:flex items-center gap-2 bg-[#ffffff] px-3 py-1 rounded-sm border border-[#727973]/20 shadow-xs">
            <span className="font-label-caps text-[9px] text-[#424843] uppercase tracking-wider">
              Readiness:
            </span>
            <span className="font-headline-md text-xs text-[#183828] font-bold font-mono">
              {stats.percentage}% ({stats.preparedCount}/{stats.totalCount})
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

