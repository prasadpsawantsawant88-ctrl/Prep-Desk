import React, { useState } from 'react';
import { PrepDeskData, PreparationStatus, RCRBullet } from '../../types';

interface CVPreparationSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const CVPreparationSection: React.FC<CVPreparationSectionProps> = ({
  data,
  onChangeData,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContribution, setNewContribution] = useState('');
  const [newResult, setNewResult] = useState('');

  const updateMasterCv = (val: string) => {
    onChangeData((prev) => ({ ...prev, masterCvNotes: val }));
  };

  const updateFinalCv = (val: string) => {
    onChangeData((prev) => ({ ...prev, finalCvNotes: val }));
  };

  const toggleRcrStatus = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      rcrBullets: prev.rcrBullets.map((b) =>
        b.id === id
          ? { ...b, status: (b.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : b
      ),
    }));
  };

  const updateRcrBullet = (id: string, field: keyof RCRBullet, value: string) => {
    onChangeData((prev) => ({
      ...prev,
      rcrBullets: prev.rcrBullets.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  };

  const handleAddBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newBullet: RCRBullet = {
      id: `rcr-${Date.now()}`,
      bulletTitle: newTitle,
      roleAndResponsibility: newRole,
      contribution: newContribution,
      result: newResult,
      status: 'Prepared',
    };

    onChangeData((prev) => ({
      ...prev,
      rcrBullets: [...prev.rcrBullets, newBullet],
    }));

    setNewTitle('');
    setNewRole('');
    setNewContribution('');
    setNewResult('');
  };

  const deleteRcrBullet = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      rcrBullets: prev.rcrBullets.filter((b) => b.id !== id),
    }));
  };

  const fit = data.resumeFit;

  return (
    <div className="flex flex-col gap-10">
      {/* Resume Fit Panel (Imported Design Screen 2) */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-label-caps text-label-caps text-[#835411] tracking-[0.2em] uppercase font-bold">
              Resume Fit For This Role
            </h2>
            <div className="font-headline-md text-headline-md text-[#183828]">
              {fit.alignment}
            </div>
          </div>

          {/* Fit Meter */}
          <div className="flex flex-col gap-2 min-w-[220px]">
            <div className="flex justify-between font-label-caps text-[10px] text-[#424843] tracking-widest font-bold">
              <span>POOR</span>
              <span className="text-[#183828]">STRONG</span>
            </div>
            <div className="flex gap-1 h-3">
              <div className="flex-1 bg-[#dfebe2] overflow-hidden rounded-xs">
                <div className="h-full bg-[#183828] w-full"></div>
              </div>
              <div className="flex-1 bg-[#dfebe2] overflow-hidden rounded-xs">
                <div className="h-full bg-[#183828] w-full"></div>
              </div>
              <div className="flex-1 bg-[#dfebe2] overflow-hidden rounded-xs">
                <div className="h-full bg-[#183828] w-full"></div>
              </div>
              <div className="flex-1 bg-[#dfebe2] overflow-hidden rounded-xs">
                <div className="h-full bg-[#183828] w-full"></div>
              </div>
              <div className="flex-1 bg-[#dfebe2] overflow-hidden rounded-xs">
                <div
                  className="h-full bg-[#183828] transition-all duration-700"
                  style={{ width: `${Math.max(20, fit.scorePercentage - 80) * 5}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-[#eaf7ed] p-6 shadow-sm flex flex-col gap-4 rounded-sm border border-[#183828]/10">
            <h3 className="font-headline-md text-[18px] text-[#183828] flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-[20px] text-[#183828]">check_circle</span>
              What's Working
            </h3>
            <ul className="font-body-md text-[#131e18] space-y-3 text-sm">
              {fit.whatsWorking.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#183828] mt-0.5 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div className="bg-[#ffdad6]/20 p-6 shadow-sm flex flex-col gap-4 relative rounded-sm border border-[#ba1a1a]/20">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#ba1a1a]/60"></div>
            <h3 className="font-headline-md text-[18px] text-[#93000a] flex items-center gap-2 font-semibold">
              <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">warning</span>
              What's Missing
            </h3>
            <ul className="font-body-md text-[#131e18] space-y-3 text-sm">
              {fit.whatsMissing.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ba1a1a] mt-0.5 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keywords to Surface */}
          <div className="bg-[#ffffff] p-6 shadow-sm flex flex-col gap-4 rounded-sm border border-[#727973]/20">
            <h3 className="font-label-caps text-label-caps text-[#424843] uppercase tracking-widest font-bold">
              Keywords to Surface
            </h3>
            <div className="flex flex-wrap gap-2">
              {fit.keywordsToSurface.map((kw, idx) => (
                <span
                  key={idx}
                  className="font-ui-button text-xs text-[#835411] bg-[#f0fdf3] border border-[#835411]/40 px-3 py-1.5 rounded-sm shadow-xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Bullet Rewrites */}
          <div className="bg-[#ffffff] p-6 shadow-sm flex flex-col gap-4 rounded-sm border border-[#727973]/20">
            <h3 className="font-label-caps text-label-caps text-[#424843] uppercase tracking-widest font-bold">
              Suggested Rewrite
            </h3>
            <div className="flex flex-col gap-3 text-xs md:text-sm">
              <div className="bg-[#d0ddd4]/40 p-3 rounded-sm opacity-70 line-through text-[#424843]">
                "{fit.suggestedRewrite.original}"
              </div>
              <div className="flex justify-center text-[#835411] -my-1 z-10 relative">
                <span className="material-symbols-outlined bg-[#ffffff] rounded-full text-[16px]">
                  arrow_downward
                </span>
              </div>
              <div className="bg-[#183828]/5 p-3 rounded-sm text-[#183828] font-medium border border-[#183828]/10">
                "{fit.suggestedRewrite.rewritten}"
              </div>
              <p className="font-body-md text-xs text-[#424843] italic mt-1">
                {fit.suggestedRewrite.reason}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "Slap Test" Callout */}
      <section className="bg-[#fdbd71]/20 border-l-4 border-[#835411] p-6 rounded-sm shadow-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#835411]">quiz</span>
          <h3 className="font-headline-md text-lg text-[#835411] font-bold">
            The "Slap Test" Reminder
          </h3>
        </div>
        <p className="font-body-md text-sm text-[#131e18] leading-relaxed">
          <strong>Question:</strong> Can someone remove your name from a CV bullet and slap it onto another candidate's resume without anyone noticing?
          <br />
          If <strong>yes</strong>, the bullet fails the Slap Test! Remedy this by adding direct team sizes, $ or % metrics, tool names, and explicit ownership.
        </p>
      </section>

      {/* Master CV vs Final CV Toggle/Notes */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">compare_arrows</span>
            <h3 className="font-headline-md text-xl text-[#183828]">
              Master CV vs Final CV Notes
            </h3>
          </div>
          <span className="font-ui-button text-xs text-[#424843]">Strategy Alignment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#183828] uppercase tracking-wider font-bold">
              Master CV Repository Notes
            </label>
            <textarea
              rows={4}
              value={data.masterCvNotes}
              onChange={(e) => updateMasterCv(e.target.value)}
              placeholder="All historical achievements, project metrics, credentials..."
              className="w-full bg-[#eaf7ed]/40 text-sm p-3.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-xs text-[#835411] uppercase tracking-wider font-bold">
              Tailored Final CV Strategy Notes
            </label>
            <textarea
              rows={4}
              value={data.finalCvNotes}
              onChange={(e) => updateFinalCv(e.target.value)}
              placeholder="Selected high-impact bullets tailored specifically for this JD..."
              className="w-full bg-[#eaf7ed]/40 text-sm p-3.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>
        </div>
      </section>

      {/* RCR Builder (Role & Responsibility, Contribution, Result) */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">view_kanban</span>
            <h3 className="font-headline-md text-xl text-[#183828]">
              RCR Bullet Builder (Role & Responsibility → Contribution → Result)
            </h3>
          </div>
          <span className="text-xs font-label-caps text-[#424843] uppercase tracking-wider">
            {data.rcrBullets.length} Bullets Crafted
          </span>
        </div>

        {/* Existing Bullets */}
        <div className="flex flex-col gap-6">
          {data.rcrBullets.map((bullet) => {
            const isPrep = bullet.status === 'Prepared';
            return (
              <div
                key={bullet.id}
                className="bg-[#f0fdf3]/50 p-5 rounded-sm border border-[#727973]/20 flex flex-col gap-4 relative"
              >
                <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={bullet.bulletTitle}
                      onChange={(e) => updateRcrBullet(bullet.id, 'bulletTitle', e.target.value)}
                      className="font-headline-md text-base text-[#183828] bg-transparent border-b border-transparent focus:border-[#835411] outline-none font-semibold"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleRcrStatus(bullet.id)}
                      className={`font-label-caps text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer border ${
                        isPrep
                          ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                          : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                      }`}
                    >
                      {bullet.status}
                    </button>

                    <button
                      onClick={() => deleteRcrBullet(bullet.id)}
                      className="text-[#ba1a1a] hover:opacity-80 p-1 cursor-pointer"
                      title="Delete bullet"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-[10px] text-[#424843] uppercase font-bold">
                      1. Role & Responsibility
                    </label>
                    <textarea
                      rows={3}
                      value={bullet.roleAndResponsibility}
                      onChange={(e) =>
                        updateRcrBullet(bullet.id, 'roleAndResponsibility', e.target.value)
                      }
                      placeholder="What was your assigned role?"
                      className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-[10px] text-[#835411] uppercase font-bold">
                      2. Contribution (Direct Actions & Tools)
                    </label>
                    <textarea
                      rows={3}
                      value={bullet.contribution}
                      onChange={(e) => updateRcrBullet(bullet.id, 'contribution', e.target.value)}
                      placeholder="What specific actions did you execute?"
                      className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-[10px] text-[#183828] uppercase font-bold">
                      3. Quantified Result (Metrics & Impact)
                    </label>
                    <textarea
                      rows={3}
                      value={bullet.result}
                      onChange={(e) => updateRcrBullet(bullet.id, 'result', e.target.value)}
                      placeholder="What were the $ or % outcome metrics?"
                      className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New RCR Bullet Form */}
        <form
          onSubmit={handleAddBullet}
          className="bg-[#eaf7ed] p-5 rounded-sm border border-[#183828]/20 flex flex-col gap-4 mt-2"
        >
          <h4 className="font-headline-md text-sm text-[#183828] font-bold uppercase tracking-wider">
            + Add New RCR Bullet
          </h4>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Bullet Identifier (e.g., Cross-Functional API Overhaul)"
            className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Role & Responsibility..."
              className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
            <input
              type="text"
              value={newContribution}
              onChange={(e) => setNewContribution(e.target.value)}
              placeholder="Direct Contribution & Tools..."
              className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
            <input
              type="text"
              value={newResult}
              onChange={(e) => setNewResult(e.target.value)}
              placeholder="Quantified Result (% / $)..."
              className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
            />
          </div>

          <button
            type="submit"
            className="self-end bg-[#183828] hover:bg-[#2f4f3e] text-white font-ui-button text-xs px-4 py-2 rounded-sm cursor-pointer transition-colors"
          >
            Save Bullet
          </button>
        </form>
      </section>
    </div>
  );
};
