import React, { useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import { Lightbulb } from 'lucide-react';
import type { SolutionStep } from '../types/lecture';
import { parseBoardText } from '../lib/chalkTokenizer';
import { MathText } from './MathText';

interface ChalkStepViewProps {
  step: SolutionStep;
  stepIndex: number;
  isActive: boolean;
  isCompleted: boolean;
  isFuture: boolean;
  /** 0..1 writing progress within this step */
  progress: number;
  showFullSolution: boolean;
  isWritingNow: boolean;
  onSelectStep: (index: number) => void;
}

export const ChalkStepView: React.FC<ChalkStepViewProps> = ({
  step,
  stepIndex,
  isActive,
  isCompleted,
  isFuture,
  progress,
  showFullSolution,
  isWritingNow,
  onSelectStep,
}) => {
  const activeAnchorRef = useRef<HTMLDivElement | null>(null);

  const parsed = useMemo(() => parseBoardText(step.board_text), [step.board_text]);

  const revealedUnits = useMemo(() => {
    if (showFullSolution || isCompleted) return parsed.totalUnits;
    if (!isActive || progress <= 0) return 0;
    return Math.min(parsed.totalUnits, Math.max(1, Math.ceil(progress * parsed.totalUnits)));
  }, [showFullSolution, isCompleted, isActive, progress, parsed.totalUnits]);

  // Auto-scroll the board smoothly to the active writing position
  useEffect(() => {
    if (isActive && !showFullSolution && activeAnchorRef.current) {
      activeAnchorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isActive, revealedUnits, showFullSolution]);

  if (isFuture && !showFullSolution) {
    return null;
  }

  // Distribute revealedUnits across lines and segments
  let unitsBudget = revealedUnits;
  let activeLineIdx = -1;

  const renderedLines = parsed.lines.map((line, lineIdx) => {
    if (unitsBudget <= 0) return null;

    const lineStartBudget = unitsBudget;
    const isLinePartial = unitsBudget < line.totalUnits;
    if (isActive && !showFullSolution && (isLinePartial || lineIdx === parsed.lines.length - 1)) {
      if (activeLineIdx === -1) activeLineIdx = lineIdx;
    }

    const segmentNodes = line.segments.map((seg, segIdx) => {
      if (unitsBudget <= 0) return null;

      if (seg.kind === 'prose') {
        const takeCount = Math.min(seg.words.length, unitsBudget);
        unitsBudget -= takeCount;
        const visibleWords = seg.words.slice(0, takeCount);
        const isLastRevealedInSeg = isActive && !showFullSolution && unitsBudget === 0;

        return (
          <span key={segIdx} className="inline">
            {visibleWords.map((word, wIdx) => {
              const isNewest = isLastRevealedInSeg && wIdx === visibleWords.length - 1 && isWritingNow;
              return (
                <span
                  key={wIdx}
                  className={
                    isNewest
                      ? 'text-[#FEF08A] transition-colors duration-150'
                      : undefined
                  }
                >
                  {word}{' '}
                </span>
              );
            })}
          </span>
        );
      } else {
        const takeCount = Math.min(seg.prefixes.length, unitsBudget);
        unitsBudget -= takeCount;
        const latexToRender = seg.prefixes[takeCount - 1] ?? seg.fullLatex;
        const isNewestMath = isActive && !showFullSolution && unitsBudget === 0 && isWritingNow;

        let html = latexToRender;
        try {
          html = katex.renderToString(latexToRender, {
            displayMode: seg.displayMode,
            throwOnError: false,
            strict: false,
          });
        } catch {
          html = latexToRender;
        }

        if (seg.displayMode) {
          return (
            <div
              key={segIdx}
              className={`chalkboard-katex my-1.5 overflow-x-auto max-w-full transition-colors duration-150 ${
                isNewestMath ? 'text-[#FEF08A]' : 'text-[#F4F7F2]'
              }`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={segIdx}
            className={`chalkboard-katex inline-block align-middle mx-1 transition-colors duration-150 ${
              isNewestMath ? 'text-[#FEF08A]' : 'text-[#F4F7F2]'
            }`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
    });

    const isHighlightedLine =
      isActive &&
      !showFullSolution &&
      (lineStartBudget < line.totalUnits ||
        (unitsBudget === 0 && lineIdx === activeLineIdx) ||
        (revealedUnits === parsed.totalUnits && lineIdx === parsed.lines.length - 1));

    return (
      <div
        key={lineIdx}
        ref={isHighlightedLine ? activeAnchorRef : undefined}
        className={`leading-relaxed transition-colors duration-200 ${
          isHighlightedLine
            ? 'bg-white/[0.07] rounded-lg px-2.5 py-1 -mx-2.5 text-[#FEF9C3]'
            : 'text-[#F4F7F2]'
        }`}
      >
        {segmentNodes}
        {isHighlightedLine && isWritingNow && (
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-4 ml-1 align-middle bg-[#FDE047] rounded-xs opacity-90"
          />
        )}
      </div>
    );
  });

  const stepFullyRevealed = revealedUnits >= parsed.totalUnits;

  return (
    <div
      onClick={() => onSelectStep(stepIndex)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectStep(stepIndex);
        }
      }}
      className={`group rounded-xl p-3 sm:p-4 transition-colors cursor-pointer text-left ${
        isActive && !showFullSolution
          ? 'bg-white/[0.05] ring-1 ring-[#FDE047]/40'
          : 'hover:bg-white/[0.03]'
      }`}
    >
      {/* Step Header Label */}
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span
          className={`font-chalk text-base sm:text-lg tracking-wide font-semibold ${
            isActive && !showFullSolution ? 'text-[#FDE047]' : 'text-[#99F6E4]'
          }`}
        >
          {step.section_label}
        </span>
        <span className="text-xs font-mono tabular-nums text-[#F4F7F2]/50">
          Step {stepIndex + 1}
        </span>
      </div>

      {/* Chalkboard Content (Prose in Patrick Hand + Maths in KaTeX) */}
      <div className="font-chalk text-[18px] sm:text-[20px] space-y-1.5 break-words">
        {renderedLines}
      </div>

      {/* Optional Examiner Key Point (appears once step finishes writing) */}
      {step.key_point && stepFullyRevealed && (
        <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-[#FDE047]/10 px-3 py-2 text-xs sm:text-sm text-[#FEF08A]">
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-[#FDE047]" />
          <div>
            <span className="font-semibold">Examiner Tip: </span>
            <MathText text={step.key_point} />
          </div>
        </div>
      )}
    </div>
  );
};
