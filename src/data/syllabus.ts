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
// 1ST YEAR — REVISED 2026-27 SYLLABUS (PASTE IA & IB CHAPTERS HERE)
// ============================================================================

const IA_CHAPTERS: PaperConfig['chapters'] = [
  // Paste 2026-27 Mathematics IA chapters here using the same structure as IIA/IIB.
];

const IB_CHAPTERS: PaperConfig['chapters'] = [
  // Paste 2026-27 Mathematics IB chapters here using the same structure as IIA/IIB.
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
    subtitle: 'Revised 2026–27 Syllabus',
    chapters: IA_CHAPTERS,
    syllabusNote:
      'Revised 2026–27 IA chapters have not been pasted yet. Add them in src/data/syllabus.ts, or type/upload any 1st Year IA question below.',
  },
  IB: {
    id: 'IB',
    year: '1st',
    title: 'Mathematics IB',
    subtitle: 'Revised 2026–27 Syllabus',
    chapters: IB_CHAPTERS,
    syllabusNote:
      'Revised 2026–27 IB chapters have not been pasted yet. Add them in src/data/syllabus.ts, or type/upload any 1st Year IB question below.',
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
