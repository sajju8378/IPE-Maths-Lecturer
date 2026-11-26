import type { PaperConfig, PaperId, Problem, QuestionType } from '../types/lecture';

/**
 * EDITABLE SYLLABUS DATA FILE — TGBIE (Telangana Intermediate) Mathematics
 * -------------------------------------------------------------------------
 * All chapters and practice problems live in this single file so you can
 * edit, add, or update chapters and questions easily.
 *
 * NOTE ON 1ST YEAR (IA & IB — REVISED 2026-27 SYLLABUS):
 * Paste the official revised 2026-27 IA and IB chapter lists into the
 * `IA_CHAPTERS` and `IB_CHAPTERS` arrays below. Do not guess chapters.
 */

function makeProblem(
  chapterId: string,
  index: number,
  type: QuestionType,
  title: string,
  questionLatex: string
): Problem {
  const marksMap: Record<QuestionType, 2 | 4 | 7> = {
    VSAQ: 2,
    SAQ: 4,
    LAQ: 7,
  };
  return {
    id: `${chapterId}-p${index}`,
    chapterId,
    type,
    marks: marksMap[type],
    title,
    questionLatex,
    isPractice: true,
    sourceLabel: 'Practice Problem',
  };
}

// ============================================================================
// 1ST YEAR — MATHEMATICS IA (Revised 2026–27 Syllabus · 12 Chapters x 5 Practice Problems)
// ============================================================================

