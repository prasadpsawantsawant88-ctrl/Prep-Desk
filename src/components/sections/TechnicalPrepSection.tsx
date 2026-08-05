import React, { useState } from 'react';
import { PrepDeskData, PreparationStatus, TechnicalTopic } from '../../types';

interface TechnicalPrepSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const TechnicalPrepSection: React.FC<TechnicalPrepSectionProps> = ({
  data,
  onChangeData,
}) => {
  const [newTopic, setNewTopic] = useState('');
  const [newSource, setNewSource] = useState<'JD' | 'CV' | 'Curriculum'>('JD');
  const [newNotes, setNewNotes] = useState('');

  const toggleStatus = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      technicalTopics: prev.technicalTopics.map((t) =>
        t.id === id
          ? { ...t, status: (t.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : t
      ),
    }));
  };

  const updateNotes = (id: string, notes: string) => {
    onChangeData((prev) => ({
      ...prev,
      technicalTopics: prev.technicalTopics.map((t) => (t.id === id ? { ...t, notes } : t)),
    }));
  };

  const updateGeneralNotes = (notes: string) => {
    onChangeData((prev) => ({
      ...prev,
      technicalGeneralNotes: notes,
    }));
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const topic: TechnicalTopic = {
      id: `tech-${Date.now()}`,
      topic: newTopic,
      source: newSource,
      notes: newNotes,
      status: 'Needs work',
    };

    onChangeData((prev) => ({
      ...prev,
      technicalTopics: [...prev.technicalTopics, topic],
    }));

    setNewTopic('');
    setNewNotes('');
  };

  const deleteTopic = (id: string) => {
    onChangeData((prev) => ({
      ...prev,
      technicalTopics: prev.technicalTopics.filter((t) => t.id !== id),
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Golden Rules Callout Box */}
      <section className="bg-[#183828] text-white p-6 md:p-8 rounded-sm shadow-md flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fdbd71] text-[24px]">terminal</span>
            <h2 className="font-headline-md text-xl text-white font-bold">
              Technical Round Golden Rules
            </h2>
          </div>

          <div className="flex flex-col gap-2 font-body-md text-sm text-[#9cc0aa]">
            <p className="flex items-start gap-2">
              <span className="text-[#fdbd71] font-bold">1. Honesty Policy:</span>
              <span>
                If you don't know an answer, <strong>say so honestly and offer to follow up afterwards — NEVER freeze or try to bluff</strong>.
              </span>
            </p>

            <p className="flex items-start gap-2">
              <span className="text-[#fdbd71] font-bold">2. 95% Rule:</span>
              <span>
                <strong>~95% of technical questions</strong> originate directly from explicit terms on your <strong>JD</strong>, claimed achievements on your <strong>CV</strong>, or core domain <strong>curriculum</strong>.
              </span>
            </p>
          </div>
        </div>

        <div className="bg-[#2f4f3e] p-4 rounded-sm border border-[#9cc0aa]/20 flex flex-col gap-1 min-w-[200px] text-center shrink-0">
          <span className="font-label-caps text-[10px] text-[#fdbd71] uppercase tracking-wider">
            Primary Question Sources
          </span>
          <span className="font-headline-md text-sm text-white">JD (60%) | CV (30%) | Core (10%)</span>
        </div>
      </section>

      {/* Technical Topics Checklist */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-4">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">quiz</span>
            Technical Concepts Review
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">
            {data.technicalTopics.filter((t) => t.status === 'Prepared').length} / {data.technicalTopics.length} Prepared
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {data.technicalTopics.map((topic) => {
            const isPrep = topic.status === 'Prepared';
            return (
              <div
                key={topic.id}
                className={`p-5 rounded-sm border transition-all flex flex-col gap-3 ${
                  isPrep
                    ? 'bg-[#eaf7ed] border-[#183828]/20'
                    : 'bg-[#ffffff] border-[#727973]/20 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleStatus(topic.id)}
                      className={`w-6 h-6 rounded-sm flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${
                        isPrep
                          ? 'bg-[#183828] text-white border-[#183828]'
                          : 'bg-white text-transparent border-[#727973]/40 hover:border-[#835411]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>

                    <span className="font-headline-md text-base text-[#183828] font-semibold break-words leading-snug">
                      {topic.topic}
                    </span>

                    <span
                      className={`font-label-caps text-[10px] px-2 py-0.5 rounded-xs uppercase ${
                        topic.source === 'JD'
                          ? 'bg-[#183828] text-white'
                          : topic.source === 'CV'
                          ? 'bg-[#835411] text-white'
                          : 'bg-[#4a4840] text-white'
                      }`}
                    >
                      Source: {topic.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(topic.id)}
                      className={`font-label-caps text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer border ${
                        isPrep
                          ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                          : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                      }`}
                    >
                      {topic.status}
                    </button>

                    <button
                      onClick={() => deleteTopic(topic.id)}
                      className="text-[#ba1a1a] hover:opacity-80 p-1 cursor-pointer"
                      title="Delete topic"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <div className="pl-9">
                  <input
                    type="text"
                    value={topic.notes}
                    onChange={(e) => updateNotes(topic.id, e.target.value)}
                    placeholder="Add technical revision notes, first principles, or code snippets..."
                    className="w-full bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Technical Topic Form */}
        <form
          onSubmit={handleAddTopic}
          className="bg-[#eaf7ed] border border-[#183828]/20 p-5 rounded-sm flex flex-col gap-3 mt-2"
        >
          <h4 className="font-headline-md text-sm text-[#183828] font-bold uppercase tracking-wider">
            + Add Technical Topic to Review
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Topic (e.g. Distributed Caching / Microservice Circuit Breakers)"
              className="md:col-span-2 bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
              required
            />

            <select
              value={newSource}
              onChange={(e) => setNewSource(e.target.value as any)}
              className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
            >
              <option value="JD">Source: Job Description</option>
              <option value="CV">Source: My Resume</option>
              <option value="Curriculum">Source: Core Curriculum</option>
            </select>

            <button
              type="submit"
              className="bg-[#183828] hover:bg-[#2f4f3e] text-white font-ui-button text-xs py-2 px-4 rounded-sm cursor-pointer transition-colors"
            >
              Add Topic
            </button>
          </div>

          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Revision notes & first principle concepts..."
            className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
          />
        </form>
      </section>

      {/* General Technical Strategy Notes */}
      <section className="bg-[#ffffff] border border-[#727973]/15 p-6 md:p-8 rounded-sm shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#727973]/10 pb-3">
          <h3 className="font-headline-md text-lg text-[#183828] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#835411]">sticky_note_2</span>
            General Technical Strategy & Script
          </h3>
          <span className="font-ui-button text-xs text-[#424843]">First Principles First</span>
        </div>

        <textarea
          rows={5}
          value={data.technicalGeneralNotes}
          onChange={(e) => updateGeneralNotes(e.target.value)}
          placeholder="Script your response for unknown technical questions..."
          className="w-full bg-[#eaf7ed]/40 text-sm p-4 rounded-sm border border-[#727973]/20 focus:border-[#835411] outline-none font-mono leading-relaxed"
        />
      </section>
    </div>
  );
};
