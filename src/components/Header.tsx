import React from 'react';
import { ReadinessStats } from '../lib/storage';

interface HeaderProps {
  stats: ReadinessStats;
  activeView: 'brief' | 'desk';
  setActiveView: (view: 'brief' | 'desk') => void;
  onOpenBrief: () => void;
  onOpenSettings?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  activeView,
  setActiveView,
  onOpenBrief,
  onOpenSettings,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#f0fdf3]/90 backdrop-blur-md border-b border-[#727973]/15 shadow-xs">
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

          {/* Settings Action Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="bg-[#ffffff] hover:bg-[#e4f1e7] text-[#183828] p-2 rounded-sm border border-[#727973]/20 transition-all cursor-pointer shadow-xs"
              title="Settings & API Key"
            >
              <span className="material-symbols-outlined text-[18px] block">settings</span>
            </button>
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

