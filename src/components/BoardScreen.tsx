import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  HelpCircle,
  Loader2,
  MessageSquarePlus,
  Pause,
  Play,
  RotateCcw,
  Send,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type {
  DoubtResponse,
  LanguageMode,
  LectureSolution,
  PlaybackSpeed,
  SimplerExplanation,
} from '../types/lecture';
import { ChalkStepView } from './ChalkStepView';
import { MathText } from './MathText';
import { apiUrl, hasBackendApi, readApiJson } from '../lib/apiBase';
import { ttsManager } from '../lib/ttsCache';

interface BoardScreenProps {
  solution: LectureSolution;
  paperLabel: string;
  chapterName: string;
  language: LanguageMode;
  initialShowFullSolution?: boolean;
  onChangeLanguage: (lang: LanguageMode) => void;
  onBackToSelection: () => void;
}

interface ClarificationState {
  kind: 'simpler' | 'doubt';
  title: string;
  boardNote?: string;
  speech: string;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
  solution,
  paperLabel,
  chapterName,
  language,
  initialShowFullSolution = false,
  onChangeLanguage,
  onBackToSelection,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(() =>
    initialShowFullSolution ? Math.max(0, solution.steps.length - 1) : 0
  );
  const [stepProgress, setStepProgress] = useState(() => (initialShowFullSolution ? 1 : 0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showFullSolution, setShowFullSolution] = useState(initialShowFullSolution);

  // Clarification / Doubt states
  const [clarification, setClarification] = useState<ClarificationState | null>(null);
  const [clarificationLoading, setClarificationLoading] = useState(false);
  const [clarificationError, setClarificationError] = useState<string | null>(null);
  const [doubtOpen, setDoubtOpen] = useState(false);
  const [doubtInput, setDoubtInput] = useState('');

  const playbackTokenRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef<PlaybackSpeed>(speed);
  const mutedRef = useRef<boolean>(isMuted);

  speedRef.current = speed;
  mutedRef.current = isMuted;

  const steps = solution.steps;
  const activeStep = steps[currentStepIdx] ?? steps[0];

  const stopAllAudio = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const audio = ttsManager.getAudioElement();
    audio.onended = null;
    audio.onerror = null;
    try {
      audio.pause();
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }, []);

