import { useState } from 'react';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { SYLLABUS_PAPERS } from './data/syllabus';
import { BoardScreen } from './components/BoardScreen';
import { SelectionFlow } from './components/SelectionFlow';
import { MathText } from './components/MathText';
import { OfflineIndicator } from './components/OfflineIndicator';
import { apiUrl, readApiJson } from './lib/apiBase';
import { ttsManager } from './lib/ttsCache';
import type {
  Chapter,
  LanguageMode,
  LectureSolution,
  PaperId,
  Problem,
  YearId,
} from './types/lecture';

interface ActiveRequest {
  question: string;
  paperLabel: string;
  chapterName: string;
  questionType?: string;
  imageBase64?: string;
  imageMimeType?: string;
}

export default function App() {
  const [year, setYear] = useState<YearId>('2nd');
  const [paperId, setPaperId] = useState<PaperId>('IIA');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [language, setLanguage] = useState<LanguageMode>('en');

  const [isSolving, setIsSolving] = useState(false);
  const [solveError, setSolveError] = useState<string | null>(null);
  const [activeRequest, setActiveRequest] = useState<ActiveRequest | null>(null);
  const [activeSolution, setActiveSolution] = useState<LectureSolution | null>(null);

  const solveAndOpenBoard = async (req: ActiveRequest, targetLang: LanguageMode = language) => {
    // Unlock audio element right inside the user's tap gesture for mobile browsers
    ttsManager.unlockOnGesture();

    setActiveRequest(req);
    setActiveSolution(null);
    setSolveError(null);
    setIsSolving(true);

    try {
      const response = await fetch(apiUrl('/api/solve'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: req.question,
          paper: req.paperLabel,
          chapter: req.chapterName,
          questionType: req.questionType,
          language: targetLang,
          imageBase64: req.imageBase64,
          imageMimeType: req.imageMimeType,
        }),
      });

      const data = await readApiJson<LectureSolution>(response);
      if (!data.steps || data.steps.length === 0) {
        throw new Error('No solution steps were returned. Please try again.');
      }

      // Start prefetching step 0 audio immediately before mounting BoardScreen
      if (data.steps[0]?.speech) {
        ttsManager.prefetch(data.steps[0].speech, targetLang);
      }

      setActiveSolution(data);
    } catch (err) {
      setSolveError(err instanceof Error ? err.message : 'Something went wrong while solving.');
    } finally {
      setIsSolving(false);
    }
  };

  const handleStartProblem = (problem: Problem) => {
    const paper = SYLLABUS_PAPERS[paperId];
    void solveAndOpenBoard({
      question: problem.questionLatex,
      paperLabel: paper.title,
      chapterName: selectedChapter?.name || paper.title,
      questionType: `${problem.type} (${problem.marks} Marks)`,
    });
  };

  const handleStartCustomQuestion = (payload: {
    question: string;
    imageBase64?: string;
    imageMimeType?: string;
    paperLabel: string;
    chapterName: string;
  }) => {
    void solveAndOpenBoard({
      question: payload.question,
      paperLabel: payload.paperLabel,
      chapterName: payload.chapterName,
      imageBase64: payload.imageBase64,
      imageMimeType: payload.imageMimeType,
    });
  };

  const handleLanguageChangeOnBoard = (nextLang: LanguageMode) => {
    if (nextLang === language) return;
    setLanguage(nextLang);
    if (activeRequest) {
      void solveAndOpenBoard(activeRequest, nextLang);
    }
  };

  // Loading / Error screen while Gemini solves and runs the 2nd verification pass
  if (isSolving || solveError) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg chalk-frame rounded-2xl overflow-hidden">
          <div className="chalkboard-surface p-6 sm:p-8 text-[#F4F7F2] space-y-5">
            {isSolving ? (
              <>
                <div className="flex items-center gap-3 text-[#FDE047]">
                  <Loader2 className="w-6 h-6 animate-spin shrink-0" />
                  <span className="font-display text-lg font-semibold">
                    Preparing your classroom lecture...
                  </span>
                </div>

                {activeRequest?.question && (
                  <div className="font-chalk text-lg text-[#FEF9C3] bg-white/[0.05] rounded-xl p-3.5">
                    <MathText text={activeRequest.question} />
                  </div>
                )}

                <div className="space-y-1.5 text-sm text-[#F4F7F2]/80">
                  <p>1. Writing TGBIE Intermediate step-by-step working</p>
                  <p>2. Verifying every calculation and final answer</p>
                  <p>
                    3. Preparing{' '}
                    {language === 'te-en' ? 'Telugu-English' : 'English'} lecturer voice
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 text-amber-300">
                  <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-display text-lg font-semibold">
                      Could not prepare lecture
                    </h2>
                    <p className="text-sm text-[#F4F7F2]/85 mt-1">{solveError}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {activeRequest && (
                    <button
                      onClick={() => void solveAndOpenBoard(activeRequest)}
                      className="min-h-[44px] px-4 rounded-xl bg-[#FDE047] text-[#113224] text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#FEF08A] cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Try Again</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSolveError(null);
                      setActiveRequest(null);
                    }}
                    className="min-h-[44px] px-4 rounded-xl border border-white/25 text-sm font-medium text-[#F4F7F2] hover:bg-white/10 cursor-pointer"
                  >
                    Back to Problems
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Board Lecture Screen
  if (activeSolution && activeRequest) {
    return (
      <>
        <BoardScreen
          solution={activeSolution}
          paperLabel={activeRequest.paperLabel}
          chapterName={activeRequest.chapterName}
          language={language}
          onChangeLanguage={handleLanguageChangeOnBoard}
          onBackToSelection={() => {
            setActiveSolution(null);
            setActiveRequest(null);
          }}
        />
        <OfflineIndicator />
      </>
    );
  }

  // Student Selection Flow (Year -> Paper -> Chapter -> Problems / Custom Question)
  return (
    <>
      <SelectionFlow
        year={year}
        paperId={paperId}
        selectedChapter={selectedChapter}
        language={language}
        onSelectYear={setYear}
        onSelectPaper={(pid) => {
          setPaperId(pid);
          setSelectedChapter(null);
        }}
        onSelectChapter={setSelectedChapter}
        onSelectLanguage={setLanguage}
        onStartProblem={handleStartProblem}
        onStartCustomQuestion={handleStartCustomQuestion}
      />
      <OfflineIndicator />
    </>
  );
}
