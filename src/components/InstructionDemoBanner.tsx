import React from 'react';

interface InstructionDemoBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenBrief: () => void;
}

export const InstructionDemoBanner: React.FC<InstructionDemoBannerProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenBrief,
}) => {
  if (!isOpen) return null;

  return (
    <div className="relative z-40 w-full bg-[#183828] text-white border-b border-[#fdbd71]/30 px-4 py-3 shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Info & Animated Arrow Pointer */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-sm bg-[#835411] text-[#fdbd71] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-md text-sm font-bold text-[#fdbd71]">
                Quick Instruction Guide
              </span>
              <span className="font-label-caps text-[10px] bg-[#835411]/50 text-white px-2 py-0.5 rounded-xs uppercase tracking-wider font-semibold border border-[#fdbd71]/20">
                Session API Key & Customisation
              </span>
            </div>

            <p className="font-body-md text-xs text-[#e4f1e7] leading-relaxed">
              Click the <strong className="text-[#fdbd71]">Settings ⚙️ icon</strong> in the top header to enter your custom Gemini API key for session-only AI tailroing.
              <span className="hidden sm:inline"> (Keys clear automatically upon reload). </span>
              <strong>No API key?</strong> Prep Desk will still dynamically customize all 8 interview prep documents using our built-in intelligence engine!
            </p>
          </div>
        </div>

        {/* Action Controls & Arrow Callout */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="px-3 py-1.5 bg-[#835411] hover:bg-[#9c6517] text-white text-xs font-ui-button font-semibold rounded-sm transition-all flex items-center gap-1.5 shadow-xs cursor-pointer border border-[#fdbd71]/40"
          >
            <span className="material-symbols-outlined text-[15px] animate-bounce">north_east</span>
            <span>Open Settings</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBrief();
            }}
            className="px-3 py-1.5 bg-[#2f4f3e] hover:bg-[#3d634f] text-[#fdbd71] text-xs font-ui-button font-semibold rounded-sm transition-all flex items-center gap-1.5 border border-[#abcfb9]/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
            <span>Customise Brief</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-[#abcfb9] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            title="Dismiss guide"
          >
            <span className="material-symbols-outlined text-[18px] block">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
