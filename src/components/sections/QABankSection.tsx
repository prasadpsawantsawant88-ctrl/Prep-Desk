import React, { useState } from 'react';
import { PrepDeskData, PreparationStatus, QAQuestion } from '../../types';

interface QABankSectionProps {
  data: PrepDeskData;
  onChangeData: (updater: (prev: PrepDeskData) => PrepDeskData) => void;
}

export const QABankSection: React.FC<QABankSectionProps> = ({ data, onChangeData }) => {
  const [filter, setFilter] = useState<string>('All');
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // New question form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newHint, setNewHint] = useState('');
  const [newCategory, setNewCategory] = useState<QAQuestion['category']>('General');
  const [newDraftAnswer, setNewDraftAnswer] = useState('');

  const toggleStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChangeData((prev) => ({
      ...prev,
      qaBank: prev.qaBank.map((q) =>
        q.id === id
          ? { ...q, status: (q.status === 'Prepared' ? 'Needs work' : 'Prepared') as PreparationStatus }
          : q
      ),
    }));
  };

  const updateDraftAnswer = (id: string, answer: string) => {
    onChangeData((prev) => ({
      ...prev,
      qaBank: prev.qaBank.map((q) => (q.id === id ? { ...q, draftAnswer: answer } : q)),
    }));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newItem: QAQuestion = {
      id: `qa-custom-${Date.now()}`,
      question: newQuestion,
      hint: newHint || 'Custom prep drill hint',
      category: newCategory,
      draftAnswer: newDraftAnswer,
      status: 'Prepared',
      isCustom: true,
    };

    onChangeData((prev) => ({
      ...prev,
      qaBank: [newItem, ...prev.qaBank],
    }));

    setNewQuestion('');
    setNewHint('');
    setNewDraftAnswer('');
    setShowAddModal(false);
  };

  const deleteQuestion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeData((prev) => ({
      ...prev,
      qaBank: prev.qaBank.filter((q) => q.id !== id),
    }));
  };

  const categories = ['All', 'Behavioral', 'Resume-Based', 'Company-Specific', 'General'];

  const filteredQuestions = data.qaBank.filter((q) => {
    if (filter === 'All') return true;
    return q.category === filter;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Filter Controls (Imported Screen 2 Style) */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#727973]/15 pb-4">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-md text-headline-md text-[#183828]">
            Personal Interview Questions
          </h2>
          <span className="bg-[#183828] text-white font-ui-button text-xs px-2.5 py-1 rounded-sm shadow-xs">
            {data.qaBank.length} Questions
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#ffffff] p-1 rounded-sm border border-[#727973]/20 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-ui-button text-xs px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#183828] text-white'
                    : 'text-[#424843] hover:text-[#183828] hover:bg-[#eaf7ed]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#835411] hover:bg-[#784a05] text-white font-ui-button text-xs px-3.5 py-2 rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Question</span>
          </button>
        </div>
      </section>

      {/* Add Custom Question Form */}
      {showAddModal && (
        <form
          onSubmit={handleAddQuestion}
          className="bg-[#eaf7ed] border border-[#183828]/30 p-6 rounded-sm shadow-md flex flex-col gap-4 animate-fadeIn"
        >
          <div className="flex justify-between items-center border-b border-[#727973]/20 pb-3">
            <h3 className="font-headline-md text-base text-[#183828] font-bold">
              + Add Custom Interview Question to Bank
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-[#424843] hover:text-[#ba1a1a]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="font-label-caps text-[10px] text-[#183828] uppercase font-bold">
                Question Text
              </label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g. Describe a time you resolved a major team conflict."
                className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-[10px] text-[#183828] uppercase font-bold">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none"
              >
                <option value="General">General</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Resume-Based">Resume-Based</option>
                <option value="Company-Specific">Company-Specific</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-[10px] text-[#835411] uppercase font-bold">
                Strategic Tip / Hint
              </label>
              <input
                type="text"
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                placeholder="e.g. Focus on STAR method, highlight de-escalation."
                className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-[10px] text-[#183828] uppercase font-bold">
                Initial Answer Draft
              </label>
              <input
                type="text"
                value={newDraftAnswer}
                onChange={(e) => setNewDraftAnswer(e.target.value)}
                placeholder="Draft your key answer talking points..."
                className="bg-[#ffffff] text-xs p-2.5 rounded-sm border border-[#727973]/20 outline-none focus:border-[#835411]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="bg-white text-[#424843] font-ui-button text-xs px-3 py-1.5 rounded-sm border border-[#727973]/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#183828] text-white font-ui-button text-xs px-4 py-1.5 rounded-sm"
            >
              Add to Bank
            </button>
          </div>
        </form>
      )}

      {/* Question Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full perspective-1000">
        {filteredQuestions.map((q) => {
          const isFlipped = flippedCardId === q.id;
          const isPrep = q.status === 'Prepared';

          return (
            <div
              key={q.id}
              onClick={() => setFlippedCardId(isFlipped ? null : q.id)}
              className="group min-h-[340px] w-full relative cursor-pointer"
            >
              <div
                className={`relative w-full h-full min-h-[340px] transition-transform duration-500 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full bg-[#ffffff] border border-[#727973]/20 shadow-[0_8px_24px_-8px_rgba(47,79,62,0.12)] p-6 rounded-sm flex flex-col justify-between overflow-y-auto hide-scrollbar [backface-visibility:hidden]">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-label-caps text-[10px] bg-[#fdbd71]/20 text-[#835411] border border-[#835411]/30 px-2 py-1 tracking-widest uppercase rounded-xs font-bold">
                        {q.category}
                      </span>
                      <button
                        onClick={(e) => toggleStatus(q.id, e)}
                        className={`font-label-caps text-[9px] px-2 py-0.5 rounded-xs uppercase tracking-wider border cursor-pointer font-bold ${
                          isPrep
                            ? 'bg-[#c7ebd4] text-[#002113] border-[#abcfb9]'
                            : 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20'
                        }`}
                      >
                        {q.status}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {q.isCustom && (
                        <button
                          onClick={(e) => deleteQuestion(q.id, e)}
                          className="text-[#ba1a1a] hover:opacity-80 p-1"
                          title="Delete custom question"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      )}
                      <span className="material-symbols-outlined text-[#727973] group-hover:text-[#183828] transition-colors">
                        flip_camera_android
                      </span>
                    </div>
                  </div>

                  <div className="my-auto py-4">
                    <h3 className="font-display-lg-mobile text-lg md:text-xl text-[#183828] text-center leading-snug font-serif break-words">
                      "{q.question}"
                    </h3>
                  </div>

                  <div className="flex flex-col items-center gap-1 mt-2">
                    <span className="font-ui-button text-xs text-[#835411] font-semibold flex items-center gap-1 text-center break-words">
                      <span className="material-symbols-outlined text-[14px] shrink-0">lightbulb</span>
                      <span>Hint: {q.hint}</span>
                    </span>
                    <span className="font-ui-button text-[11px] text-[#424843]/70 text-center">
                      Tap card to edit your draft answer & view strategy
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-[#183828] text-white shadow-xl p-6 rounded-sm flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex flex-col gap-3 h-full overflow-y-auto hide-scrollbar">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-label-caps text-[10px] text-[#c7ebd4] px-2 py-0.5 bg-white/10 tracking-widest uppercase rounded-xs">
                        Draft My Answer
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCardId(null);
                        }}
                        className="text-white/70 hover:text-white text-xs font-ui-button flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">flip</span>
                        Flip Back
                      </button>
                    </div>

                    <textarea
                      rows={4}
                      value={q.draftAnswer}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateDraftAnswer(q.id, e.target.value)}
                      placeholder="Type your structured practice answer here..."
                      className="w-full bg-[#2f4f3e] text-white text-xs p-3 rounded-sm border border-[#9cc0aa]/30 focus:border-[#fdbd71] outline-none resize-none"
                    />

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
                      <span className="font-ui-button text-xs text-[#fdbd71] font-bold">
                        STRATEGIC HINT
                      </span>
                      <p className="font-body-md text-xs italic opacity-90 leading-relaxed">
                        {q.hint}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
