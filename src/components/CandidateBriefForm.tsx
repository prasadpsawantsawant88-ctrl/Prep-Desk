import React, { useState } from 'react';
import { CandidateBrief } from '../types';

interface CandidateBriefFormProps {
  initialBrief: CandidateBrief;
  onSaveBrief: (brief: CandidateBrief, generatedData?: any) => void;
  onSkipToDesk: () => void;
}

export const CandidateBriefForm: React.FC<CandidateBriefFormProps> = ({
  initialBrief,
  onSaveBrief,
  onSkipToDesk,
}) => {
  const [companyName, setCompanyName] = useState(initialBrief.companyName || '');
  const [jobTitle, setJobTitle] = useState(initialBrief.jobTitle || '');
  const [jobDescription, setJobDescription] = useState(initialBrief.jobDescription || '');
  const [resumeText, setResumeText] = useState(initialBrief.resumeText || '');
  const [fileName, setFileName] = useState(initialBrief.resumeFileName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const statusMessages = [
    'Analyzing job requirements...',
    'Researching company culture...',
    'Extracting resume highlights...',
    'Drafting personalized questions...',
    'Preparing interview brief...',
  ];

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setResumeText(content.slice(0, 3000));
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) {
      alert('Please enter a Job Description.');
      return;
    }

    setIsLoading(true);
    setStatusIndex(0);

    // Ticker interval
    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < statusMessages.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    try {
      const customApiKey = localStorage.getItem('prepdesk_custom_api_key') || '';

      const res = await fetch('/api/generate-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: customApiKey,
          companyName: companyName || 'Target Company',
          jobTitle: jobTitle || 'Target Role',
          jobDescription,
          resumeText,
        }),
      });

      const json = await res.json();

      setTimeout(() => {
        clearInterval(interval);
        setIsLoading(false);
        onSaveBrief(
          {
            companyName: companyName || 'Target Company',
            jobTitle: jobTitle || 'Target Role',
            jobDescription,
            resumeText,
            resumeFileName: fileName,
          },
          json.success ? json.data : null
        );
      }, 1000);
    } catch (err) {
      console.warn('Generation call failed, using default prep setup:', err);
      setTimeout(() => {
        clearInterval(interval);
        setIsLoading(false);
        onSaveBrief({
          companyName: companyName || 'Target Company',
          jobTitle: jobTitle || 'Target Role',
          jobDescription,
          resumeText,
          resumeFileName: fileName,
        });
      }, 800);
    }
  };

  return (
    <div className="flex flex-col w-full gap-16 relative py-8">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-12 items-center relative z-10 pt-8">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="font-display-lg text-display-lg text-[#183828] text-balance max-w-2xl relative">
            <span className="absolute -left-6 top-2 text-[#456553]/20 font-label-caps text-8xl leading-none font-black select-none pointer-events-none">
              01
            </span>
            Walk in ready, not rehearsed.
          </h1>
          <p className="font-body-lg text-body-lg text-[#424843] max-w-xl">
            Enter the role, the company, and your resume. We'll research, tailor, and drill you.
          </p>
        </div>

        {/* Decorative Motif */}
        <div className="w-full lg:w-1/3 flex justify-end relative h-48 lg:h-72 items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fdbd71]/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <svg
            className="w-4/5 h-auto text-[#abcfb9]/60 relative z-10"
            fill="none"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M120 80h160v240H120z" fill="#f0fdf3" stroke="currentColor" strokeWidth="4"></path>
            <path
              d="M140 120h120M140 160h80M140 200h120M140 240h60"
              stroke="currentColor"
              strokeLinecap="square"
              strokeWidth="4"
            ></path>
            <circle cx="280" cy="260" fill="#f0fdf3" r="60" stroke="#835411" strokeWidth="4"></circle>
            <path d="M322 302l40 40" stroke="#835411" strokeLinecap="square" strokeWidth="8"></path>
          </svg>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative z-20 w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12">
        <div className="hidden lg:block absolute -left-[48px] top-0 bottom-0 w-[1px] bg-[#835411]/20"></div>

        <div className="bg-[#ffffff] rounded-sm shadow-[0_12px_24px_-4px_rgba(47,79,62,0.08)] border border-[#727973]/15 relative flex flex-col pt-[3px]">
          {/* Brass Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#835411]"></div>

          {/* Stamped Tag */}
          <div className="px-8 pt-8 pb-4 border-b border-[#727973]/10 flex items-center justify-between">
            <div className="font-label-caps text-label-caps text-[#183828] tracking-widest bg-[#eaf7ed] px-3 py-1 rounded-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#835411] block"></span>
              CANDIDATE BRIEF
            </div>
            <span className="font-ui-button text-ui-button text-[#424843]/60 uppercase tracking-widest">
              Doc. 42A
            </span>
          </div>

          {!isLoading ? (
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-8">
              {/* Row 1: Company & Role */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2 relative group">
                  <label className="font-headline-md text-base text-[#183828]" htmlFor="company font-semibold">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Enterprise Solutions"
                    className="w-full bg-[#ffffff] text-[#131e18] font-body-md border border-[#727973]/30 rounded-sm px-4 py-3 outline-none transition-all focus:border-[#835411] focus:shadow-[0_2px_0_0_#835411]"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2 relative group">
                  <label className="font-headline-md text-base text-[#183828] font-semibold" htmlFor="role">
                    Job Title
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Product Specialist"
                    className="w-full bg-[#ffffff] text-[#131e18] font-body-md border border-[#727973]/30 rounded-sm px-4 py-3 outline-none transition-all focus:border-[#835411] focus:shadow-[0_2px_0_0_#835411]"
                  />
                </div>
              </div>

              {/* Row 2: Job Description */}
              <div className="flex flex-col gap-2 relative group">
                <label className="font-headline-md text-base text-[#183828] font-semibold flex items-center justify-between" htmlFor="jd">
                  <span>Job Description</span>
                  <span className="text-xs text-[#835411] font-ui-button tracking-wider uppercase font-bold">REQUIRED</span>
                </label>
                <textarea
                  id="jd"
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="w-full bg-[#ffffff] text-[#131e18] font-body-md border border-[#727973]/30 rounded-sm px-4 py-3 outline-none transition-all focus:border-[#835411] focus:shadow-[0_2px_0_0_#835411] resize-y"
                  required
                />
              </div>

              {/* Row 3: Resume Upload / Paste */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-headline-md text-base text-[#183828] font-semibold">Resume Brief</label>
                  {fileName && (
                    <span className="text-xs text-[#835411] font-ui-button flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      {fileName}
                    </span>
                  )}
                </div>

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`w-full relative overflow-hidden bg-[#eaf7ed] group cursor-pointer transition-colors border border-dashed border-[#835411]/40 hover:bg-[#e4f1e7] flex flex-col items-center justify-center p-8 gap-3 rounded-sm ${
                    dragActive ? 'bg-[#e4f1e7] border-[#835411]' : ''
                  }`}
                >
                  <input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-full bg-[#ffffff] shadow-sm flex items-center justify-center text-[#835411] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">upload_file</span>
                  </div>
                  <div className="flex flex-col items-center text-center relative z-10 gap-1">
                    <span className="font-headline-md text-base text-[#183828] font-semibold">
                      {fileName ? `File Attached: ${fileName}` : 'Drop your resume here or click to browse'}
                    </span>
                    <span className="font-body-md text-xs text-[#424843]">
                      PDF, DOCX, or TXT format supported
                    </span>
                  </div>
                </div>

                {/* Optional Resume Text Direct Input */}
                <textarea
                  rows={3}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Or paste your resume key achievements here..."
                  className="w-full bg-[#ffffff] text-[#131e18] font-body-md border border-[#727973]/20 rounded-sm px-3 py-2 text-sm outline-none transition-all focus:border-[#835411]"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-4 flex flex-col items-center gap-4 border-t border-[#727973]/10">
                <button
                  type="submit"
                  className="w-full bg-[#183828] hover:bg-[#2f4f3e] text-white font-headline-md text-xl py-4 rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>Generate My Prep</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-[#424843] pt-2 gap-2">
                  <span>This usually takes 10–15 seconds. Tailoring research to your targets.</span>
                  <button
                    type="button"
                    onClick={onSkipToDesk}
                    className="text-[#835411] underline hover:text-[#183828] font-ui-button cursor-pointer"
                  >
                    Skip directly to Prep Material &rarr;
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-20 gap-8">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full animate-spin text-[#835411]" viewBox="0 0 50 50">
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="30 100"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <span className="material-symbols-outlined text-[#183828] text-[24px]">hourglass_empty</span>
              </div>

              <div className="flex flex-col items-center gap-2 text-center max-w-sm">
                <span className="font-headline-md text-xl text-[#183828] italic font-serif">
                  {statusMessages[statusIndex]}
                </span>
                <span className="text-xs text-[#424843] font-ui-button">
                  Synthesizing company facts, RCR bullets, and strategic Q&A...
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