  const runFallbackSpeechAndSync = useCallback(
    (
      speechText: string,
      stepIdx: number,
      startRatio: number,
      token: number,
      onAdvance: (nextIdx: number) => void
    ) => {
      const words = speechText.split(/\s+/).filter(Boolean).length;
      const estimatedSeconds = Math.max(2.6, words / 2.25);
      let speechEnded = false;
      let animFinished = startRatio >= 1;
      let startTime = performance.now();
      let lastRatio = startRatio;

      const tryFinishStep = () => {
        if (token !== playbackTokenRef.current) return;
        if (speechEnded && animFinished) {
          setTimeout(() => {
            if (token !== playbackTokenRef.current) return;
            if (stepIdx + 1 < steps.length) {
              onAdvance(stepIdx + 1);
            } else {
              setIsPlaying(false);
            }
          }, 320);
        }
      };

      const hasSpeechSynth =
        typeof window !== 'undefined' &&
        'speechSynthesis' in window &&
        typeof SpeechSynthesisUtterance !== 'undefined';

      if (hasSpeechSynth && !mutedRef.current) {
        try {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(speechText);
          utterance.lang = 'en-IN';
          utterance.rate = speedRef.current;
          utterance.onend = () => {
            speechEnded = true;
            if (token !== playbackTokenRef.current) return;
            setStepProgress(1);
            animFinished = true;
            tryFinishStep();
          };
          utterance.onerror = () => {
            speechEnded = true;
          };
          window.speechSynthesis.speak(utterance);
        } catch {
          speechEnded = true;
        }
      } else {
        // Silent paced mode when muted or speechSynthesis unavailable
        speechEnded = false;
      }

      const tick = (now: number) => {
        if (token !== playbackTokenRef.current) return;
        const dtSec = (now - startTime) / 1000;
        startTime = now;
        const increment = (dtSec * speedRef.current) / estimatedSeconds;
        lastRatio = Math.min(hasSpeechSynth && !mutedRef.current ? 0.96 : 1, lastRatio + increment);

        if (speechEnded) {
          lastRatio = 1;
        }

        setStepProgress(lastRatio);

        if (lastRatio >= 1) {
          animFinished = true;
          if (!hasSpeechSynth || mutedRef.current) {
            speechEnded = true;
          }
          tryFinishStep();
          return;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [steps.length]
  );

  const startStepPlayback = useCallback(
    async (stepIdx: number, startRatio = 0) => {
      if (!steps[stepIdx]) return;

      const token = ++playbackTokenRef.current;
      stopAllAudio();

      setShowFullSolution(false);
      setCurrentStepIdx(stepIdx);
      setStepProgress(startRatio);
      setIsPlaying(true);
      setIsLoadingAudio(true);

      const step = steps[stepIdx];

      // Prefetch next step TTS in the background
      if (stepIdx + 1 < steps.length) {
        ttsManager.prefetch(steps[stepIdx + 1].speech, language);
      }

      const audioUrl = await ttsManager.fetchTtsUrl(step.speech, language);
      if (token !== playbackTokenRef.current) return;

      if (!audioUrl) {
        setIsLoadingAudio(false);
        runFallbackSpeechAndSync(step.speech, stepIdx, startRatio, token, (nextIdx) => {
          void startStepPlayback(nextIdx, 0);
        });
        return;
      }

      const audio = ttsManager.getAudioElement();
      audio.src = audioUrl;
      audio.muted = mutedRef.current;
      audio.playbackRate = speedRef.current;

      const beginSyncedAudio = async () => {
        if (token !== playbackTokenRef.current) return;

        try {
          if (startRatio > 0.01 && startRatio < 0.98 && isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime = startRatio * audio.duration;
          } else {
            audio.currentTime = 0;
          }
          audio.playbackRate = speedRef.current;
          audio.muted = mutedRef.current;

          await audio.play();
          if (token !== playbackTokenRef.current) {
            audio.pause();
            return;
          }

          setIsLoadingAudio(false);
          let endedFlag = false;

          audio.onended = () => {
            if (token !== playbackTokenRef.current) return;
            endedFlag = true;
            setStepProgress(1);
            if (rafRef.current !== null) {
              cancelAnimationFrame(rafRef.current);
              rafRef.current = null;
            }
            setTimeout(() => {
              if (token !== playbackTokenRef.current) return;
              if (stepIdx + 1 < steps.length) {
                void startStepPlayback(stepIdx + 1, 0);
              } else {
                setIsPlaying(false);
              }
            }, 340);
          };

          const syncFrame = () => {
            if (token !== playbackTokenRef.current || endedFlag) return;
            const dur = audio.duration;
            if (isFinite(dur) && dur > 0) {
              const ratio = Math.min(1, audio.currentTime / dur);
              setStepProgress(ratio);
            }
            rafRef.current = requestAnimationFrame(syncFrame);
          };

          rafRef.current = requestAnimationFrame(syncFrame);
        } catch {
          // Mobile autoplay blocked or playback error -> fall back gracefully
          if (token !== playbackTokenRef.current) return;
          setIsLoadingAudio(false);
          runFallbackSpeechAndSync(step.speech, stepIdx, startRatio, token, (nextIdx) => {
            void startStepPlayback(nextIdx, 0);
          });
        }
      };

      if (audio.readyState >= 1) {
        void beginSyncedAudio();
      } else {
        audio.onloadedmetadata = () => {
          audio.onloadedmetadata = null;
          void beginSyncedAudio();
        };
        audio.onerror = () => {
          audio.onerror = null;
          if (token !== playbackTokenRef.current) return;
          setIsLoadingAudio(false);
          runFallbackSpeechAndSync(step.speech, stepIdx, startRatio, token, (nextIdx) => {
            void startStepPlayback(nextIdx, 0);
          });
        };
      }
    },
    [language, runFallbackSpeechAndSync, steps, stopAllAudio]
  );

  // Auto-start lecture when BoardScreen mounts unless opened directly in full-solution mode
  useEffect(() => {
    if (initialShowFullSolution) {
      playbackTokenRef.current++;
      stopAllAudio();
      setIsPlaying(false);
      setIsLoadingAudio(false);
      setShowFullSolution(true);
      setCurrentStepIdx(Math.max(0, solution.steps.length - 1));
      setStepProgress(1);
    } else {
      void startStepPlayback(0, 0);
    }
    return () => {
      playbackTokenRef.current++;
      stopAllAudio();
    };
  }, [initialShowFullSolution, solution, startStepPlayback, stopAllAudio]);

  const handlePause = useCallback(() => {
    playbackTokenRef.current++;
    stopAllAudio();
    setIsPlaying(false);
    setIsLoadingAudio(false);
  }, [stopAllAudio]);

  const handlePlay = useCallback(() => {
    ttsManager.unlockOnGesture();
    setClarification(null);
    if (showFullSolution) {
      const targetIdx = currentStepIdx >= steps.length - 1 ? 0 : currentStepIdx;
      void startStepPlayback(targetIdx, 0);
      return;
    }
    if (stepProgress >= 0.99) {
      if (currentStepIdx + 1 < steps.length) {
        void startStepPlayback(currentStepIdx + 1, 0);
      } else {
        void startStepPlayback(0, 0);
      }
      return;
    }
    void startStepPlayback(currentStepIdx, stepProgress);
  }, [currentStepIdx, showFullSolution, startStepPlayback, stepProgress, steps.length]);

  const handleReplayStep = useCallback(() => {
    ttsManager.unlockOnGesture();
    setClarification(null);
    void startStepPlayback(currentStepIdx, 0);
  }, [currentStepIdx, startStepPlayback]);

  const handlePrevStep = useCallback(() => {
    ttsManager.unlockOnGesture();
    setClarification(null);
    const target = Math.max(0, currentStepIdx - 1);
    void startStepPlayback(target, 0);
  }, [currentStepIdx, startStepPlayback]);

  const handleNextStep = useCallback(() => {
    ttsManager.unlockOnGesture();
    setClarification(null);
    const target = Math.min(steps.length - 1, currentStepIdx + 1);
    void startStepPlayback(target, 0);
  }, [currentStepIdx, startStepPlayback, steps.length]);

  const handleSelectStepFromBoard = useCallback(
    (idx: number) => {
      ttsManager.unlockOnGesture();
      setClarification(null);
      void startStepPlayback(idx, 0);
    },
    [startStepPlayback]
  );

  const handleSpeedChange = (nextSpeed: PlaybackSpeed) => {
    setSpeed(nextSpeed);
    const audio = ttsManager.getAudioElement();
    audio.playbackRate = nextSpeed;
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const audio = ttsManager.getAudioElement();
    audio.muted = nextMuted;
    if (nextMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  };

  const handleShowFullSolution = () => {
    handlePause();
    setShowFullSolution(true);
    setCurrentStepIdx(steps.length - 1);
    setStepProgress(1);
  };

  const playClarificationAudio = async (text: string) => {
    const token = ++playbackTokenRef.current;
    const url = await ttsManager.fetchTtsUrl(text, language);
    if (token !== playbackTokenRef.current) return;

    if (url && !mutedRef.current) {
      const audio = ttsManager.getAudioElement();
      audio.src = url;
      audio.muted = mutedRef.current;
      audio.playbackRate = speedRef.current;
      try {
        await audio.play();
      } catch {
        // ignore if blocked
      }
    } else if (!mutedRef.current && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-IN';
        u.rate = speedRef.current;
        window.speechSynthesis.speak(u);
      } catch {
        // ignore
      }
    }
  };

  const handleDidNotUnderstand = async () => {
    ttsManager.unlockOnGesture();
    handlePause();
    setClarificationError(null);
    if (!hasBackendApi()) {
      const localSpeech = activeStep.key_point
        ? `${activeStep.speech} Key tip: ${activeStep.key_point}`
        : activeStep.speech;
      setClarification({
        kind: 'simpler',
        title: `Step Summary · ${activeStep.section_label}`,
        boardNote: activeStep.board_text,
        speech: localSpeech,
      });
      void playClarificationAudio(localSpeech);
      return;
    }
    setClarificationLoading(true);
    try {
      const res = await fetch(apiUrl('/api/explain-simpler'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: solution.question_text,
          currentStep: activeStep,
          language,
        }),
      });
      const data = await readApiJson<SimplerExplanation>(res);
      setClarification({
        kind: 'simpler',
        title: `Simpler Explanation · ${activeStep.section_label}`,
        boardNote: data.board_example,
        speech: data.speech,
      });
      void playClarificationAudio(data.speech);
    } catch (err) {
      setClarificationError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setClarificationLoading(false);
    }
  };

  const handleAskDoubtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;
    ttsManager.unlockOnGesture();
    handlePause();
    setClarificationError(null);
    if (!hasBackendApi()) {
      setClarificationError(
        'Custom AI doubt-answering requires the live server with GEMINI_API_KEY. Use the step breakdown and captions above on this static host.'
      );
      return;
    }
    setClarificationLoading(true);

    try {
      const res = await fetch(apiUrl('/api/ask-doubt'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: solution.question_text,
          currentStep: activeStep,
          doubt: doubtInput.trim(),
          language,
        }),
      });
      const data = await readApiJson<DoubtResponse>(res);
      setClarification({
        kind: 'doubt',
        title: `Doubt Answered · ${activeStep.section_label}`,
        boardNote: data.board_note,
        speech: data.speech,
      });
      setDoubtInput('');
      setDoubtOpen(false);
      void playClarificationAudio(data.speech);
    } catch (err) {
      setClarificationError(err instanceof Error ? err.message : 'Could not answer your doubt.');
    } finally {
      setClarificationLoading(false);
    }
  };

  const handleResumeAfterClarification = () => {
    ttsManager.unlockOnGesture();
    stopAllAudio();
    setClarification(null);
    void startStepPlayback(currentStepIdx, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      {/* Compact Classroom Header (<= 52px for mobile sticky budget) */}
      <header className="sticky top-0 z-30 h-13 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E2E0D8] px-3 sm:px-6 flex items-center justify-between gap-4">
        <button
          onClick={() => {
            handlePause();
            onBackToSelection();
          }}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-medium text-[#18221D] hover:text-[#14452F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Problems</span>
        </button>

        <div className="min-w-0 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#18221D] truncate">
            {paperLabel} · {chapterName}
          </p>
        </div>

        {/* Language Quick Switch */}
        <div className="flex items-center p-0.5 bg-[#E8E6DD] rounded-lg shrink-0">
          <button
            onClick={() => onChangeLanguage('en')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              language === 'en'
                ? 'bg-white text-[#14452F] shadow-xs'
                : 'text-[#526058] hover:text-[#18221D]'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onChangeLanguage('te-en')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              language === 'te-en'
                ? 'bg-white text-[#14452F] shadow-xs'
                : 'text-[#526058] hover:text-[#18221D]'
            }`}
          >
            Te+En
          </button>
        </div>
      </header>

      {/* Main Two-Zone Classroom Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* LEFT / TOP ZONE: THE CHALKBOARD + LIVE CAPTIONS */}
        <section className="lg:col-span-8 flex flex-col gap-3">
          {/* Verification Warning (if second pass could not verify) */}
          {!solution.verified && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
              <div>
                <p className="font-semibold">Solution could not be fully verified</p>
                <p className="text-amber-900 mt-0.5">{solution.verification_note}</p>
              </div>
            </div>
          )}

          {/* DARK GREEN CLASSROOM BOARD */}
          <div className="chalk-frame rounded-2xl overflow-hidden">
            <div className="chalkboard-surface px-4 py-4 sm:px-6 sm:py-5 flex flex-col h-[50vh] min-h-[340px] max-h-[540px] lg:h-[520px] lg:max-h-none">
              {/* Board Top Question Strip */}
              <div className="pb-3 mb-3 border-b border-white/15 shrink-0">
                <div className="flex items-center justify-between gap-2 text-xs text-[#F4F7F2]/65 mb-1">
                  <span className="inline-flex items-center gap-1.5">
                    {solution.verified ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#86EFAC]" />
                        <span>Verified TGBIE Method</span>
                      </>
                    ) : (
                      <span>Unverified Draft</span>
                    )}
                  </span>
                  <span className="font-mono tabular-nums">
                    Step {currentStepIdx + 1} / {steps.length}
                  </span>
                </div>
                <div className="font-chalk text-[17px] sm:text-[19px] text-[#FEF9C3] leading-snug">
                  <span className="font-semibold text-[#FDE047] mr-1.5">Q:</span>
                  <MathText text={solution.question_text} />
                </div>
              </div>

              {/* Scrollable Chalkboard Working Area */}
              <div className="flex-1 overflow-y-auto chalk-scroll pr-1 space-y-2.5">
                {steps.map((step, idx) => (
                  <ChalkStepView
                    key={step.step_number + '-' + idx}
                    step={step}
                    stepIndex={idx}
                    isActive={idx === currentStepIdx}
                    isCompleted={idx < currentStepIdx}
                    isFuture={idx > currentStepIdx}
                    progress={idx === currentStepIdx ? stepProgress : idx < currentStepIdx ? 1 : 0}
                    showFullSolution={showFullSolution}
                    isWritingNow={isPlaying && !isLoadingAudio && idx === currentStepIdx}
                    onSelectStep={handleSelectStepFromBoard}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* LIVE CAPTIONS BELOW THE BOARD */}
          <div className="rounded-xl bg-white border border-[#E2E0D8] px-4 py-3 shadow-xs">
            <div className="flex items-center justify-between gap-2 text-xs text-[#526058] mb-1">
              <span className="font-semibold text-[#14452F]">
                Lecturer Captions · {language === 'te-en' ? 'Telugu-English Mix' : 'English'}
              </span>
              {isLoadingAudio ? (
                <span className="inline-flex items-center gap-1.5 text-[#14452F]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Preparing voice...</span>
                </span>
              ) : isPlaying ? (
                <span>Speaking &amp; writing in sync</span>
              ) : showFullSolution ? (
                <span>Full solution shown</span>
              ) : (
                <span>Paused</span>
              )}
            </div>
            <p className="text-sm sm:text-base text-[#18221D] leading-relaxed">
              {clarification ? clarification.speech : activeStep?.speech}
            </p>
          </div>
        </section>

        {/* RIGHT / BOTTOM ZONE: CONTROLS, SIMPLER RE-EXPLAIN, ASK A DOUBT & STEP LIST */}
        <aside className="lg:col-span-4 mt-4 lg:mt-0 flex flex-col gap-4 pb-8">
          {/* Primary Playback Control Deck */}
          <div className="rounded-2xl bg-white border border-[#E2E0D8] p-4 shadow-xs space-y-4">
            {/* Transport Buttons */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                aria-label="Previous step"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#E2E0D8] text-[#18221D] hover:bg-[#F7F6F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleReplayStep}
                aria-label="Replay current step"
                title="Replay step"
                className="min-h-[44px] px-3 flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E0D8] text-xs font-medium text-[#18221D] hover:bg-[#F7F6F2] transition-colors whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay</span>
              </button>

              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="flex-1 min-h-[48px] px-4 flex items-center justify-center gap-2 rounded-xl bg-[#14452F] text-white font-semibold text-sm hover:bg-[#0F3624] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{stepProgress > 0 && stepProgress < 0.99 ? 'Resume' : 'Play'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIdx >= steps.length - 1}
                aria-label="Next step"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#E2E0D8] text-[#18221D] hover:bg-[#F7F6F2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Speed, Mute & Show Full Solution */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E2E0D8]">
              <div className="flex items-center gap-1 bg-[#F7F6F2] p-1 rounded-lg border border-[#E2E0D8]">
                {([0.75, 1, 1.25] as PlaybackSpeed[]).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    className={`min-h-[34px] px-2.5 text-xs font-medium font-mono tabular-nums rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      speed === spd
                        ? 'bg-white text-[#14452F] shadow-xs'
                        : 'text-[#526058] hover:text-[#18221D]'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  aria-label={isMuted ? 'Unmute lecturer voice' : 'Mute lecturer voice'}
                  className={`min-h-[40px] px-3 flex items-center gap-1.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isMuted
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-[#E2E0D8] text-[#18221D] hover:bg-[#F7F6F2]'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Muted' : 'Voice'}</span>
                </button>

                <button
                  onClick={handleShowFullSolution}
                  className="min-h-[40px] px-3 flex items-center gap-1.5 rounded-lg border border-[#E2E0D8] text-xs font-medium text-[#18221D] hover:bg-[#F7F6F2] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Show full solution</span>
                </button>
              </div>
            </div>
          </div>

          {/* Student Help Actions: "I didn't understand" & "Ask a doubt" */}
          <div className="rounded-2xl bg-white border border-[#E2E0D8] p-4 shadow-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <button
                onClick={handleDidNotUnderstand}
                disabled={clarificationLoading}
                className="min-h-[44px] w-full px-4 py-2.5 flex items-center justify-center gap-2 rounded-xl border border-[#D97706]/40 bg-[#FEF3C7]/45 text-sm font-medium text-[#92400E] hover:bg-[#FEF3C7]/75 disabled:opacity-50 transition-colors cursor-pointer"
              >
                {clarificationLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <HelpCircle className="w-4 h-4" />
                )}
                <span>I didn&apos;t understand this step</span>
              </button>

              <button
                onClick={() => {
                  handlePause();
                  setDoubtOpen((v) => !v);
                }}
                className="min-h-[44px] w-full px-4 py-2.5 flex items-center justify-center gap-2 rounded-xl border border-[#E2E0D8] bg-[#F7F6F2] text-sm font-medium text-[#18221D] hover:bg-[#ECEAE1] transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Ask a doubt</span>
              </button>
            </div>

            {doubtOpen && (
              <form onSubmit={handleAskDoubtSubmit} className="space-y-2 pt-1">
                <label className="block text-xs font-medium text-[#526058]">
                  Ask about {activeStep?.section_label}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={doubtInput}
                    onChange={(e) => setDoubtInput(e.target.value)}
                    placeholder="e.g., Why did we take common here?"
                    className="flex-1 min-h-[44px] rounded-xl border border-[#D4D1C7] bg-white px-3 text-sm text-[#18221D] placeholder:text-[#7A867E] focus:outline-none focus:ring-2 focus:ring-[#14452F]/25 focus:border-[#14452F]"
                  />
                  <button
                    type="submit"
                    disabled={clarificationLoading || !doubtInput.trim()}
                    aria-label="Send doubt"
                    className="min-h-[44px] min-w-[44px] px-3.5 rounded-xl bg-[#14452F] text-white flex items-center justify-center hover:bg-[#0F3624] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {clarificationError && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {clarificationError}
              </p>
            )}

            {clarification && (
              <div className="rounded-xl border border-[#14452F]/25 bg-[#113224] text-[#F4F7F2] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#FDE047]">
                    {clarification.title}
                  </span>
                  <button
                    onClick={() => {
                      stopAllAudio();
                      setClarification(null);
                    }}
                    aria-label="Close clarification"
                    className="p-1 text-[#F4F7F2]/70 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {clarification.boardNote && (
                  <div className="font-chalk text-base sm:text-lg bg-white/[0.06] rounded-lg px-3 py-2 text-[#FEF9C3]">
                    <MathText text={clarification.boardNote} />
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#F4F7F2]/90 leading-relaxed">
                  {clarification.speech}
                </p>

                <button
                  onClick={handleResumeAfterClarification}
                  className="w-full min-h-[40px] rounded-lg bg-[#FDE047] text-[#113224] text-xs font-semibold hover:bg-[#FEF08A] transition-colors cursor-pointer"
                >
                  Got it · Resume Lecture
                </button>
              </div>
            )}
          </div>

          {/* Step Quick Jump List */}
          <div className="rounded-2xl bg-white border border-[#E2E0D8] p-4 shadow-xs">
            <h3 className="text-xs font-semibold text-[#526058] mb-2.5">
              Lecture Steps ({steps.length})
            </h3>
            <div className="space-y-1">
              {steps.map((s, idx) => {
                const active = idx === currentStepIdx;
                const done = idx < currentStepIdx || showFullSolution;
                return (
                  <button
                    key={s.step_number + '-' + idx}
                    onClick={() => handleSelectStepFromBoard(idx)}
                    className={`w-full min-h-[42px] px-3 py-2 rounded-xl text-left text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#14452F] text-white font-semibold'
                        : done
                        ? 'bg-[#F7F6F2] text-[#18221D] hover:bg-[#ECEAE1]'
                        : 'text-[#526058] hover:bg-[#F7F6F2]'
                    }`}
                  >
                    <span className="truncate">
                      {idx + 1}. {s.section_label}
                    </span>
                    <span
                      className={`text-[11px] font-mono tabular-nums shrink-0 ${
                        active ? 'text-white/80' : 'text-[#7A867E]'
                      }`}
                    >
                      {active ? 'Active' : done ? 'Done' : 'Next'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
