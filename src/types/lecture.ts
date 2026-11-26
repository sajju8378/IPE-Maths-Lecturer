export type YearId = '1st' | '2nd';
export type PaperId = 'IA' | 'IB' | 'IIA' | 'IIB';
export type QuestionType = 'VSAQ' | 'SAQ' | 'LAQ';
export type LanguageMode = 'en' | 'te-en';
export type PlaybackSpeed = 0.75 | 1 | 1.25;

export interface Problem {
  id: string;
  chapterId: string;
  topic: string;
  type: QuestionType;
  marks: 2 | 4 | 7;
  title: string;
  questionLatex: string;
  isPractice: true;
  sourceLabel: 'Practice Problem';
}

export interface Chapter {
  id: string;
  paperId: PaperId;
  number: number;
  name: string;
  problems: Problem[];
}

export interface PaperConfig {
  id: PaperId;
  year: YearId;
  title: string;
  subtitle: string;
  chapters: Chapter[];
  syllabusNote?: string;
}

export interface SolutionStep {
  step_number: number;
  section_label: string; // e.g. "Given", "To Prove", "Formula", "Step 1", "Final Answer"
  board_text: string;
  speech: string;
  key_point?: string;
}

export interface LectureSolution {
  question_text: string;
  verified: boolean;
  verification_note: string;
  steps: SolutionStep[];
}

export interface SimplerExplanation {
  board_example: string;
  speech: string;
}

export interface DoubtResponse {
  board_note?: string;
  speech: string;
}
