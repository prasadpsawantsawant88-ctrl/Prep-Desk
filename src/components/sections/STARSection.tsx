import React, { useState } from 'react';
import { PrepDeskData, PreparationStatus, STARStory } from '../../types';

interface STARSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const STARSection: React.FC<STARSectionProps> = ({ data, onChangeData }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newSituation, setNewSituation] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newResult, setNewResult] = useState('');

  const toggleStatus = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      starStories: prev.starStories.map((s) =>
        s.id === id
          ? { ...s, status: (s.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : s
      ),
    }));
  };

  const updateField = (id: string, field: keyof STARStory, value: string) => {
    onChangeData((prev) => ({
      ...prev,
      starStories: prev.starStories.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStory: STARStory = {
      id: `star-${Date.now()}`,
      promptTitle: newTitle,
      situation: newSituation,
      task: newTask,
      action: newAction,
      result: newResult,
      status: 'Prepared',
    };

    onChangeData((prev) => ({
      ...prev,
      starStories: [...prev.starStories, newStory],
    }));

    setNewTitle('');
    setNewSituation('');
    setNewTask('');
    setNewAction('');
    setNewResult('');
  };

  const deleteStory = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      starStories: prev.starStories.filter((s) => s.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Explanation Callout */}
      <section className="bg-[#183828] text-white p-6 md:p-8 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fdbd71]">psychology</span>
            <h2 className="font-headline-md text-xl text-white font-bold">
              The STAR Behavioral Framework
            </h2>
          </div>
          <p className="font-body-md text-sm text-[#9cc0aa] leading-relaxed">
            Behavioral questions ask about a real past situation because <strong>past behavior is the single strongest predictor of future behavior</strong> in stressful work environments.
          </p>
        </div>

        <div className="bg-[#2f4f3e] p-4 rounded-sm border border-[#9cc0aa]/20 flex flex-col gap-1 min-w-[200px] text-center">
          <span className="font-label-caps text-[10px] text-[#fdbd71] uppercase tracking-wider">
            Framework Ratio
          </span>
          <span className="font-headline-md text-sm text-white">
            Situation/Task: 20% | Action: 60% | Result: 20%
          </span>
        </div>
      </section>

      {/* STAR Stories */}
      <section className="flex flex-col gap-8">
        {data.starStories.map((story) => {
          const isPrep = story.status === 'Prepared';
          return (
            <div
              key={story.id}
              className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#727973]/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-label-caps text-xs bg-[#fdbd71]/20 text-[#835411] px-2.5 py-1 rounded-xs uppercase tracking-widest font-bold">
                    STAR Story
                  </span>
                  <input
                    type="text"
                    value={story.promptTitle}
                    onChange={(e) => updateField(story.id, 'promptTitle', e.target.value)}
                    className="font-headline-md text-lg text-[#183828] bg-transparent border-b border-transparent focus:border-[#835411] outline-none font-bold"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(story.id)}
                    className={`font-label-caps text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer border ${
                      isPrep
                        ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                        : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                    }`}
                  >
                    {story.status}
                  </button>

                  {!story.isExample && (
                    <button
                      onClick={() => deleteStory(story.id)}
                      className="text-[#ba1a1a] hover:opacity-80 p-1 cursor-pointer"
                      title="Delete story"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Labeled Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Situation */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#835411] uppercase font-bold flex items-center justify-between">
                    <span>S — Situation (Context & Setup)</span>
                    <span className="text-[10px] text-[#424843]">~15% time</span>
                  </label>
                  <textarea
                    rows={4}
                    value={story.situation}
                    onChange={(e) => updateField(story.id, 'situation', e.target.value)}
                    placeholder="Describe the high-stakes context or roadblock..."
                    className="w-full bg-[#eaf7ed]/40 text-xs p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none leading-relaxed"
                  />
                </div>

                {/* Task */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#835411] uppercase font-bold flex items-center justify-between">
                    <span>T — Task (Your Objective & Ownership)</span>
                    <span className="text-[10px] text-[#424843]">~15% time</span>
                  </label>
                  <textarea
                    rows={4}
                    value={story.task}
                    onChange={(e) => updateField(story.id, 'task', e.target.value)}
                    placeholder="What specific responsibility were you assigned?"
                    className="w-full bg-[#eaf7ed]/40 text-xs p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none leading-relaxed"
                  />
                </div>

                {/* Action */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#183828] uppercase font-bold flex items-center justify-between">
                    <span>A — Action (Direct Execution & Tools)</span>
                    <span className="text-[10px] text-[#183828]">~55% time (HEAVY FOCUS)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={story.action}
                    onChange={(e) => updateField(story.id, 'action', e.target.value)}
                    placeholder="Detail the step-by-step actions you personally took..."
                    className="w-full bg-[#ffffff] text-xs p-3 rounded-sm border border-[#183828]/30 focus:border-[#835411] outline-none leading-relaxed shadow-xs"
                  />
                </div>

                {/* Result */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#183828] uppercase font-bold flex items-center justify-between">
                    <span>R — Result (Quantified Metrics & Takeaways)</span>
                    <span className="text-[10px] text-[#424843]">~15% time</span>
                  </label>
                  <textarea
                    rows={4}
                    value={story.result}
                    onChange={(e) => updateField(story.id, 'result', e.target.value)}
                    placeholder="What were the $ or % outcomes and key learnings?"
                    className="w-full bg-[#eaf7ed]/40 text-xs p-3 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Form to Add New STAR Story */}
      <form
        onSubmit={handleAddStory}
        className="bg-[#eaf7ed] border border-[#183828]/20 p-6 rounded-sm shadow-sm flex flex-col gap-4"
      >
        <h3 className="font-headline-md text-base text-[#183828] font-bold">
          + Add New STAR Story Prompt
        </h3>

        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Prompt Title (e.g. Failure under pressure / Managing conflict with senior dev)"
          className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            rows={2}
            value={newSituation}
            onChange={(e) => setNewSituation(e.target.value)}
            placeholder="Situation..."
            className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
          />
          <textarea
            rows={2}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task..."
            className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
          />
          <textarea
            rows={2}
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="Action..."
            className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
          />
          <textarea
            rows={2}
            value={newResult}
            onChange={(e) => setNewResult(e.target.value)}
            placeholder="Result..."
            className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
          />
        </div>

        <button
          type="submit"
          className="self-end bg-[#183828] hover:bg-[#2f4f3e] text-white font-ui-button text-xs px-4 py-2 rounded-sm cursor-pointer transition-colors"
        >
          Save STAR Story
        </button>
      </form>
    </div>
  );
};