const IA_CHAPTERS: PaperConfig['chapters'] = [
  {
    id: 'ia-1',
    paperId: 'IA',
    number: 1,
    name: 'Sets and Relations',
    problems: [
      makeProblem('ia-1', 1, 'VSAQ', 'Subset and Power Set Count', 'If $A = \\{1, 2, 3, 4\\}$, find the number of non-empty subsets of $A$ and write the cardinality of its power set $P(A)$.'),
      makeProblem('ia-1', 2, 'VSAQ', 'Set Operations Identity', 'If $A = \\{1, 2, 3, 4, 5\\}$ and $B = \\{4, 5, 6, 7\\}$, find $(A - B) \\cup (B - A)$.'),
      makeProblem('ia-1', 3, 'SAQ', 'De Morgan Law Verification', 'For sets $U = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$, $A = \\{2, 4, 6, 8\\}$, and $B = \\{3, 4, 5, 6\\}$, verify that $(A \\cup B)\' = A\' \\cap B\'$.'),
      makeProblem('ia-1', 4, 'SAQ', 'Equivalence Relation Check', 'Let $R$ be a relation on $\\mathbb{Z}$ defined by $R = \\{(a, b) : a - b \\text{ is divisible by } 5\\}$. Prove that $R$ is an equivalence relation.'),
      makeProblem('ia-1', 5, 'LAQ', 'Survey Inclusion-Exclusion Problem', 'In a class of $60$ students, $35$ like Mathematics, $30$ like Physics, and $10$ like neither subject. Find how many students like both subjects, only Mathematics, and only Physics.'),
    ],
  },
  {
    id: 'ia-2',
    paperId: 'IA',
    number: 2,
    name: 'Functions',
    problems: [
      makeProblem('ia-2', 1, 'VSAQ', 'Domain of Real Function', 'Find the domain of the real-valued function $f(x) = \\frac{1}{\\sqrt{x^2 - 9}}$.'),
      makeProblem('ia-2', 2, 'VSAQ', 'Composite Function Evaluation', 'If $f(x) = 2x - 1$ and $g(x) = \\frac{x + 1}{2}$ for all $x \\in \\mathbb{R}$, find $(f \\circ g)(x)$ and $(g \\circ f)(x)$.'),
      makeProblem('ia-2', 3, 'SAQ', 'Inverse of a Bijective Function', 'If $f : \\mathbb{R} \\to \\mathbb{R}$ is defined by $f(x) = 3x + 5$, show that $f$ is a bijection and find $f^{-1}(x)$.'),
      makeProblem('ia-2', 4, 'LAQ', 'Properties of Bijections', 'Let $f : A \\to B$ and $g : B \\to C$ be bijections. Prove that $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.'),
      makeProblem('ia-2', 5, 'LAQ', 'Inverse of Rational Function', 'If $f : \\mathbb{R} - \\{2\\} \\to \\mathbb{R} - \\{3\\}$ is defined by $f(x) = \\frac{3x + 1}{x - 2}$, prove that $f$ is both one-one and onto, and find $f^{-1}(x)$.'),
    ],
  },
  {
    id: 'ia-3',
    paperId: 'IA',
    number: 3,
    name: 'Sequences and Series',
    problems: [
      makeProblem('ia-3', 1, 'VSAQ', 'Term of Geometric Progression', 'Find the $10^{\\text{th}}$ term of the geometric progression $5, 25, 125, \\dots$'),
      makeProblem('ia-3', 2, 'VSAQ', 'AM and GM Relation', 'Find two positive numbers whose arithmetic mean is $10$ and geometric mean is $8$.'),
      makeProblem('ia-3', 3, 'SAQ', 'Sum of Special Series', 'Find the sum to $n$ terms of the series $7 + 77 + 777 + \\dots$'),
      makeProblem('ia-3', 4, 'LAQ', 'Sum of A.P. Ratio Problem', 'If the sum of the first $n$ terms of two arithmetic progressions are in the ratio $(3n + 8) : (7n + 15)$, find the ratio of their $12^{\\text{th}}$ terms.'),
      makeProblem('ia-3', 5, 'LAQ', 'Sum of Cubes and Squares Series', 'Find the sum to $n$ terms of the series $1 \\cdot 2^2 + 2 \\cdot 3^2 + 3 \\cdot 4^2 + \\dots$'),
    ],
  },
  {
    id: 'ia-4',
    paperId: 'IA',
    number: 4,
    name: 'Mathematical Induction',
    problems: [
      makeProblem('ia-4', 1, 'VSAQ', 'Base Case & Statement Check', 'Verify the statement $P(n) : 1 + 3 + 5 + \\dots + (2n - 1) = n^2$ for $n = 1, 2, 3$.'),
      makeProblem('ia-4', 2, 'VSAQ', 'Divisibility Check for Base Case', 'Show that $3^{2n} - 1$ is divisible by $8$ for $n = 1$ and $n = 2$.'),
      makeProblem('ia-4', 3, 'SAQ', 'Sum of Squares Proof', 'Using mathematical induction, prove that $1^2 + 2^2 + 3^2 + \\dots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}$ for all $n \\in \\mathbb{N}$.'),
      makeProblem('ia-4', 4, 'LAQ', 'Harmonic Product Series Proof', 'By mathematical induction, prove that $\\frac{1}{1 \\cdot 3} + \\frac{1}{3 \\cdot 5} + \\frac{1}{5 \\cdot 7} + \\dots + \\frac{1}{(2n - 1)(2n + 1)} = \\frac{n}{2n + 1}$ for all $n \\in \\mathbb{N}$.'),
      makeProblem('ia-4', 5, 'LAQ', 'Divisibility Induction Proof', 'Prove by mathematical induction that $4^n + 15n - 1$ is divisible by $9$ for every positive integer $n$.'),
    ],
  },
  {
    id: 'ia-5',
    paperId: 'IA',
    number: 5,
    name: 'Matrices',
    problems: [
      makeProblem('ia-5', 1, 'VSAQ', 'Trace and Transpose of Matrix', 'If $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & -4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 5 \\\\ -1 & 2 \\end{pmatrix}$, find $2A + B^T$.'),
      makeProblem('ia-5', 2, 'VSAQ', 'Singular Matrix Condition', 'Find the value of $x$ if the matrix $\\begin{pmatrix} x - 1 & 2 \\\\ 3 & x - 2 \\end{pmatrix}$ is singular.'),
      makeProblem('ia-5', 3, 'SAQ', 'Inverse of 3x3 Matrix', 'Find the inverse of the matrix $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 3 & 2 & 3 \\\\ 1 & 1 & 2 \\end{pmatrix}$ using the adjoint method.'),
      makeProblem('ia-5', 4, 'LAQ', 'Determinant Factor Proof', 'Show that $\\begin{vmatrix} 1 & a & a^2 \\\\ 1 & b & b^2 \\\\ 1 & c & c^2 \\end{vmatrix} = (a - b)(b - c)(c - a)$.'),
      makeProblem('ia-5', 5, 'LAQ', 'System of Linear Equations (Cramer Rule)', 'Solve the system of equations $x + y + z = 6$, $x - y + z = 2$, $2x + y - z = 1$ using Cramer’s rule.'),
    ],
  },
  {
    id: 'ia-6',
    paperId: 'IA',
    number: 6,
    name: 'Addition of Vectors',
    problems: [
      makeProblem('ia-6', 1, 'VSAQ', 'Unit Vector Along Vector', 'Find the unit vector in the direction of the vector $\\vec{a} = 2\\hat{i} + 3\\hat{j} + \\hat{k}$.'),
      makeProblem('ia-6', 2, 'VSAQ', 'Collinear Vectors Condition', 'If the vectors $-3\\hat{i} + 4\\hat{j} + \\lambda\\hat{k}$ and $\\mu\\hat{i} + 8\\hat{j} + 6\\hat{k}$ are collinear, find $\\lambda$ and $\\mu$.'),
      makeProblem('ia-6', 3, 'SAQ', 'Coplanar Points Verification', 'Show that the four points with position vectors $4\\hat{i} + 5\\hat{j} + \\hat{k}$, $-\\hat{j} - \\hat{k}$, $3\\hat{i} + 9\\hat{j} + 4\\hat{k}$, and $-4\\hat{i} + 4\\hat{j} + 4\\hat{k}$ are coplanar.'),
      makeProblem('ia-6', 4, 'SAQ', 'Vector Equation of Line', 'Find the vector equation of the line passing through the point $2\\hat{i} + \\hat{j} + 3\\hat{k}$ and parallel to the vector $3\\hat{i} - 2\\hat{j} + \\hat{k}$.'),
      makeProblem('ia-6', 5, 'LAQ', 'Vector Equation of Plane Through 3 Points', 'Find the vector equation of the plane passing through the points $A(2\\hat{i} + 2\\hat{j} - \\hat{k})$, $B(3\\hat{i} + 4\\hat{j} + 2\\hat{k})$, and $C(7\\hat{i} + 6\\hat{k})$.'),
    ],
  },
  {
    id: 'ia-7',
    paperId: 'IA',
    number: 7,
    name: 'Product of Vectors',
    problems: [
      makeProblem('ia-7', 1, 'VSAQ', 'Angle Between Two Vectors', 'Find the angle between the vectors $\\vec{a} = \\hat{i} + 2\\hat{j} + 3\\hat{k}$ and $\\vec{b} = 3\\hat{i} - \\hat{j} + 2\\hat{k}$.'),
      makeProblem('ia-7', 2, 'VSAQ', 'Area of Parallelogram', 'Find the area of the parallelogram whose adjacent sides are $\\vec{a} = 2\\hat{i} - 3\\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} + 4\\hat{j} - 2\\hat{k}$.'),
      makeProblem('ia-7', 3, 'SAQ', 'Vector Perpendicular to Two Vectors', 'Find a unit vector perpendicular to both $\\vec{a} = 2\\hat{i} + \\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}$.'),
      makeProblem('ia-7', 4, 'LAQ', 'Volume of Tetrahedron', 'Find the volume of the tetrahedron having the vertices $(1, 2, 1)$, $(3, 2, 5)$, $(2, -1, 0)$, and $(-1, 0, 1)$.'),
      makeProblem('ia-7', 5, 'LAQ', 'Shortest Distance Between Skew Lines', 'Find the shortest distance between the skew lines $\\vec{r} = (6\\hat{i} + 2\\hat{j} + 2\\hat{k}) + t(\\hat{i} - 2\\hat{j} + 2\\hat{k})$ and $\\vec{r} = (-4\\hat{i} - \\hat{k}) + s(3\\hat{i} - 2\\hat{j} - 2\\hat{k})$.'),
    ],
  },
  {
    id: 'ia-8',
    paperId: 'IA',
    number: 8,
    name: 'Trigonometric Ratios up to Transformations',
    problems: [
      makeProblem('ia-8', 1, 'VSAQ', 'Period of Trigonometric Function', 'Find the period of the function $f(x) = \\cos\\left(\\frac{4x + 9}{5}\\right)$.'),
      makeProblem('ia-8', 2, 'VSAQ', 'Exact Value of sin 15°', 'Find the value of $\\sin 15^\\circ$ and $\\cos 75^\\circ$.'),
      makeProblem('ia-8', 3, 'SAQ', 'Compound Angle Identity', 'If $A + B = 45^\\circ$, prove that $(1 + \\tan A)(1 + \\tan B) = 2$.'),
      makeProblem('ia-8', 4, 'LAQ', 'Triangle Conditional Identity', 'If $A, B, C$ are angles in a triangle, prove that $\\sin 2A + \\sin 2B + \\sin 2C = 4\\sin A \\sin B \\sin C$.'),
      makeProblem('ia-8', 5, 'LAQ', 'Cosine Conditional Transformation Identity', 'If $A + B + C = \\pi$, prove that $\\cos^2 \\frac{A}{2} + \\cos^2 \\frac{B}{2} + \\cos^2 \\frac{C}{2} = 2 + 2\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$.'),
    ],
  },
  {
    id: 'ia-9',
    paperId: 'IA',
    number: 9,
    name: 'Trigonometric Equations',
    problems: [
      makeProblem('ia-9', 1, 'VSAQ', 'Principal Solution of cos x', 'Find the principal solutions of $\\cos x = -\\frac{1}{2}$.'),
      makeProblem('ia-9', 2, 'VSAQ', 'General Solution of tan 2x', 'Find the general solution of $\\tan 2x = \\sqrt{3}$.'),
      makeProblem('ia-9', 3, 'SAQ', 'Quadratic Trigonometric Equation', 'Solve $2\\cos^2\\theta - 3\\sin\\theta = 0$ for $\\theta$.'),
      makeProblem('ia-9', 4, 'SAQ', 'Linear Combination Equation', 'Solve $\\sqrt{3}\\cos\\theta + \\sin\\theta = \\sqrt{2}$.'),
      makeProblem('ia-9', 5, 'LAQ', 'Sum of Cosines Equation', 'Solve $\\cos\\theta + \\cos 2\\theta + \\cos 3\\theta = 0$.'),
    ],
  },
  {
    id: 'ia-10',
    paperId: 'IA',
    number: 10,
    name: 'Inverse Trigonometric Functions',
    problems: [
      makeProblem('ia-10', 1, 'VSAQ', 'Principal Value Evaluation', 'Find the principal value of $\\sin^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right) + \\cos^{-1}\\left(-\\frac{1}{2}\\right)$.'),
      makeProblem('ia-10', 2, 'VSAQ', 'Sum of Inverse Tangents', 'Evaluate $\\tan^{-1}\\left(\\frac{1}{2}\\right) + \\tan^{-1}\\left(\\frac{1}{3}\\right)$.'),
      makeProblem('ia-10', 3, 'SAQ', 'Inverse Sine Identity', 'Prove that $\\sin^{-1}\\left(\\frac{4}{5}\\right) + \\sin^{-1}\\left(\\frac{5}{13}\\right) + \\sin^{-1}\\left(\\frac{16}{65}\\right) = \\frac{\\pi}{2}$.'),
      makeProblem('ia-10', 4, 'SAQ', 'Inverse Cosine Sum Proof', 'Prove that $\\cos^{-1}\\left(\\frac{4}{5}\\right) + \\sin^{-1}\\left(\\frac{3}{\\sqrt{34}}\\right) = \\tan^{-1}\\left(\\frac{27}{11}\\right)$.'),
      makeProblem('ia-10', 5, 'LAQ', 'Equation Involving Inverse Tangents', 'Solve $\\tan^{-1}\\left(\\frac{x - 1}{x - 2}\\right) + \\tan^{-1}\\left(\\frac{x + 1}{x + 2}\\right) = \\frac{\\pi}{4}$.'),
    ],
  },
  {
    id: 'ia-11',
    paperId: 'IA',
    number: 11,
    name: 'Hyperbolic Functions',
    problems: [
      makeProblem('ia-11', 1, 'VSAQ', 'Hyperbolic Value from sinh', 'If $\\sinh x = \\frac{3}{4}$, find $\\cosh 2x$ and $\\sinh 2x$.'),
      makeProblem('ia-11', 2, 'VSAQ', 'Hyperbolic Exponential Identity', 'Prove that $(\\cosh x - \\sinh x)^n = \\cosh(nx) - \\sinh(nx)$ for any integer $n$.'),
      makeProblem('ia-11', 3, 'SAQ', 'Logarithmic Form of sinh Inverse', 'Prove that $\\sinh^{-1}(x) = \\log_e\\left(x + \\sqrt{x^2 + 1}\\right)$ for all $x \\in \\mathbb{R}$.'),
      makeProblem('ia-11', 4, 'SAQ', 'Hyperbolic Tangent Inverse Identity', 'Show that $\\tanh^{-1}\\left(\\frac{1}{2}\\right) = \\frac{1}{2}\\log_e 3$.'),
      makeProblem('ia-11', 5, 'LAQ', 'Hyperbolic Triple Angle Identity', 'Prove that $\\cosh 3x = 4\\cosh^3 x - 3\\cosh x$ and $\\sinh 3x = 3\\sinh x + 4\\sinh^3 x$.'),
    ],
  },
  {
    id: 'ia-12',
    paperId: 'IA',
    number: 12,
    name: 'Properties of Triangles',
    problems: [
      makeProblem('ia-12', 1, 'VSAQ', 'Sides from Angles Ratio', 'In $\\triangle ABC$, if $a = 4$, $b = 5$, and $c = 7$, find $\\cos B$.'),
      makeProblem('ia-12', 2, 'VSAQ', 'Circumradius Formula Check', 'In $\\triangle ABC$, if $\\sum a\\sin(B - C) = 0$, prove it using the sine rule.'),
      makeProblem('ia-12', 3, 'SAQ', 'Cotangent Rule in Triangle', 'In $\\triangle ABC$, prove that $\\cot\\frac{A}{2} + \\cot\\frac{B}{2} + \\cot\\frac{C}{2} = \\frac{s^2}{\\Delta}$.'),
      makeProblem('ia-12', 4, 'LAQ', 'Inradius and Exradii Identity', 'In $\\triangle ABC$, prove that $\\frac{1}{r_1} + \\frac{1}{r_2} + \\frac{1}{r_3} = \\frac{1}{r}$.'),
      makeProblem('ia-12', 5, 'LAQ', 'Area and Exradii Proof', 'In $\\triangle ABC$, prove that $r_1 + r_2 + r_3 - r = 4R$.'),
    ],
  },
];

