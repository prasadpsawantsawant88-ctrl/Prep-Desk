import React, { useState } from 'react';
import { GuesstimatesItem, PrepDeskData, PreparationStatus } from '../../types';

interface GuesstimatesSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const GuesstimatesSection: React.FC<GuesstimatesSectionProps> = ({
  data,
  onChangeData,
}) => {
  const [newVar, setNewVar] = useState('');

  const currentGuest = data.guesstimates[0] || {
    id: 'guest-1',
    prompt: 'Estimate the daily coffee consumption in Chicago',
    dependentVariable: 'Total cups of coffee consumed per day',
    variables: [],
    notes: '',
    status: 'Needs work',
  };

  const toggleStatus = () => {
    onChangeData((prev) => ({
      ...prev,
      guesstimates: prev.guesstimates.map((g, idx) =>
        idx === 0
          ? { ...g, status: (g.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : g
      ),
    }));
  };

  const updateNotes = (notes: string) => {
    onChangeData((prev) => ({
      ...prev,
      guesstimates: prev.guesstimates.map((g, idx) => (idx === 0 ? { ...g, notes } : g)),
    }));
  };

  const addVariable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVar.trim()) return;

    onChangeData((prev) => ({
      ...prev,
      guesstimates: prev.guesstimates.map((g, idx) =>
        idx === 0 ? { ...g, variables: [...g.variables, newVar] } : g
      ),
    }));
    setNewVar('');
  };

  const removeVariable = (vIndex: number) => {
    onChangeData((prev) => ({
      ...prev,
      guesstimates: prev.guesstimates.map((g, idx) =>
        idx === 0 ? { ...g, variables: g.variables.filter((_, i) => i !== vIndex) } : g
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#727973]/10 pb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="material-symbols-outlined text-[#835411] text-[24px] shrink-0">calculate</span>
            <div className="min-w-0 flex-1">
              <span className="font-label-caps text-[10px] text-[#835411] tracking-widest uppercase font-bold block">
                Guesstimate Framework
              </span>
              <h2 className="font-headline-md text-xl text-[#183828] font-bold break-words leading-snug">
                {currentGuest.prompt}
              </h2>
            </div>
          </div>

          <button
            onClick={toggleStatus}
            className={`font-label-caps text-xs px-3 py-1 rounded-sm uppercase tracking-wider cursor-pointer border self-start md:self-auto shrink-0 ${
              currentGuest.status === 'Prepared'
                ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
            }`}
          >
            {currentGuest.status}
          </button>
        </div>

        {/* Dependent Variable */}
        <div className="bg-[#eaf7ed] p-4 rounded-sm border border-[#183828]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
            <span className="font-label-caps text-xs text-[#183828] font-bold uppercase shrink-0">
              Target Dependent Variable (Y):
            </span>
            <span className="font-headline-md text-base text-[#183828] font-semibold break-words">
              {currentGuest.dependentVariable}
            </span>
          </div>
        </div>
      </section>

      {/* 4-5 Independent Variables Breakdown */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">schema</span>
            4-5 Independent Driving Variables (X₁, X₂, X₃...)
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">
            {currentGuest.variables.length} Variables Listed
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentGuest.variables.map((variable, idx) => (
            <div
              key={idx}
              className="bg-[#f0fdf3] p-3.5 rounded-sm border border-[#727973]/20 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#183828] text-white font-label-caps text-[10px] flex items-center justify-center shrink-0">
                  X{idx + 1}
                </span>
                <span className="font-body-md text-sm text-[#131e18] font-medium">
                  {variable}
                </span>
              </div>

              <button
                onClick={() => removeVariable(idx)}
                className="text-[#ba1a1a] hover:opacity-80 cursor-pointer p-1"
                title="Remove variable"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          ))}
        </div>

        {/* Add New Variable Form */}
        <form onSubmit={addVariable} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newVar}
            onChange={(e) => setNewVar(e.target.value)}
            placeholder="Add independent variable (e.g. Workday vs Weekend variation factor)..."
            className="flex-1 bg-[#eaf7ed]/50 text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
          />
          <button
            type="submit"
            className="bg-[#835411] hover:bg-[#784a05] text-white font-ui-button text-xs px-4 py-2 rounded-sm cursor-pointer"
          >
            + Add Variable
          </button>
        </form>
      </section>

      {/* Math & Calculation Notes */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">function</span>
            Formula, Sanity Checks & Step-by-Step Calculation
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">Sanity Check Included</span>
        </div>

        <textarea
          rows={6}
          value={currentGuest.notes}
          onChange={(e) => updateNotes(e.target.value)}
          placeholder="Formula: Population x Adult % x Coffee Drinker % x Avg Cups/Day x Workday factor..."
          className="w-full bg-[#eaf7ed]/40 text-sm p-4 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none font-mono leading-relaxed"
        />
      </section>
    </div>
  );
};
