import katex from 'katex';

export interface ProseToken {
  kind: 'word';
  text: string;
}

export interface MathSegment {
  kind: 'math';
  displayMode: boolean;
  fullLatex: string;
  /** Progressive valid KaTeX prefix strings from first term up to fullLatex */
  prefixes: string[];
}

export interface ProseSegment {
  kind: 'prose';
  words: string[];
}

export type LineSegment = ProseSegment | MathSegment;

export interface ParsedBoardLine {
  segments: LineSegment[];
  /** Total reveal units across all segments in this line */
  totalUnits: number;
}

export interface ParsedBoardStep {
  lines: ParsedBoardLine[];
  totalUnits: number;
}

/**
 * Splits a LaTeX string into progressive end-indices corresponding to
 * mathematical terms (variables, numbers, operators, \frac{}{}, \sqrt{}, etc.)
 * and validates each prefix with KaTeX so raw LaTeX is NEVER displayed.
 */
function buildProgressiveMathPrefixes(rawLatex: string, displayMode: boolean): string[] {
  const latex = rawLatex.trim();
  if (!latex) return [];

  const n = latex.length;
  const candidateEnds: number[] = [];
  let i = 0;

  const consumeBalancedGroup = (start: number, openChar = '{', closeChar = '}'): number => {
    if (start >= n || latex[start] !== openChar) return start;
    let depth = 0;
    let idx = start;
    while (idx < n) {
      if (latex[idx] === '\\' && idx + 1 < n) {
        idx += 2;
        continue;
      }
      if (latex[idx] === openChar) depth++;
      else if (latex[idx] === closeChar) {
        depth--;
        if (depth === 0) return idx + 1;
      }
      idx++;
    }
    return n;
  };

  const consumeScripts = (start: number): number => {
    let idx = start;
    while (idx < n) {
      while (idx < n && latex[idx] === ' ') idx++;
      if (idx < n && (latex[idx] === '^' || latex[idx] === '_')) {
        idx++;
        while (idx < n && latex[idx] === ' ') idx++;
        if (idx < n && latex[idx] === '{') {
          idx = consumeBalancedGroup(idx);
        } else if (idx < n && latex[idx] === '\\') {
          idx++;
          while (idx < n && /[a-zA-Z]/.test(latex[idx])) idx++;
        } else if (idx < n) {
          idx++;
        }
      } else {
        break;
      }
    }
    return idx;
  };

  while (i < n) {
    // Skip whitespace
    if (/\s/.test(latex[i])) {
      i++;
      continue;
    }

    if (latex[i] === '\\') {
      // Escaped single symbol like \, \; \! \{ \} \|
      if (i + 1 < n && !/[a-zA-Z]/.test(latex[i + 1])) {
        i += 2;
        // Formatting spaces don't need their own reveal step
        if (latex[i - 1] === ',' || latex[i - 1] === ';' || latex[i - 1] === '!') {
          continue;
        }
        candidateEnds.push(i);
        continue;
      }

      // Control word \command
      let cmdEnd = i + 1;
      while (cmdEnd < n && /[a-zA-Z]/.test(latex[cmdEnd])) cmdEnd++;
      const cmd = latex.slice(i + 1, cmdEnd);

      if (cmd === 'begin') {
        // Consume whole \begin{env}...\end{env} atomically
        const envGroupEnd = consumeBalancedGroup(cmdEnd);
        const envName = latex.slice(cmdEnd + 1, Math.max(cmdEnd + 1, envGroupEnd - 1));
        const endTag = `\\end{${envName}}`;
        const endPos = latex.indexOf(endTag, envGroupEnd);
        i = endPos !== -1 ? endPos + endTag.length : n;
        candidateEnds.push(i);
        continue;
      }

      if (cmd === 'left' || cmd === 'right') {
        // Consume delimiter token right after \left or \right
        let delimEnd = cmdEnd;
        while (delimEnd < n && latex[delimEnd] === ' ') delimEnd++;
        if (delimEnd < n && latex[delimEnd] === '\\') {
          delimEnd++;
          while (delimEnd < n && /[a-zA-Z]/.test(latex[delimEnd])) delimEnd++;
          if (delimEnd === cmdEnd + 1 && delimEnd < n) delimEnd++;
        } else if (delimEnd < n) {
          delimEnd++;
        }
        i = delimEnd;
        if (cmd === 'right') {
          i = consumeScripts(i);
          candidateEnds.push(i);
        }
        continue;
      }

      if (cmd === 'frac' || cmd === 'dfrac' || cmd === 'tfrac' || cmd === 'binom' || cmd === 'overset' || cmd === 'underset') {
        let pos = cmdEnd;
        while (pos < n && latex[pos] === ' ') pos++;
        pos = consumeBalancedGroup(pos);
        while (pos < n && latex[pos] === ' ') pos++;
        pos = consumeBalancedGroup(pos);
        pos = consumeScripts(pos);
        i = pos;
        candidateEnds.push(i);
        continue;
      }

      if (cmd === 'sqrt') {
        let pos = cmdEnd;
        while (pos < n && latex[pos] === ' ') pos++;
        if (pos < n && latex[pos] === '[') {
          pos = consumeBalancedGroup(pos, '[', ']');
        }
        while (pos < n && latex[pos] === ' ') pos++;
        pos = consumeBalancedGroup(pos);
        pos = consumeScripts(pos);
        i = pos;
        candidateEnds.push(i);
        continue;
      }

      if (cmd === 'text' || cmd === 'textbf' || cmd === 'mathrm' || cmd === 'mathbf' || cmd === 'mathcal' || cmd === 'mathbb' || cmd === 'operatorname') {
        let pos = cmdEnd;
        while (pos < n && latex[pos] === ' ') pos++;
        pos = consumeBalancedGroup(pos);
        pos = consumeScripts(pos);
        i = pos;
        candidateEnds.push(i);
        continue;
      }

      // Standard commands (\sin, \cos, \theta, \pi, \int, \sum, \lim, \implies, etc.)
      let pos = consumeScripts(cmdEnd);
      i = pos;
      candidateEnds.push(i);
      continue;
    }

    if (latex[i] === '{') {
      let pos = consumeBalancedGroup(i);
      pos = consumeScripts(pos);
      i = pos;
      candidateEnds.push(i);
      continue;
    }

    // Alphanumeric token (multi-digit number or variable)
    if (/[a-zA-Z0-9.]/.test(latex[i])) {
      let pos = i + 1;
      if (/[0-9.]/.test(latex[i])) {
        while (pos < n && /[0-9.]/.test(latex[pos])) pos++;
      }
      pos = consumeScripts(pos);
      i = pos;
      candidateEnds.push(i);
      continue;
    }

    // Single operator / punctuation (=, +, -, *, /, (, ), [, ], |, ,, :)
    let pos = consumeScripts(i + 1);
    i = pos;
    candidateEnds.push(i);
  }

  // Deduplicate and ensure full length is last
  const uniqueEnds = Array.from(new Set([...candidateEnds, n])).sort((a, b) => a - b);

  // Validate each progressive prefix with KaTeX so raw LaTeX never appears
  const validPrefixes: string[] = [];
  for (const endIdx of uniqueEnds) {
    let slice = latex.slice(0, endIdx).trim();
    if (!slice) continue;

    // Balance any open \left with invisible \right.
    const leftCount = (slice.match(/\\left(?![a-zA-Z])/g) || []).length;
    const rightCount = (slice.match(/\\right(?![a-zA-Z])/g) || []).length;
    if (leftCount > rightCount) {
      slice += ' \\right.'.repeat(leftCount - rightCount);
    }

    try {
      katex.renderToString(slice, {
        displayMode,
        throwOnError: true,
        strict: false,
      });
      if (validPrefixes[validPrefixes.length - 1] !== slice) {
        validPrefixes.push(slice);
      }
    } catch {
      // Skip intermediate slice if KaTeX considers it incomplete; next slice will include it
    }
  }

  if (validPrefixes.length === 0) {
    return [latex];
  }

  // Ensure the final entry is always the exact original latex
  if (validPrefixes[validPrefixes.length - 1] !== latex) {
    validPrefixes.push(latex);
  }

  return validPrefixes;
}