// ============================================================================
// 1ST YEAR — MATHEMATICS IB (Revised 2026–27 Syllabus · 10 Chapters x 5 Practice Problems)
// ============================================================================

const IB_CHAPTERS: PaperConfig['chapters'] = [
  {
    id: 'ib-1',
    paperId: 'IB',
    number: 1,
    name: 'Locus',
    problems: [
      makeProblem('ib-1', 1, 'VSAQ', 'Equidistant Point Locus', 'Find the equation of the locus of a point $P$ which is equidistant from $A(2, 3)$ and $B(-1, 5)$.'),
      makeProblem('ib-1', 2, 'VSAQ', 'Fixed Distance from Origin', 'Find the locus of a point $P(x, y)$ whose distance from $(3, -4)$ is always $5$ units.'),
      makeProblem('ib-1', 3, 'SAQ', 'Right Triangle Hypotenuse Locus', 'The ends of the hypotenuse of a right-angled triangle are $(0, 6)$ and $(6, 0)$. Find the equation of the locus of its third vertex.'),
      makeProblem('ib-1', 4, 'SAQ', 'Sum of Distances Locus', 'Find the equation of the locus of a point $P$, the sum of whose distances from $(0, 2)$ and $(0, -2)$ is $6$ units.'),
      makeProblem('ib-1', 5, 'LAQ', 'Ratio of Distances Locus', 'Find the equation of the locus of $P$ if $A(4, 0)$ and $B(-4, 0)$ and $|PA - PB| = 4$.'),
    ],
  },
  {
    id: 'ib-2',
    paperId: 'IB',
    number: 2,
    name: 'Transformation of Axes',
    problems: [
      makeProblem('ib-2', 1, 'VSAQ', 'Translation of Origin', 'If the origin is shifted to $(2, 3)$ by translation of axes, find the transformed equation of $x^2 + y^2 - 4x - 6y + 9 = 0$.'),
      makeProblem('ib-2', 2, 'VSAQ', 'New Coordinates Under Shift', 'When the origin is shifted to $(-1, 2)$, find the new coordinates of the point $(4, -3)$.'),
      makeProblem('ib-2', 3, 'SAQ', 'Rotation of Axes by 45°', 'When the axes are rotated through an angle $45^\\circ$, find the transformed equation of $17x^2 - 16xy + 17y^2 = 225$.'),
      makeProblem('ib-2', 4, 'SAQ', 'Removing First-Degree Terms', 'Find the point to which the origin should be shifted so that the equation $x^2 + y^2 - 4x + 6y - 7 = 0$ has no first-degree terms.'),
      makeProblem('ib-2', 5, 'LAQ', 'Angle of Rotation to Remove xy Term', 'Show that the axes are to be rotated through an angle of $\\frac{1}{2}\\tan^{-1}\\left(\\frac{2h}{a - b}\\right)$ to remove the $xy$ term from $ax^2 + 2hxy + by^2 = 0$ when $a \\neq b$.'),
    ],
  },
  {
    id: 'ib-3',
    paperId: 'IB',
    number: 3,
    name: 'The Straight Line',
    problems: [
      makeProblem('ib-3', 1, 'VSAQ', 'Normal Form of a Line', 'Transform the equation $\\sqrt{3}x + y + 10 = 0$ into normal form.'),
      makeProblem('ib-3', 2, 'VSAQ', 'Distance Between Parallel Lines', 'Find the distance between the parallel lines $3x - 4y + 7 = 0$ and $3x - 4y + 5 = 0$.'),
      makeProblem('ib-3', 3, 'SAQ', 'Concurrency of Three Lines', 'Find the value of $p$ if the lines $3x + 4y = 5$, $2x + 3y = 4$, and $px + 4y = 6$ are concurrent.'),
      makeProblem('ib-3', 4, 'LAQ', 'Circumcentre of Triangle', 'Find the circumcentre of the triangle whose vertices are $(1, 3)$, $(-3, 5)$, and $(5, -1)$.'),
      makeProblem('ib-3', 5, 'LAQ', 'Image of Point in a Line', 'Find the image of the point $(1, 2)$ with respect to the straight line $3x + 4y - 1 = 0$.'),
    ],
  },
  {
    id: 'ib-4',
    paperId: 'IB',
    number: 4,
    name: 'Pair of Straight Lines',
    problems: [
      makeProblem('ib-4', 1, 'VSAQ', 'Angle Between Pair of Lines', 'Find the acute angle between the pair of lines $x^2 - 7xy + 12y^2 = 0$.'),
      makeProblem('ib-4', 2, 'VSAQ', 'Perpendicular Lines Condition', 'Find $k$ if the equation $2x^2 + kxy - 6y^2 + 3x + y + 1 = 0$ represents a pair of perpendicular lines.'),
      makeProblem('ib-4', 3, 'SAQ', 'Angle Bisectors Formula Proof', 'Show that the equation of the pair of angle bisectors of the lines $ax^2 + 2hxy + by^2 = 0$ is $h(x^2 - y^2) = (a - b)xy$.'),
      makeProblem('ib-4', 4, 'LAQ', 'Area of Triangle Formed by Pair', 'Show that the area of the triangle formed by the lines $ax^2 + 2hxy + by^2 = 0$ and $lx + my + n = 0$ is $\\frac{n^2\\sqrt{h^2 - ab}}{|am^2 - 2hlm + bl^2|}$.'),
      makeProblem('ib-4', 5, 'LAQ', 'Homogenizing Curve with Line', 'Find the angle between the lines joining the origin to the points of intersection of the curve $x^2 + 2xy + y^2 + 2x + 2y - 5 = 0$ and the line $3x - y + 1 = 0$.'),
    ],
  },
  {
    id: 'ib-5',
    paperId: 'IB',
    number: 5,
    name: 'Three Dimensional (3D) Coordinates',
    problems: [
      makeProblem('ib-5', 1, 'VSAQ', 'Distance Between 3D Points', 'Find the distance between the points $(3, -2, 1)$ and $(-1, 4, 3)$.'),
      makeProblem('ib-5', 2, 'VSAQ', 'Fourth Vertex of Parallelogram', 'Three vertices of a parallelogram are $(1, 2, 3)$, $(-1, -2, -1)$, and $(2, 3, 2)$. Find the fourth vertex.'),
      makeProblem('ib-5', 3, 'SAQ', 'Ratio in Which YZ-Plane Divides', 'Find the ratio in which the $YZ$-plane divides the line segment joining $A(-2, 4, 7)$ and $B(3, -5, 8)$.'),
      makeProblem('ib-5', 4, 'SAQ', 'Collinearity in 3D Space', 'Show that the points $A(1, 2, 3)$, $B(7, 0, 1)$, and $C(-2, 3, 4)$ are collinear.'),
      makeProblem('ib-5', 5, 'LAQ', 'Centroid and Circumcentre Check', 'Show that the points $(1, 2, 3)$, $(2, 3, 1)$, and $(3, 1, 2)$ form an equilateral triangle and find its centroid.'),
    ],
  },
  {
    id: 'ib-6',
    paperId: 'IB',
    number: 6,
    name: 'Direction Cosines and Direction Ratios',
    problems: [
      makeProblem('ib-6', 1, 'VSAQ', 'Direction Cosines of Line', 'A line makes angles $90^\\circ, 60^\\circ, 30^\\circ$ with the positive $X, Y, Z$ axes respectively. Find its direction cosines.'),
      makeProblem('ib-6', 2, 'VSAQ', 'Angle Between Lines Using DRs', 'Find the angle between two lines whose direction ratios are $(1, 1, 2)$ and $(\\sqrt{3} - 1, -\\sqrt{3} - 1, 4)$.'),
      makeProblem('ib-6', 3, 'SAQ', 'Direction Cosines from Relations', 'Find the direction cosines of two lines connected by the relations $l + m + n = 0$ and $2lm + 2nl - mn = 0$.'),
      makeProblem('ib-6', 4, 'LAQ', 'Angle Between Diagonals of Cube', 'Find the angle between any two diagonals of a cube.'),
      makeProblem('ib-6', 5, 'LAQ', 'Perpendicular Lines from Quadratic Relation', 'Show that the lines whose direction cosines are given by $l + m + n = 0$ and $2mn + 3nl - 5lm = 0$ are perpendicular to each other.'),
    ],
  },
  {
    id: 'ib-7',
    paperId: 'IB',
    number: 7,
    name: 'The Plane',
    problems: [
      makeProblem('ib-7', 1, 'VSAQ', 'Intercept Form of Plane', 'Write the equation of the plane $4x - 4y + 2z + 5 = 0$ in intercept form and find its intercepts.'),
      makeProblem('ib-7', 2, 'VSAQ', 'Angle Between Two Planes', 'Find the angle between the planes $x + 2y + 2z - 5 = 0$ and $3x + 3y + 2z - 8 = 0$.'),
      makeProblem('ib-7', 3, 'SAQ', 'Plane Through Point Parallel to Plane', 'Find the equation of the plane passing through $(1, 1, 1)$ and parallel to the plane $x + 2y + 3z - 7 = 0$.'),
      makeProblem('ib-7', 4, 'SAQ', 'Plane Through Three Points', 'Find the equation of the plane passing through $(1, 1, 0)$, $(1, 2, 1)$, and $(-2, 2, -1)$.'),
      makeProblem('ib-7', 5, 'LAQ', 'Foot of Perpendicular to Plane', 'Find the foot of the perpendicular drawn from $(1, 3, 4)$ to the plane $2x - y + z + 3 = 0$, and find its perpendicular distance.'),
    ],
  },
  {
    id: 'ib-8',
    paperId: 'IB',
    number: 8,
    name: 'Limits and Continuity',
    problems: [
      makeProblem('ib-8', 1, 'VSAQ', 'Trigonometric Standard Limit', 'Evaluate $\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx}$ ($b \\neq 0$).'),
      makeProblem('ib-8', 2, 'VSAQ', 'Exponential Standard Limit', 'Evaluate $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x}$.'),
      makeProblem('ib-8', 3, 'SAQ', 'Rationalizing Radical Limit', 'Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{1 + x} - 1}{x}$.'),
      makeProblem('ib-8', 4, 'SAQ', 'Continuity at a Point', 'Check the continuity of $f(x) = \\begin{cases} \\frac{\\cos ax - \\cos bx}{x^2}, & x \\neq 0 \\\\ \\frac{b^2 - a^2}{2}, & x = 0 \\end{cases}$ at $x = 0$.'),
      makeProblem('ib-8', 5, 'LAQ', 'Finding Constants for Continuity', 'Find real constants $a, b$ so that the function $f(x) = \\begin{cases} \\sin x, & x \\le 0 \\\\ x^2 + a, & 0 < x < 1 \\\\ bx + 3, & 1 \\le x \\le 3 \\\\ -3, & x > 3 \\end{cases}$ is continuous on $\\mathbb{R}$.'),
    ],
  },
  {
    id: 'ib-9',
    paperId: 'IB',
    number: 9,
    name: 'Differentiation',
    problems: [
      makeProblem('ib-9', 1, 'VSAQ', 'Chain Rule Derivative', 'Find $\\frac{dy}{dx}$ if $y = \\sin(\\log x)$ ($x > 0$).'),
      makeProblem('ib-9', 2, 'VSAQ', 'Inverse Trigonometric Derivative', 'Find $\\frac{dy}{dx}$ if $y = \\tan^{-1}\\left(\\frac{2x}{1 - x^2}\\right)$ for $|x| < 1$.'),
      makeProblem('ib-9', 3, 'SAQ', 'Derivative from First Principles', 'Find the derivative of $\\sin 2x$ from the first principle.'),
      makeProblem('ib-9', 4, 'LAQ', 'Logarithmic Differentiation', 'Find $\\frac{dy}{dx}$ for the function $y = x^{\\tan x} + (\\sin x)^{\\cos x}$.'),
      makeProblem('ib-9', 5, 'LAQ', 'Implicit Differentiation Proof', 'If $\\sqrt{1 - x^2} + \\sqrt{1 - y^2} = a(x - y)$, prove that $\\frac{dy}{dx} = \\sqrt{\\frac{1 - y^2}{1 - x^2}}$.'),
    ],
  },
  {
    id: 'ib-10',
    paperId: 'IB',
    number: 10,
    name: 'Applications of Derivatives',
    problems: [
      makeProblem('ib-10', 1, 'VSAQ', 'Approximate Value Using Differentials', 'Find $\\Delta y$ and $dy$ for the function $y = x^2 + 3x + 6$ when $x = 10$ and $\\Delta x = 0.01$.'),
      makeProblem('ib-10', 2, 'VSAQ', 'Slope of Tangent and Normal', 'Find the equations of the tangent and normal to the curve $y = x^4 - 6x^3 + 13x^2 - 10x + 5$ at $(0, 5)$.'),
      makeProblem('ib-10', 3, 'SAQ', 'Rate of Change Problem', 'The radius of a circle is increasing at the rate of $0.7\\text{ cm/s}$. What is the rate of increase of its circumference and area when $r = 10\\text{ cm}$?'),
      makeProblem('ib-10', 4, 'LAQ', 'Angle of Intersection of Curves', 'Find the angle of intersection of the curves $y^2 = 4x$ and $x^2 + y^2 = 5$.'),
      makeProblem('ib-10', 5, 'LAQ', 'Maxima and Minima Optimization', 'From a rectangular sheet of dimensions $30\\text{ cm} \\times 80\\text{ cm}$, four equal squares of side $x$ cm are removed at the corners and the sides are then turned up to form an open rectangular box. Find the value of $x$ so that the volume of the box is the greatest.'),
    ],
  },
];

