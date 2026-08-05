import React, { useState } from 'react';

interface FooterProps {
  onReset: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <footer className="w-full py-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-16 border-t border-[#727973]/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-body-md text-[#424843] text-sm">
          Prep Desk · <span className="text-[#183828] font-semibold">Athenaeum Edition</span>
        </div>

        <div className="flex items-center gap-4">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 font-ui-button text-xs text-[#835411] hover:text-[#784a05] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>START OVER</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-[#ffdad6] p-2 rounded-sm border border-[#ba1a1a]/30">
              <span className="text-xs text-[#93000a] font-ui-button font-bold">Reset all data?</span>
              <button
                onClick={() => {
                  onReset();
                  setShowConfirm(false);
                }}
                className="bg-[#ba1a1a] text-white text-xs px-2.5 py-1 rounded-xs font-ui-button cursor-pointer"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-xs text-[#424843] underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