/**
 * Parses a single board_text string into lines of prose words and progressive KaTeX segments.
 */
export function parseBoardText(boardText: string): ParsedBoardStep {
  // Collapse newlines inside $$...$$ display math blocks so multiline aligned/cases blocks stay intact
  const normalized = boardText
    .replace(/\r\n/g, '\n')
    .replace(/\$\$([\s\S]+?)\$\$/g, (_match, inner: string) => {
      return `\n$$${inner.replace(/\n+/g, ' ').trim()}$$\n`;
    });
  const rawLines = normalized.split('\n');
  const lines: ParsedBoardLine[] = [];
  let totalUnits = 0;

  // Regex matching $$...$$ or $...$
  const mathRegex = /(\$\$[\s\S]+?\$\$|\$(?:\\.|[^$\\])+\$)/g;

  for (const rawLine of rawLines) {
    const trimmedLine = rawLine.trim();
    if (!trimmedLine) continue;

    const segments: LineSegment[] = [];
    let lineUnits = 0;
    let lastIdx = 0;
    let match: RegExpExecArray | null;
    mathRegex.lastIndex = 0;

    while ((match = mathRegex.exec(trimmedLine)) !== null) {
      if (match.index > lastIdx) {
        const proseChunk = trimmedLine.slice(lastIdx, match.index);
        const words = proseChunk.split(/\s+/).filter(Boolean);
        if (words.length > 0) {
          segments.push({ kind: 'prose', words });
          lineUnits += words.length;
        }
      }

      const token = match[0];
      const isDisplay = token.startsWith('$$');
      const innerLatex = isDisplay ? token.slice(2, -2) : token.slice(1, -1);
      const prefixes = buildProgressiveMathPrefixes(innerLatex, isDisplay);
      if (prefixes.length > 0) {
        segments.push({
          kind: 'math',
          displayMode: isDisplay,
          fullLatex: innerLatex.trim(),
          prefixes,
        });
        lineUnits += prefixes.length;
      }

      lastIdx = match.index + token.length;
    }

    if (lastIdx < trimmedLine.length) {
      const proseChunk = trimmedLine.slice(lastIdx);
      const words = proseChunk.split(/\s+/).filter(Boolean);
      if (words.length > 0) {
        segments.push({ kind: 'prose', words });
        lineUnits += words.length;
      }
    }

    if (segments.length > 0) {
      lines.push({ segments, totalUnits: lineUnits });
      totalUnits += lineUnits;
    }
  }

  return { lines, totalUnits: Math.max(1, totalUnits) };
}

/**
 * Renders any text containing $...$ or $$...$$ with KaTeX safely for static cards/questions.
 */
export function splitTextAndMath(input: string): Array<{ type: 'text' | 'inline-math' | 'display-math'; value: string }> {
  const result: Array<{ type: 'text' | 'inline-math' | 'display-math'; value: string }> = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$(?:\\.|[^$\\])+\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: 'text', value: input.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('$$')) {
      result.push({ type: 'display-math', value: raw.slice(2, -2).trim() });
    } else {
      result.push({ type: 'inline-math', value: raw.slice(1, -1).trim() });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < input.length) {
    result.push({ type: 'text', value: input.slice(lastIndex) });
  }
  return result;
}