// ============================================================================
// 2ND YEAR — MATHEMATICS IIA (10 Chapters · 5 Practice Problems Each)
// ============================================================================

const IIA_CHAPTERS: PaperConfig['chapters'] = [
  {
    id: 'iia-1',
    paperId: 'IIA',
    number: 1,
    name: 'Complex Numbers',
    problems: [
      makeProblem('iia-1', 1, 'VSAQ', 'Modulus-Amplitude Form', 'Express the complex number $z = 1 + i\\sqrt{3}$ in modulus-amplitude (polar) form.'),
      makeProblem('iia-1', 2, 'VSAQ', 'Multiplicative Inverse', 'Find the multiplicative inverse of $z = 4 - 3i$ in the form $a + ib$.'),
      makeProblem('iia-1', 3, 'SAQ', 'Collinearity on Argand Plane', 'Show that the points in the Argand plane represented by the complex numbers $-2 + 7i$, $-\\frac{3}{2} + \\frac{1}{2}i$, $4 - 3i$, and $\\frac{7}{2}(1 + i)$ are the vertices of a rhombus.'),
      makeProblem('iia-1', 4, 'SAQ', 'Locus of a Complex Number', 'If $z = x + iy$ and the point $P$ represents $z$ in the Argand plane, find the locus of $z$ satisfying $\\left|\\frac{z - i}{z - 1}\\right| = 2$.'),
      makeProblem('iia-1', 5, 'LAQ', 'Complex Roots & Locus Proof', 'If $\\arg\\left(\\frac{z - 1}{z + 1}\\right) = \\frac{\\pi}{4}$, show that the locus of $z = x + iy$ is a circle and find its centre and radius.'),
    ],
  },
  {
    id: 'iia-2',
    paperId: 'IIA',
    number: 2,
    name: "De Moivre's Theorem",
    problems: [
      makeProblem('iia-2', 1, 'VSAQ', 'Cube Roots of Unity Identity', 'If $1, \\omega, \\omega^2$ are the cube roots of unity, find the value of $(1 - \\omega + \\omega^2)^5 + (1 + \\omega - \\omega^2)^5$.'),
      makeProblem('iia-2', 2, 'VSAQ', 'Simplifying Polar Powers', 'Simplify $\\frac{(\\cos\\alpha + i\\sin\\alpha)^4}{(\\sin\\beta + i\\cos\\beta)^8}$.'),
      makeProblem('iia-2', 3, 'SAQ', 'Powers of Complex Sums', 'If $\\alpha, \\beta$ are the roots of $x^2 - 2x + 4 = 0$, then for any $n \\in \\mathbb{N}$, prove that $\\alpha^n + \\beta^n = 2^{n+1} \\cos\\left(\\frac{n\\pi}{3}\\right)$.'),
      makeProblem('iia-2', 4, 'LAQ', 'Cosines and Sines Expansion', 'If $n$ is a positive integer, prove that $(1 + i)^n + (1 - i)^n = 2^{\\frac{n+2}{2}} \\cos\\left(\\frac{n\\pi}{4}\\right)$.'),
      makeProblem('iia-2', 5, 'LAQ', 'Roots of a Complex Equation', 'Solve the equation $x^7 + x^4 + x^3 + 1 = 0$ using De Moivre’s theorem.'),
    ],
  },
  {
    id: 'iia-3',
    paperId: 'IIA',
    number: 3,
    name: 'Quadratic Expressions',
    problems: [
      makeProblem('iia-3', 1, 'VSAQ', 'Nature of Roots Condition', 'Find the value(s) of $m$ for which the equation $(m + 1)x^2 + 2(m + 3)x + (m + 8) = 0$ has equal roots.'),
      makeProblem('iia-3', 2, 'VSAQ', 'Maximum or Minimum Value', 'Find the maximum or minimum value of the quadratic expression $3x^2 + 2x + 11$ for $x \\in \\mathbb{R}$.'),
      makeProblem('iia-3', 3, 'SAQ', 'Sign of Quadratic Expression', 'Determine the range of $x \\in \\mathbb{R}$ for which the expression $x^2 - 5x + 6 > 0$ and also check where $6x^2 - 5x - 6 < 0$.'),
      makeProblem('iia-3', 4, 'SAQ', 'Range of Rational Expression', 'If $x$ is real, prove that $\\frac{x}{x^2 - 5x + 9}$ lies between $-\\frac{1}{11}$ and $1$.'),
      makeProblem('iia-3', 5, 'LAQ', 'Common Root Problem', 'If the equations $x^2 + ax + b = 0$ and $x^2 + cx + d = 0$ have a common root and the first equation has equal roots, prove that $2(b + d) = ac$.'),
    ],
  },
  {
    id: 'iia-4',
    paperId: 'IIA',
    number: 4,
    name: 'Theory of Equations',
    problems: [
      makeProblem('iia-4', 1, 'VSAQ', 'Sum of Squares of Roots', 'If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - 2x^2 + 3x - 4 = 0$, find $\\sum \\alpha^2\\beta^2$.'),
      makeProblem('iia-4', 2, 'VSAQ', 'Forming Cubic Equation', 'Form the monic polynomial equation of degree $3$ whose roots are $2, 3, 6$.'),
      makeProblem('iia-4', 3, 'SAQ', 'Roots in Arithmetic Progression', 'Solve $4x^3 - 24x^2 + 23x + 18 = 0$, given that the roots are in arithmetic progression (A.P.).'),
      makeProblem('iia-4', 4, 'LAQ', 'Reciprocal Equation of Even Degree', 'Solve the reciprocal equation $6x^5 - x^4 - 43x^3 + 43x^2 + x - 6 = 0$.'),
      makeProblem('iia-4', 5, 'LAQ', 'Removal of Second Term', 'Transform the equation $x^4 + 4x^3 + 2x^2 - 4x - 2 = 0$ into one in which the second term is absent, and hence solve it.'),
    ],
  },
  {
    id: 'iia-5',
    paperId: 'IIA',
    number: 5,
    name: 'Permutations and Combinations',
    problems: [
      makeProblem('iia-5', 1, 'VSAQ', 'Finding n from nPr', 'If ${}^nP_7 = 42 \\cdot {}^nP_5$, find the value of $n$.'),
      makeProblem('iia-5', 2, 'VSAQ', 'Finding r from nCr', 'If ${}^{12}C_{r+1} = {}^{12}C_{3r-5}$, find the value of $r$.'),
      makeProblem('iia-5', 3, 'SAQ', 'Dictionary Rank of a Word', 'Find the rank of the word $\\text{MASTER}$ when all permutations of its letters are arranged in dictionary order.'),
      makeProblem('iia-5', 4, 'SAQ', 'Committee Selection with Constraint', 'Find the number of ways of forming a committee of $5$ members out of $6$ Indians and $5$ Americans so that always the Indians will be in majority in the committee.'),
      makeProblem('iia-5', 5, 'LAQ', 'Sum of All 4-Digit Numbers', 'Find the sum of all $4$-digit numbers that can be formed using the digits $1, 3, 5, 7, 9$ without repetition.'),
    ],
  },
  {
    id: 'iia-6',
    paperId: 'IIA',
    number: 6,
    name: 'Binomial Theorem',
    problems: [
      makeProblem('iia-6', 1, 'VSAQ', 'Term Independent of x', 'Find the term independent of $x$ in the expansion of $\\left(\\sqrt{\\frac{x}{3}} + \\frac{3}{2x^2}\\right)^{10}$.'),
      makeProblem('iia-6', 2, 'VSAQ', 'Middle Term in Expansion', 'Find the middle term(s) in the expansion of $\\left(\\frac{3x}{7} - 2y\\right)^{10}$.'),
      makeProblem('iia-6', 3, 'SAQ', 'Equal Binomial Coefficients', 'If the coefficients of $x^9, x^{10}, x^{11}$ in the expansion of $(1 + x)^n$ are in A.P., find the value(s) of $n$.'),
      makeProblem('iia-6', 4, 'LAQ', 'Infinite Binomial Series Sum', 'Find the sum of the infinite series $1 + \\frac{1}{3} + \\frac{1 \\cdot 3}{3 \\cdot 6} + \\frac{1 \\cdot 3 \\cdot 5}{3 \\cdot 6 \\cdot 9} + \\dots$'),
      makeProblem('iia-6', 5, 'LAQ', 'Consecutive Terms Coefficient Ratio', 'If the coefficients of $4$ consecutive terms in the expansion of $(1 + x)^n$ are $a_1, a_2, a_3, a_4$ respectively, prove that $\\frac{a_1}{a_1 + a_2} + \\frac{a_3}{a_3 + a_4} = \\frac{2a_2}{a_2 + a_3}$.'),
    ],
  },
  {
    id: 'iia-7',
    paperId: 'IIA',
    number: 7,
    name: 'Partial Fractions',
    problems: [
      makeProblem('iia-7', 1, 'VSAQ', 'Distinct Linear Factors', 'Resolve $\\frac{2x + 3}{(x + 1)(x - 3)}$ into partial fractions.'),
      makeProblem('iia-7', 2, 'VSAQ', 'Repeated Linear Factor', 'Resolve $\\frac{3x + 7}{x^2 - 3x + 2}$ into partial fractions.'),
      makeProblem('iia-7', 3, 'SAQ', 'Square of Linear Factor', 'Resolve $\\frac{x^2 + 5x + 7}{(x - 3)^3}$ into partial fractions.'),
      makeProblem('iia-7', 4, 'SAQ', 'Irreducible Quadratic Factor', 'Resolve $\\frac{2x^2 + 3x + 4}{(x - 1)(x^2 + 2)}$ into partial fractions.'),
      makeProblem('iia-7', 5, 'LAQ', 'Improper Rational Expression', 'Resolve $\\frac{x^3}{(x - 1)(x + 2)}$ into partial fractions.'),
    ],
  },
  {
    id: 'iia-8',
    paperId: 'IIA',
    number: 8,
    name: 'Measures of Dispersion',
    problems: [
      makeProblem('iia-8', 1, 'VSAQ', 'Mean Deviation About Mean', 'Find the mean deviation about the mean for the data: $3, 6, 10, 4, 9, 10$.'),
      makeProblem('iia-8', 2, 'VSAQ', 'Mean Deviation About Median', 'Find the mean deviation about the median for the data: $4, 6, 9, 3, 10, 13, 2$.'),
      makeProblem('iia-8', 3, 'SAQ', 'Variance and Standard Deviation', 'Find the variance and standard deviation for the discrete frequency distribution: $x_i: 4, 8, 11, 17, 20, 24, 32$ with $f_i: 3, 5, 9, 5, 4, 3, 1$.'),
      makeProblem('iia-8', 4, 'LAQ', 'Grouped Data Mean Deviation', 'Calculate the mean deviation about the mean for the continuous distribution: Classes $0\text{--}10, 10\text{--}20, 20\text{--}30, 30\text{--}40, 40\text{--}50$ with frequencies $5, 8, 15, 16, 6$.'),
      makeProblem('iia-8', 5, 'LAQ', 'Grouped Data Variance & SD', 'Calculate the variance and standard deviation of the following continuous frequency distribution: Classes $30\text{--}40, 40\text{--}50, 50\text{--}60, 60\text{--}70, 70\text{--}80, 80\text{--}90, 90\text{--}100$ with frequencies $3, 7, 12, 15, 8, 3, 2$.'),
    ],
  },
  {
    id: 'iia-9',
    paperId: 'IIA',
    number: 9,
    name: 'Probability',
    problems: [
      makeProblem('iia-9', 1, 'VSAQ', 'Leap Year 53 Sundays', 'Find the probability that a non-leap year contains $53$ Sundays.'),
      makeProblem('iia-9', 2, 'VSAQ', 'Independent Events', 'If $A$ and $B$ are independent events with $P(A) = 0.2$ and $P(B) = 0.5$, find $P(A \\cup B)$.'),
      makeProblem('iia-9', 3, 'SAQ', 'Addition Theorem Application', 'A, B, C are three horses in a race. The probability of A to win the race is twice that of B, and probability of B is twice that of C. What are the probabilities of A, B, and C winning the race?'),
      makeProblem('iia-9', 4, 'LAQ', 'State and Prove Addition Theorem', 'State and prove the Addition Theorem on Probability: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.'),
      makeProblem('iia-9', 5, 'LAQ', 'Bayes Theorem Application', 'Three boxes $B_1, B_2, B_3$ contain balls with different colours: $B_1$ (2 white, 1 black, 2 red), $B_2$ (3 white, 2 black, 4 red), $B_3$ (4 white, 3 black, 2 red). A die is thrown; $B_1$ is chosen if $1$ or $2$ turns up, $B_2$ if $3$ or $4$, and $B_3$ if $5$ or $6$. Having chosen a box, a ball is chosen at random. If the ball is red, find the probability it came from $B_2$.'),
    ],
  },
  {
    id: 'iia-10',
    paperId: 'IIA',
    number: 10,
    name: 'Random Variables and Probability Distributions',
    problems: [
      makeProblem('iia-10', 1, 'VSAQ', 'Poisson Distribution Parameter', 'A Poisson variable satisfies $P(X = 1) = P(X = 2)$. Find $P(X = 5)$.'),
      makeProblem('iia-10', 2, 'VSAQ', 'Binomial Mean and Variance', 'The mean and variance of a binomial distribution are $4$ and $3$ respectively. Find $P(X \\ge 1)$.'),
      makeProblem('iia-10', 3, 'SAQ', 'Constant k in Distribution', 'A random variable $X$ has the probability distribution $P(X = x) = k(x + 1)$ for $x = 0, 1, 2, 3, 4$ and $0$ otherwise. Find $k$, the mean, and $P(1 < X < 4)$.'),
      makeProblem('iia-10', 4, 'LAQ', 'Mean and Variance of Discrete RV', 'The range of a random variable $X$ is $\\{0, 1, 2\\}$. Given $P(X = 0) = 3c^3$, $P(X = 1) = 4c - 10c^2$, and $P(X = 2) = 5c - 1$. Find the value of $c$, $P(X < 1)$, and $P(1 < X \\le 2)$.'),
      makeProblem('iia-10', 5, 'LAQ', 'Binomial Word Problem', 'In a city, $10$ accidents take place in a span of $50$ days. Assuming that the number of accidents follows a Poisson distribution, find the probability that there will be three or more accidents in a day.'),
    ],
  },
];

