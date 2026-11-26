import React, { useMemo } from 'react';
import katex from 'katex';
import { splitTextAndMath } from '../lib/chalkTokenizer';

interface KatexSpanProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export const KatexSpan: React.FC<KatexSpanProps> = ({
  latex,
  displayMode = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return latex;
    }
  }, [latex, displayMode]);

  if (displayMode) {
    return (
      <div
        className={`chalkboard-katex overflow-x-auto max-w-full ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`chalkboard-katex inline-block align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface MathTextProps {
  text: string;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const parts = useMemo(() => splitTextAndMath(text), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <React.Fragment key={index}>{part.value}</React.Fragment>;
        }
        return (
          <KatexSpan
            key={index}
            latex={part.value}
            displayMode={part.type === 'display-math'}
            className={part.type === 'inline-math' ? 'mx-0.5' : 'my-2'}
          />
        );
      })}
    </span>
  );
};
