import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('prepdesk_custom_api_key') || '';
      setApiKey(storedKey);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('prepdesk_custom_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('prepdesk_custom_api_key');
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    localStorage.removeItem('prepdesk_custom_api_key');
    setApiKey('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div
        className="bg-[#ffffff] border border-[#727973]/20 rounded-sm shadow-2xl w-full max-w-lg overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brass Header Bar */}
        <div className="h-[3px] bg-[#835411] w-full"></div>

        {/* Modal Header */}
        <div className="p-6 border-b border-[#727973]/15 flex items-center justify-between bg-[#f0fdf3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#183828] text-[#fdbd71] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-[#183828]">
                Application Settings
              </h3>
              <p className="font-label-caps text-[10px] text-[#835411] tracking-wider uppercase font-semibold">
                API Key & Deployment Configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm text-[#424843] hover:text-[#183828] hover:bg-[#e4f1e7] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-6">
          {/* Custom API Key Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="api-key-input" className="font-headline-md text-sm font-semibold text-[#183828] flex items-center justify-between">
              <span>Custom API Key (Optional)</span>
              <span className="text-[11px] font-mono font-normal text-[#835411]">
                {apiKey ? 'Key Set' : 'Using Server Default'}
              </span>
            </label>

            <div className="relative flex items-center">
              <input
                id="api-key-input"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#f8fdf9] text-xs font-mono text-[#131e18] border border-[#727973]/30 rounded-sm pl-3 pr-10 py-2.5 outline-none transition-all focus:border-[#835411] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 text-[#727973] hover:text-[#183828] p-1"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showKey ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="font-body-md text-xs text-[#424843]">
              Provide a custom key if you want your requests to use your own quota, or leave blank to rely on the backend server environment variable.
            </p>
          </div>

          {/* Vercel Security Note Box */}
          <div className="bg-[#eaf7ed] border border-[#835411]/25 p-4 rounded-sm flex flex-col gap-2.5 text-xs text-[#183828]">
            <div className="flex items-center gap-2 text-[#835411] font-semibold font-ui-button">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Deploying to Vercel — Is my API key safe?</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[#424843] text-[11px] leading-relaxed">
              <li>
                <strong>Server Environment Variables:</strong> When deploying on Vercel, set <code className="bg-white px-1 py-0.5 rounded border border-[#727973]/20 font-mono text-[10px]">GEMINI_API_KEY</code> in Vercel Project Settings &rarr; Environment Variables. It runs securely in Node.js serverless routes and is <strong>never exposed to browser clients</strong>.
              </li>
              <li>
                <strong>Local Custom Key:</strong> Keys entered in this modal are stored exclusively in your browser&apos;s local storage and sent via encrypted HTTPS headers to the server proxy endpoint.
              </li>
            </ul>
          </div>

          {/* Success Message */}
          {savedSuccess && (
            <div className="bg-[#c7ebd4] border border-[#2f4f3e]/30 text-[#002113] p-3 rounded-sm text-xs font-medium flex items-center gap-2 animate-fade-in">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Settings updated successfully!</span>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-[#727973]/15">
            {apiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="font-ui-button text-xs text-red-700 hover:text-red-900 underline cursor-pointer"
              >
                Clear Custom Key
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-ui-button text-xs border border-[#727973]/30 text-[#424843] hover:text-[#183828] rounded-sm hover:bg-[#e4f1e7] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-ui-button text-xs bg-[#183828] hover:bg-[#2f4f3e] text-white rounded-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