// ============================================================================
// 2ND YEAR — MATHEMATICS IIB (8 Chapters · 5 Practice Problems Each)
// ============================================================================

const IIB_CHAPTERS: PaperConfig['chapters'] = [
  {
    id: 'iib-1',
    paperId: 'IIB',
    number: 1,
    name: 'Circle',
    problems: [
      makeProblem('iib-1', 1, 'VSAQ', 'Centre and Radius of Circle', 'Find the centre and radius of the circle $x^2 + y^2 - 4x - 8y - 41 = 0$.'),
      makeProblem('iib-1', 2, 'VSAQ', 'Equation from Parametric Form', 'Obtain the parametric equations of the circle $x^2 + y^2 - 6x + 4y - 12 = 0$.'),
      makeProblem('iib-1', 3, 'SAQ', 'Length of Intercept on Line', 'Find the length of the chord intercepted by the circle $x^2 + y^2 - x + 3y - 22 = 0$ on the line $y = x - 3$.'),
      makeProblem('iib-1', 4, 'LAQ', 'Circle Passing Through 3 Points', 'Find the equation of the circle passing through the three points $(3, 4)$, $(3, 2)$, and $(1, 4)$.'),
      makeProblem('iib-1', 5, 'LAQ', 'Tangents from External Point', 'Find the pair of tangents drawn from $(1, 3)$ to the circle $x^2 + y^2 - 2x + 4y - 11 = 0$ and also find the angle between them.'),
    ],
  },
  {
    id: 'iib-2',
    paperId: 'IIB',
    number: 2,
    name: 'System of Circles',
    problems: [
      makeProblem('iib-2', 1, 'VSAQ', 'Angle Between Two Circles', 'Find the angle between the circles $x^2 + y^2 - 12x - 6y + 41 = 0$ and $x^2 + y^2 + 4x + 6y - 59 = 0$.'),
      makeProblem('iib-2', 2, 'VSAQ', 'Condition for Orthogonality', 'Find $k$ if the circles $x^2 + y^2 + 4x + 8 = 0$ and $x^2 + y^2 - 16y + k = 0$ cut each other orthogonally.'),
      makeProblem('iib-2', 3, 'SAQ', 'Equation of Common Chord', 'Find the equation of the common chord of the circles $x^2 + y^2 - 4x - 4y + 3 = 0$ and $x^2 + y^2 - 5x - 6y + 4 = 0$, and find its length.'),
      makeProblem('iib-2', 4, 'SAQ', 'Radical Centre of Three Circles', 'Find the radical centre of the circles $x^2 + y^2 - 4x - 6y + 5 = 0$, $x^2 + y^2 - 2x - 4y - 1 = 0$, and $x^2 + y^2 - 6x - 2y = 0$.'),
      makeProblem('iib-2', 5, 'LAQ', 'Circle Orthogonal to Given Circles', 'Find the equation of the circle which passes through $(1, 1)$ and cuts orthogonally each of the circles $x^2 + y^2 - 8x - 2y + 16 = 0$ and $x^2 + y^2 - 4x - 4y - 1 = 0$.'),
    ],
  },
  {
    id: 'iib-3',
    paperId: 'IIB',
    number: 3,
    name: 'Parabola',
    problems: [
      makeProblem('iib-3', 1, 'VSAQ', 'Point on Parabola at Distance', 'Find the coordinates of the point(s) on the parabola $y^2 = 8x$ whose focal distance is $10$.'),
      makeProblem('iib-3', 2, 'VSAQ', 'Equation from Focus and Directrix', 'Find the equation of the parabola whose focus is $S(1, -7)$ and vertex is $A(1, -2)$.'),
      makeProblem('iib-3', 3, 'SAQ', 'Condition for Line to be Tangent', 'Find the condition for the line $lx + my + n = 0$ to be a tangent to the parabola $y^2 = 4ax$, and find the point of contact.'),
      makeProblem('iib-3', 4, 'LAQ', 'Standard Parabola from Shifted Equation', 'Find the vertex, focus, equation of the directrix, and length of the latus rectum of the parabola $y^2 - x + 4y + 5 = 0$.'),
      makeProblem('iib-3', 5, 'LAQ', 'Normal Chord Theorem', 'Prove that the area of the triangle inscribed in the parabola $y^2 = 4ax$ is $\\frac{1}{8a}|(y_1 - y_2)(y_2 - y_3)(y_3 - y_1)|$, where $y_1, y_2, y_3$ are the ordinates of its vertices.'),
    ],
  },
  {
    id: 'iib-4',
    paperId: 'IIB',
    number: 4,
    name: 'Ellipse',
    problems: [
      makeProblem('iib-4', 1, 'VSAQ', 'Eccentricity from Latus Rectum', 'Find the eccentricity of the ellipse whose latus rectum is equal to half of its major axis.'),
      makeProblem('iib-4', 2, 'VSAQ', 'Equation of Ellipse Given Foci', 'Find the equation of the ellipse in standard form whose distance between foci is $2$ and the length of the latus rectum is $\\frac{15}{2}$.'),
      makeProblem('iib-4', 3, 'SAQ', 'Centre, Foci, and Directrices', 'Find the centre, eccentricity, foci, and equations of directrices of the ellipse $9x^2 + 16y^2 - 36x + 32y - 92 = 0$.'),
      makeProblem('iib-4', 4, 'SAQ', 'Director Circle of an Ellipse', 'Show that the locus of the point of intersection of perpendicular tangents to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ is $x^2 + y^2 = a^2 + b^2$.'),
      makeProblem('iib-4', 5, 'LAQ', 'Tangents at Parametric Points', 'Find the condition for the line $x\\cos\\alpha + y\\sin\\alpha = p$ to be a tangent to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.'),
    ],
  },
  {
    id: 'iib-5',
    paperId: 'IIB',
    number: 5,
    name: 'Hyperbola',
    problems: [
      makeProblem('iib-5', 1, 'VSAQ', 'Conjugate Hyperbola Eccentricity', 'If $e$ and $e_1$ are the eccentricities of a hyperbola and its conjugate hyperbola, prove that $\\frac{1}{e^2} + \\frac{1}{e_1^2} = 1$.'),
      makeProblem('iib-5', 2, 'VSAQ', 'Hyperbola Equation from Vertices', 'Find the equation of the hyperbola whose foci are $(\\pm 5, 0)$ and the transverse axis is of length $8$.'),
      makeProblem('iib-5', 3, 'SAQ', 'Properties of Shifted Hyperbola', 'Find the centre, foci, eccentricity, and equations of the directrices of the hyperbola $16y^2 - 9x^2 = 144$.'),
      makeProblem('iib-5', 4, 'SAQ', 'Tangents Parallel to Given Line', 'Find the equations of the tangents to the hyperbola $3x^2 - 4y^2 = 12$ which are parallel to the line $y = x - 7$.'),
      makeProblem('iib-5', 5, 'LAQ', 'Asymptotes & Angle Between Them', 'Show that the angle between the two asymptotes of the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ is $2\\tan^{-1}\\left(\\frac{b}{a}\\right)$ or $2\\sec^{-1}(e)$.'),
    ],
  },
  {
    id: 'iib-6',
    paperId: 'IIB',
    number: 6,
    name: 'Integration',
    problems: [
      makeProblem('iib-6', 1, 'VSAQ', 'Exponential Product Integral', 'Evaluate $\\int e^x (\\tan x + \\sec^2 x)\\,dx$.'),
      makeProblem('iib-6', 2, 'VSAQ', 'Substitution Integral', 'Evaluate $\\int \\frac{\\sin(\\tan^{-1} x)}{1 + x^2}\\,dx$.'),
      makeProblem('iib-6', 3, 'SAQ', 'Integration by Parts', 'Evaluate $\\int x^2 \\cos x\\,dx$.'),
      makeProblem('iib-6', 4, 'LAQ', 'Rational Trigonometric Integral', 'Evaluate $\\int \\frac{dx}{4 + 5\\cos x}$.'),
      makeProblem('iib-6', 5, 'LAQ', 'Reduction Formula for sin^n x', 'Obtain the reduction formula for $I_n = \\int \\sin^n x\\,dx$ for a positive integer $n \\ge 2$, and hence deduce the value of $\\int \\sin^4 x\\,dx$.'),
    ],
  },
  {
    id: 'iib-7',
    paperId: 'IIB',
    number: 7,
    name: 'Definite Integrals',
    problems: [
      makeProblem('iib-7', 1, 'VSAQ', 'Modulus Definite Integral', 'Evaluate $\\int_0^4 |2 - x|\\,dx$.'),
      makeProblem('iib-7', 2, 'VSAQ', 'Limit of a Sum', 'Evaluate $\\lim_{n \\to \\infty} \\frac{1 + 2^4 + 3^4 + \\dots + n^4}{n^5}$ using definite integration.'),
      makeProblem('iib-7', 3, 'SAQ', 'King Property Integral', 'Evaluate $\\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}}\\,dx$.'),
      makeProblem('iib-7', 4, 'LAQ', 'Logarithmic Definite Integral', 'Show that $\\int_0^{\\pi/2} \\log(\\sin x)\\,dx = -\\frac{\\pi}{2}\\log 2$.'),
      makeProblem('iib-7', 5, 'LAQ', 'Area Bounded by Parabolas', 'Find the area bounded between the parabolas $y^2 = 4ax$ and $x^2 = 4ay$ ($a > 0$).'),
    ],
  },
  {
    id: 'iib-8',
    paperId: 'IIB',
    number: 8,
    name: 'Differential Equations',
    problems: [
      makeProblem('iib-8', 1, 'VSAQ', 'Order and Degree', 'Find the order and degree of the differential equation $\\left[\\frac{d^2y}{dx^2} + \\left(\\frac{dy}{dx}\\right)^3\\right]^{6/5} = 6y$.'),
      makeProblem('iib-8', 2, 'VSAQ', 'Variables Separable Form', 'Solve the differential equation $\\frac{dy}{dx} = e^{x-y} + x^2 e^{-y}$.'),
      makeProblem('iib-8', 3, 'SAQ', 'Homogeneous Differential Equation', 'Solve the differential equation $(x^2 - y^2)\\frac{dy}{dx} = xy$.'),
      makeProblem('iib-8', 4, 'LAQ', 'Linear Differential Equation', 'Solve the linear differential equation $\\frac{dy}{dx} + y\\tan x = \\cos^3 x$.'),
      makeProblem('iib-8', 5, 'LAQ', 'Non-Homogeneous Reducible DE', 'Solve the differential equation $\\frac{dy}{dx} = \\frac{x - y + 3}{2x - 2y + 5}$.'),
    ],
  },
];

