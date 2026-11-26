import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Camera,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  PenLine,
  Upload,
  X,
} from 'lucide-react';
import { QUESTION_TYPE_META, SYLLABUS_PAPERS } from '../data/syllabus';
import type {
  Chapter,
  LanguageMode,
  PaperId,
  Problem,
  QuestionType,
  YearId,
} from '../types/lecture';
import { MathText } from './MathText';
import { PWAInstallButton } from './PWAInstallButton';
import appLogo from '../assets/images/ipe_maths_logo_1795678172510.jpg';

interface SelectionFlowProps {
  year: YearId;
  paperId: PaperId;
  selectedChapter: Chapter | null;
  language: LanguageMode;
  onSelectYear: (year: YearId) => void;
  onSelectPaper: (paperId: PaperId) => void;
  onSelectChapter: (chapter: Chapter | null) => void;
  onSelectLanguage: (lang: LanguageMode) => void;
  onStartProblem: (problem: Problem) => void;
  onStartCustomQuestion: (payload: {
    question: string;
    imageBase64?: string;
    imageMimeType?: string;
    paperLabel: string;
    chapterName: string;
  }) => void;
}

export const SelectionFlow: React.FC<SelectionFlowProps> = ({
  year,
  paperId,
  selectedChapter,
  language,
  onSelectYear,
  onSelectPaper,
  onSelectChapter,
  onSelectLanguage,
  onStartProblem,
  onStartCustomQuestion,
}) => {
  const [customMode, setCustomMode] = useState<'none' | 'text' | 'photo'>('none');
  const [customText, setCustomText] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoMimeType, setPhotoMimeType] = useState<string>('image/jpeg');
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const paper = SYLLABUS_PAPERS[paperId];
  const papersForYear: PaperId[] = year === '1st' ? ['IA', 'IB'] : ['IIA', 'IIB'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormError(null);
    setPhotoMimeType(file.type || 'image/jpeg');

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (customMode === 'text' && !customText.trim()) {
      setFormError('Please type your maths question first.');
      return;
    }
    if (customMode === 'photo' && !photoPreview) {
      setFormError('Please choose or take a photo of the maths question.');
      return;
    }

    onStartCustomQuestion({
      question: customText.trim(),
      imageBase64: photoPreview ?? undefined,
      imageMimeType: photoPreview ? photoMimeType : undefined,
      paperLabel: paper.title,
      chapterName: selectedChapter ? selectedChapter.name : 'Custom Question',
    });
  };

  const renderCustomPanel = () => {
    if (customMode === 'none') return null;

    return (
      <form
        onSubmit={handleSubmitCustom}
        className="rounded-2xl bg-white border border-[#D4D1C7] p-4 sm:p-6 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-[#18221D]">
              {customMode === 'text' ? 'Type your own question' : 'Upload a photo of the question'}
            </h3>
            <p className="text-xs sm:text-sm text-[#526058] mt-0.5">
              Solved step-by-step using TGBIE Intermediate methods and verified before teaching.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCustomMode('none');
              setFormError(null);
            }}
            aria-label="Close custom question box"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#526058] hover:bg-[#F7F6F2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {customMode === 'text' ? (
          <div>
            <label htmlFor="custom-question-input" className="block text-xs font-medium text-[#526058] mb-1.5">
              Question Statement ({paper.title}{selectedChapter ? ` · ${selectedChapter.name}` : ''})
            </label>
            <textarea
              id="custom-question-input"
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g., Find the derivative of sin(x^2 + 1) from first principles, or Solve dy/dx + y tan x = cos^3 x"
              className="w-full rounded-xl border border-[#D4D1C7] bg-[#F7F6F2]/50 p-3 text-sm sm:text-base text-[#18221D] placeholder:text-[#7A867E] focus:outline-none focus:ring-2 focus:ring-[#14452F]/25 focus:border-[#14452F]"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-[#E2E0D8] bg-[#F7F6F2]">
                <img
                  src={photoPreview}
                  alt="Uploaded maths question preview"
                  referrerPolicy="no-referrer"
                  className="max-h-64 w-full object-contain mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="mt-2 w-full min-h-[40px] text-xs font-medium text-[#526058] hover:text-[#18221D] border-t border-[#E2E0D8] bg-white cursor-pointer"
                >
                  Choose another photo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full min-h-[140px] rounded-xl border border-dashed border-[#A8A396] bg-[#F7F6F2]/70 hover:bg-[#EFECE3] transition-colors flex flex-col items-center justify-center gap-2 p-4 text-center cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#14452F]/10 text-[#14452F] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-[#18221D]">
                  Tap to take a photo or choose an image
                </span>
                <span className="text-xs text-[#526058]">
                  Supports textbook pages, question papers, or handwritten sums
                </span>
              </button>
            )}

            <div>
              <label htmlFor="photo-note-input" className="block text-xs font-medium text-[#526058] mb-1">
                Optional hint or specific sub-question (e.g., &ldquo;Solve question 4(b)&rdquo;)
              </label>
              <input
                id="photo-note-input"
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Optional note..."
                className="w-full min-h-[44px] rounded-xl border border-[#D4D1C7] bg-[#F7F6F2]/50 px-3 text-sm text-[#18221D] placeholder:text-[#7A867E] focus:outline-none focus:ring-2 focus:ring-[#14452F]/25 focus:border-[#14452F]"
              />
            </div>
          </div>
        )}

        {formError && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {formError}
          </p>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setCustomMode('none')}
            className="min-h-[44px] px-4 rounded-xl border border-[#E2E0D8] text-sm font-medium text-[#526058] hover:bg-[#F7F6F2] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="min-h-[44px] px-5 rounded-xl bg-[#14452F] text-white text-sm font-semibold hover:bg-[#0F3624] inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Start Board Lecture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      {/* Top Bar Contract: Single-row 3-zone header */}
      <header className="border-b border-[#E2E0D8] bg-[#F7F6F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <button
            onClick={() => onSelectChapter(null)}
            className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[#14452F] font-display whitespace-nowrap shrink-0 cursor-pointer"
          >
            <img
              src={appLogo}
              alt="IPE Maths Lecturer logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-lg object-cover border border-[#14452F]/20 shrink-0"
            />
            <span>IPE Maths Lecturer</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#526058]">
            <button
              onClick={() => {
                onSelectYear('1st');
                onSelectPaper('IA');
                onSelectChapter(null);
              }}
              className={`hover:text-[#18221D] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                year === '1st' ? 'text-[#14452F] font-semibold' : ''
              }`}
            >
              1st Year
            </button>
            <button
              onClick={() => {
                onSelectYear('2nd');
                onSelectPaper('IIA');
                onSelectChapter(null);
              }}
              className={`hover:text-[#18221D] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                year === '2nd' ? 'text-[#14452F] font-semibold' : ''
              }`}
            >
              2nd Year
            </button>
            <button
              onClick={() => setCustomMode('text')}
              className="hover:text-[#18221D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Type Question
            </button>
            <button
              onClick={() => setCustomMode('photo')}
              className="hover:text-[#18221D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Photo Upload
            </button>
          </nav>

          <button
            onClick={() => setCustomMode(customMode === 'photo' ? 'none' : 'photo')}
            className="min-h-[40px] px-4 py-2 rounded-xl bg-[#14452F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F3624] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Upload Question
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Intro & Lecturer Language Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#E2E0D8]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#526058] mb-1">
              Telangana Intermediate (TGBIE) · Interactive Classroom Board
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18221D] tracking-tight text-balance">
              {selectedChapter
                ? `${paper.title} — ${selectedChapter.name}`
                : 'Choose your year, paper, and chapter to start the board lecture'}
            </h1>
          </div>

          {/* Voice & Captions Language Selector + Install App */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <PWAInstallButton />
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-xs font-medium text-[#526058]">
                Lecturer Voice &amp; Captions
              </span>
              <div className="inline-flex p-1 bg-[#E8E6DD] rounded-xl">
              <button
                onClick={() => onSelectLanguage('en')}
                className={`min-h-[40px] px-3.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-[#14452F] shadow-xs'
                    : 'text-[#526058] hover:text-[#18221D]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onSelectLanguage('te-en')}
                className={`min-h-[40px] px-3.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'te-en'
                    ? 'bg-white text-[#14452F] shadow-xs'
                    : 'text-[#526058] hover:text-[#18221D]'
                }`}
              >
                Telugu + English Mix
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Question / Photo Upload Modal/Inline Panel */}
        {renderCustomPanel()}

        {/* Quick Custom Question Bar (Always reachable on mobile & desktop) */}
        {customMode === 'none' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setCustomMode('text')}
              className="min-h-[52px] px-4 py-3 rounded-2xl bg-white border border-[#E2E0D8] hover:border-[#14452F]/40 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#14452F]/10 text-[#14452F] flex items-center justify-center shrink-0">
                  <PenLine className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#18221D] truncate">
                    Type my own question
                  </p>
                  <p className="text-xs text-[#526058] truncate">
                    Enter any IPE problem to see it solved on the board
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7A867E] shrink-0" />
            </button>

            <button
              onClick={() => setCustomMode('photo')}
              className="min-h-[52px] px-4 py-3 rounded-2xl bg-white border border-[#E2E0D8] hover:border-[#14452F]/40 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#B45309] flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#18221D] truncate">
                    Upload a photo of the question
                  </p>
                  <p className="text-xs text-[#526058] truncate">
                    Snap a textbook page or handwritten sum
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#7A867E] shrink-0" />
            </button>
          </div>
        )}

        {/* STEP 1 & STEP 2: YEAR & PAPER SELECTORS */}
        {!selectedChapter && (
          <section className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1: Select Year */}
              <div className="rounded-2xl bg-white border border-[#E2E0D8] p-4 space-y-3">
                <p className="text-xs font-semibold text-[#526058]">01. Select Year</p>
                <div className="grid grid-cols-2 gap-2">
                  {(['1st', '2nd'] as YearId[]).map((y) => (
                    <button
                      key={y}
                      onClick={() => {
                        onSelectYear(y);
                        onSelectPaper(y === '1st' ? 'IA' : 'IIA');
                      }}
                      className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        year === y
                          ? 'bg-[#14452F] text-white'
                          : 'bg-[#F7F6F2] text-[#18221D] hover:bg-[#ECEAE1]'
                      }`}
                    >
                      {y === '1st' ? '1st Year' : '2nd Year'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Paper */}
              <div className="rounded-2xl bg-white border border-[#E2E0D8] p-4 space-y-3">
                <p className="text-xs font-semibold text-[#526058]">02. Select Paper</p>
                <div className="grid grid-cols-2 gap-2">
                  {papersForYear.map((pid) => {
                    const p = SYLLABUS_PAPERS[pid];
                    const active = paperId === pid;
                    return (
                      <button
                        key={pid}
                        onClick={() => onSelectPaper(pid)}
                        className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? 'bg-[#14452F] text-white'
                            : 'bg-[#F7F6F2] text-[#18221D] hover:bg-[#ECEAE1]'
                        }`}
                      >
                        {p.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Select Chapter */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-bold text-[#18221D]">
                  03. Select Chapter · {paper.title}
                </h2>
                <span className="text-xs text-[#526058] tabular-nums">
                  {paper.chapters.length} Chapters · {paper.subtitle}
                </span>
              </div>

              {paper.chapters.length === 0 ? (
                <div className="rounded-2xl bg-white border border-[#E2E0D8] p-6 sm:p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F7F6F2] text-[#14452F] flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="max-w-lg mx-auto space-y-1.5">
                    <h3 className="text-base sm:text-lg font-semibold text-[#18221D]">
                      {paper.title} ({paper.subtitle})
                    </h3>
                    <p className="text-sm text-[#526058] leading-relaxed">
                      {paper.syllabusNote}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      onClick={() => setCustomMode('text')}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-[#14452F] text-white text-sm font-semibold hover:bg-[#0F3624] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <PenLine className="w-4 h-4" />
                      <span>Type {paper.id} Question</span>
                    </button>
                    <button
                      onClick={() => setCustomMode('photo')}
                      className="min-h-[44px] px-4 py-2 rounded-xl border border-[#D4D1C7] bg-white text-sm font-semibold text-[#18221D] hover:bg-[#F7F6F2] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload Photo</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectYear('2nd');
                        onSelectPaper('IIA');
                      }}
                      className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-[#14452F] hover:underline cursor-pointer"
                    >
                      Browse 2nd Year IIA / IIB
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {paper.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => onSelectChapter(chapter)}
                      className="group rounded-2xl bg-white border border-[#E2E0D8] hover:border-[#14452F] p-4 text-left transition-colors flex flex-col justify-between gap-3 cursor-pointer"
                    >
                      <div>
                        <p className="text-xs text-[#526058] font-mono tabular-nums mb-1">
                          Chapter {String(chapter.number).padStart(2, '0')} · {chapter.problems.length} Practice Problems
                        </p>
                        <h3 className="text-base font-semibold text-[#18221D] group-hover:text-[#14452F] transition-colors">
                          {chapter.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-xs font-medium text-[#14452F] pt-2 border-t border-[#F0EFE9]">
                        <span>VSAQ · SAQ · LAQ</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* STEP 4: SELECT PROBLEM (GROUPED BY VSAQ / SAQ / LAQ) */}
        {selectedChapter && (
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => onSelectChapter(null)}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#14452F] hover:underline cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>All {paper.title} Chapters</span>
              </button>
              <span className="text-xs text-[#526058]">
                All items below are Practice Problems
              </span>
            </div>

            {(['VSAQ', 'SAQ', 'LAQ'] as QuestionType[]).map((qType) => {
              const groupProblems = selectedChapter.problems.filter((p) => p.type === qType);
              if (groupProblems.length === 0) return null;
              const meta = QUESTION_TYPE_META[qType];

              return (
                <div key={qType} className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#E2E0D8] pb-2">
                    <h2 className="text-base sm:text-lg font-bold text-[#18221D]">
                      {meta.label}
                    </h2>
                    <span className="text-xs font-medium text-[#526058] tabular-nums">
                      {meta.marksLabel} · {groupProblems.length}{' '}
                      {groupProblems.length === 1 ? 'problem' : 'problems'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {groupProblems.map((prob, idx) => (
                      <button
                        key={prob.id}
                        onClick={() => onStartProblem(prob)}
                        className="w-full rounded-2xl bg-white border border-[#E2E0D8] hover:border-[#14452F] p-4 sm:p-5 text-left transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#526058]">
                            <span className="font-semibold text-[#18221D]">
                              {idx + 1}. {prob.title}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{prob.sourceLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{prob.marks} Marks</span>
                          </div>
                          <div className="text-sm sm:text-base text-[#18221D] leading-relaxed">
                            <MathText text={prob.questionLatex} />
                          </div>
                        </div>

                        <div className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#14452F] sm:pl-4">
                          <FileText className="w-4 h-4" />
                          <span className="whitespace-nowrap">Teach on Board</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};
