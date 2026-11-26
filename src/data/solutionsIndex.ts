import type { LectureSolution, PaperId } from '../types/lecture';

export async function getBuiltInSolution(
  paperId: PaperId,
  problemId: string
): Promise<LectureSolution | null> {
  switch (paperId) {
    case 'IA': {
      const { SOLUTIONS_IA } = await import('./solutionsIA');
      return SOLUTIONS_IA[problemId] ?? null;
    }
    case 'IB': {
      const { SOLUTIONS_IB } = await import('./solutionsIB');
      return SOLUTIONS_IB[problemId] ?? null;
    }
    case 'IIA': {
      const { SOLUTIONS_IIA } = await import('./solutionsIIA');
      return SOLUTIONS_IIA[problemId] ?? null;
    }
    case 'IIB': {
      const { SOLUTIONS_IIB } = await import('./solutionsIIB');
      return SOLUTIONS_IIB[problemId] ?? null;
    }
    default:
      return null;
  }
}