export const SYLLABUS_PAPERS: Record<PaperId, PaperConfig> = {
  IA: {
    id: 'IA',
    year: '1st',
    title: 'Mathematics IA',
    subtitle: 'Revised 2026–27 · Algebra, Vectors & Trigonometry',
    chapters: IA_CHAPTERS,
  },
  IB: {
    id: 'IB',
    year: '1st',
    title: 'Mathematics IB',
    subtitle: 'Revised 2026–27 · Coordinate Geometry & Calculus',
    chapters: IB_CHAPTERS,
  },
  IIA: {
    id: 'IIA',
    year: '2nd',
    title: 'Mathematics IIA',
    subtitle: 'Algebra, Probability & Statistics',
    chapters: IIA_CHAPTERS,
  },
  IIB: {
    id: 'IIB',
    year: '2nd',
    title: 'Mathematics IIB',
    subtitle: 'Coordinate Geometry & Calculus',
    chapters: IIB_CHAPTERS,
  },
};

export const QUESTION_TYPE_META: Record<
  QuestionType,
  { label: string; shortLabel: string; marksLabel: string }
> = {
  VSAQ: {
    label: 'Very Short Answer',
    shortLabel: 'Very Short (2M)',
    marksLabel: '2 Marks',
  },
  SAQ: {
    label: 'Short Answer',
    shortLabel: 'Short (4M)',
    marksLabel: '4 Marks',
  },
  LAQ: {
    label: 'Long Answer',
    shortLabel: 'Long (7M)',
    marksLabel: '7 Marks',
  },
};
