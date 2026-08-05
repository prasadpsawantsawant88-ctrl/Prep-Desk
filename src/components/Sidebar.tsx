import React, { useState } from 'react';
import { SectionId, SectionMeta, CandidateBrief } from '../types';
import { ReadinessStats } from '../lib/storage';

interface SidebarProps {
  sections: SectionMeta[];
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  stats: ReadinessStats;
  targetBrief: CandidateBrief;
  onOpenBrief: () => void;
  onOpenSettings?: () => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  onSelectSection,
  stats,
  targetBrief,
  onOpenBrief,
  onOpenSettings,
  onReset,
  searchQuery,
  onSearchChange,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#183828] text-white z-50 flex flex-col justify-between border-r border-[#2f4f3e] transition-all duration-300 shadow-xl ${
          isMobileOpen ? 'translate-x-0 w-80' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-20' : 'lg:w-80'}`}
      >
        {/* Top Header & Brand */}
        <div className="flex flex-col gap-4 p-4 border-b border-[#2f4f3e]">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.svg"
                  alt="Prep Desk Logo"
                  className="w-9 h-9 rounded-sm object-cover border border-[#fdbd71]/40 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h1 className="font-display-md text-base font-bold text-white tracking-wide">
                    PREP DESK
                  </h1>
                  <span className="font-label-caps text-[10px] text-[#c7ebd4] tracking-widest block">
                    DOC. 42A · EXECUTIVE BRIEF
                  </span>
                </div>
              </div>
            ) : (
              <img
                src="/logo.svg"
                alt="Prep Desk Logo"
                className="w-10 h-10 mx-auto rounded-sm object-cover border border-[#fdbd71]/40 shadow-xs"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="hidden lg:flex w-7 h-7 rounded bg-[#224734] hover:bg-[#2c5841] text-[#c7ebd4] items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {collapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden w-8 h-8 rounded bg-[#224734] text-[#c7ebd4] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          {/* Target Candidate Brief Box */}
          {!collapsed && (
            <div className="bg-[#224734] border border-[#3b664d] rounded-sm p-3.5 flex flex-col gap-2.5 shadow-inner">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#fdbd71] block font-bold">
                    Target Profile
                  </span>
                  <h2 className="font-headline-md text-sm font-semibold text-white truncate">
                    {targetBrief.jobTitle || 'Target Role'}
                  </h2>
                  <p className="font-body-md text-xs text-[#c7ebd4] truncate">
                    {targetBrief.companyName || 'Target Company'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onOpenBrief();
                  if (onCloseMobile) onCloseMobile();
                }}
                className="w-full bg-[#835411] hover:bg-[#9c6517] text-white text-xs font-ui-button font-medium py-1.5 px-3 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                <span>Customise Brief</span>
              </button>
            </div>
          )}

          {/* Overall Readiness Meter */}
          {!collapsed && (
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-label-caps text-[10px] text-[#abcfb9] tracking-wider uppercase">
                  Overall Readiness
                </span>
                <span className="font-bold text-[#fdbd71] font-mono">
                  {stats.preparedCount}/{stats.totalCount} ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[#0e271a] rounded-full overflow-hidden border border-[#2f4f3e]">
                <div
                  className="h-full bg-gradient-to-r from-[#835411] to-[#fdbd71] transition-all duration-500 rounded-full"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Search Box */}
          {!collapsed && (
            <div className="relative mt-1">
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-[#abcfb9]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search prep notes & QA..."
                className="w-full bg-[#0e271a] text-xs text-white placeholder-[#abcfb9]/60 pl-8 pr-3 py-2 rounded-sm border border-[#2f4f3e] focus:border-[#fdbd71] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-[#abcfb9] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation Section Links */}
        <div className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-1 hide-scrollbar">
          {sections.map((sec, idx) => {
            const isActive = sec.id === activeSection;
            const secStat = stats.sectionStats[sec.id];
            const isFullyPrepared = secStat.total > 0 && secStat.prepared === secStat.total;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(sec.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={collapsed ? `${sec.title} (${secStat.prepared}/${secStat.total})` : undefined}
                className={`w-full flex items-center transition-all cursor-pointer rounded-sm ${
                  collapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#26533c] text-white border-l-4 border-[#fdbd71] shadow-sm font-semibold'
                    : 'text-[#c7ebd4] hover:bg-[#1e4431] hover:text-white border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      isActive ? 'text-[#fdbd71]' : 'text-[#835411]'
                    }`}
                  >
                    {sec.icon}
                  </span>

                  {!collapsed && (
                    <div className="flex flex-col text-left min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-caps text-[9px] text-[#fdbd71]/80 font-mono">
                          0{idx + 1}
                        </span>
                        <span className="font-ui-button text-xs truncate">{sec.title}</span>
                      </div>
                      <span className="font-body-md text-[10px] text-[#abcfb9]/70 truncate">
                        {sec.subtitle}
                      </span>
                    </div>
                  )}
                </div>

                {!collapsed && (
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm shrink-0 ${
                      isFullyPrepared
                        ? 'bg-[#c7ebd4] text-[#002113]'
                        : isActive
                        ? 'bg-[#835411] text-white'
                        : 'bg-[#0e271a] text-[#abcfb9]'
                    }`}
                  >
                    {secStat.prepared}/{secStat.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#2f4f3e] flex flex-col gap-2">
          {!collapsed ? (
            <div className="flex items-center justify-between text-xs text-[#abcfb9]">
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="hover:text-[#fdbd71] transition-colors flex items-center gap-1 cursor-pointer font-ui-button text-[11px]"
                >
                  <span className="material-symbols-outlined text-[14px]">settings</span>
                  <span>Settings</span>
                </button>
              )}

              <button
                onClick={onReset}
                className="hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer font-ui-button text-[11px]"
              >
                <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                <span>Reset</span>
              </button>

              <button
                onClick={() => window.print()}
                className="hover:text-[#fdbd71] transition-colors flex items-center gap-1 cursor-pointer font-ui-button text-[11px]"
              >
                <span className="material-symbols-outlined text-[14px]">print</span>
                <span>Print</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  title="Settings & API Key"
                  className="w-full flex items-center justify-center py-1.5 text-[#abcfb9] hover:text-[#fdbd71]"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                </button>
              )}
              <button
                onClick={onReset}
                title="Reset Desk"
                className="w-full flex items-center justify-center py-1.5 text-[#abcfb9] hover:text-red-300"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
