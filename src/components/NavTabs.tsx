import React from 'react';
import { SectionId, SectionMeta } from '../types';
import { ReadinessStats } from '../lib/storage';

interface NavTabsProps {
  sections: SectionMeta[];
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  stats: ReadinessStats;
}

export const NavTabs: React.FC<NavTabsProps> = ({
  sections,
  activeSection,
  onSelectSection,
  stats,
}) => {
  return (
    <div className="w-full bg-[#ffffff] border border-[#727973]/15 shadow-sm rounded-sm p-2 overflow-x-auto hide-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {sections.map((sec, idx) => {
          const isActive = sec.id === activeSection;
          const secStat = stats.sectionStats[sec.id];
          const isFullyPrepared = secStat.total > 0 && secStat.prepared === secStat.total;

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm transition-all text-left cursor-pointer border ${
                isActive
                  ? 'bg-[#183828] text-white border-[#183828] shadow-sm'
                  : 'bg-[#f0fdf3]/60 text-[#131e18] border-[#727973]/15 hover:bg-[#e4f1e7]'
              }`}
            >
              {/* Doc code & Icon */}
              <div className="flex items-center gap-1.5">
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#fdbd71]' : 'text-[#835411]'}`}>
                  {sec.icon}
                </span>
                <span className={`font-label-caps text-[10px] tracking-wider ${isActive ? 'text-[#c7ebd4]' : 'text-[#424843]'}`}>
                  0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <span className="font-ui-button text-xs whitespace-nowrap font-medium">
                {sec.title}
              </span>

              {/* Status Indicator */}
              <span
                className={`font-label-caps text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                  isActive
                    ? isFullyPrepared
                      ? 'bg-[#c7ebd4] text-[#002113]'
                      : 'bg-[#fdbd71]/30 text-[#ffddb9]'
                    : isFullyPrepared
                    ? 'bg-[#eaf7ed] text-[#183828] border border-[#183828]/20'
                    : 'bg-[#ffdad6]/60 text-[#93000a]'
                }`}
              >
                {secStat.prepared}/{secStat.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
