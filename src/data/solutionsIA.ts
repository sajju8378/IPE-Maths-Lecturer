import type { LectureSolution, SolutionStep } from '../types/lecture';

function s(
  step_number: number,
  section_label: string,
  board_text: string,
  speech: string,
  key_point?: string
): SolutionStep {
  return { step_number, section_label, board_text, speech, key_point };
}

function sol(question_text: string, steps: SolutionStep[]): LectureSolution {
  return {
    question_text,
    verified: true,
    verification_note: 'Verified built-in TGBIE Intermediate solution.',
    steps,
  };
}

export const SOLUTIONS_IA: Record<string, LectureSolution> = {
  'ia-1-p1': sol(
    'If $A = \\{1, 2, 3, 4\\}$, find the number of non-empty subsets of $A$ and write the cardinality of its power set $P(A)$.',
    [
      s(1, 'Given', 'Given set $A = \\{1, 2, 3, 4\\}$.\nNumber of elements $n(A) = 4$.', 'First write down the given set A and count its elements. Here n of A equals 4.'),
      s(2, 'Formula', 'Total subsets $= n(P(A)) = 2^n$.\nNumber of non-empty subsets $= 2^n - 1$.', 'We use the standard subset formula 2 power n, and subtract 1 to exclude the empty set.', 'Exclude the null set phi when counting non-empty subsets.'),
      s(3, 'Final Answer', 'Cardinality of power set $n(P(A)) = 2^4 = 16$.\nNumber of non-empty subsets $= 16 - 1 = 15$.', 'Substituting n equals 4 gives 16 total subsets in the power set, and 15 non-empty subsets.'),
    ]
  ),
  'ia-1-p2': sol(
    'If $A = \\{1, 2, 3, 4, 5\\}$ and $B = \\{4, 5, 6, 7\\}$, find $(A - B) \\cup (B - A)$.',
    [
      s(1, 'Given', 'Given $A = \\{1, 2, 3, 4, 5\\}$ and $B = \\{4, 5, 6, 7\\}$.', 'Note the two given sets A and B.'),
      s(2, 'Step 1', 'Elements in $A$ only:\n$$A - B = \\{1, 2, 3\\}$$\nElements in $B$ only:\n$$B - A = \\{6, 7\\}$$', 'Remove elements of B from A to get A minus B, and remove elements of A from B to get B minus A.'),
      s(3, 'Final Answer', '$$(A - B) \\cup (B - A) = \\{1, 2, 3, 6, 7\\}$$', 'Take the union of both sets. The symmetric difference is 1, 2, 3, 6, 7.'),
    ]
  ),
  'ia-1-p3': sol(
    'For sets $U = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$, $A = \\{2, 4, 6, 8\\}$, and $B = \\{3, 4, 5, 6\\}$, verify that $(A \\cup B)\' = A\' \\cap B\'$.',
    [
      s(1, 'Given', '$U = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$, $A = \\{2, 4, 6, 8\\}$, $B = \\{3, 4, 5, 6\\}$.', 'Write the universal set U and subsets A and B.'),
      s(2, 'Step 1 (LHS)', '$$A \\cup B = \\{2, 3, 4, 5, 6, 8\\}$$\n$$(A \\cup B)\' = U - (A \\cup B) = \\{1, 7\\}$$', 'Find A union B first, then take its complement in U to get 1 and 7.'),
      s(3, 'Step 2 (RHS)', '$$A\' = U - A = \\{1, 3, 5, 7\\}$$\n$$B\' = U - B = \\{1, 2, 7, 8\\}$$\n$$A\' \\cap B\' = \\{1, 7\\}$$', 'Now compute A complement and B complement separately and take their intersection.'),
      s(4, 'Final Answer', 'Since LHS $= \\{1, 7\\} =$ RHS, De Morgan\'s law $(A \\cup B)\' = A\' \\cap B\'$ is verified.', 'Both sides give the set 1, 7, so De Morgan law is verified.'),
    ]
  ),
  'ia-1-p4': sol(
    'Let $R$ be a relation on $\\mathbb{Z}$ defined by $R = \\{(a, b) : a - b \\text{ is divisible by } 5\\}$. Prove that $R$ is an equivalence relation.',
    [
      s(1, 'To Prove', 'Show that $R$ is reflexive, symmetric, and transitive on $\\mathbb{Z}$.', 'To prove an equivalence relation, we must verify reflexivity, symmetry, and transitivity.'),
      s(2, 'Step 1 (Reflexive)', 'For every $a \\in \\mathbb{Z}$, $a - a = 0 = 5(0)$, which is divisible by $5$.\nHence $(a, a) \\in R$. So $R$ is reflexive.', 'For any integer a, a minus a is zero, which is divisible by 5. So R is reflexive.'),
      s(3, 'Step 2 (Symmetric)', 'Let $(a, b) \\in R \\implies a - b = 5k$ for some $k \\in \\mathbb{Z}$.\nThen $b - a = -5k = 5(-k)$, divisible by $5$.\nHence $(b, a) \\in R$. So $R$ is symmetric.', 'If a minus b is 5k, then b minus a is minus 5k, also divisible by 5. So R is symmetric.'),
      s(4, 'Step 3 (Transitive) & Final Answer', 'Let $(a, b) \\in R$ and $(b, c) \\in R \\implies a - b = 5k$ and $b - c = 5m$.\nAdding: $a - c = 5(k + m)$, divisible by $5 \\implies (a, c) \\in R$.\nSince $R$ is reflexive, symmetric, and transitive, $R$ is an equivalence relation.', 'Adding the two equations shows a minus c is a multiple of 5, proving transitivity and completing the proof.'),
    ]
  ),
  'ia-1-p5': sol(
    'In a class of $60$ students, $35$ like Mathematics, $30$ like Physics, and $10$ like neither subject. Find how many students like both subjects, only Mathematics, and only Physics.',
    [
      s(1, 'Given', 'Total students $n(U) = 60$, $n(M) = 35$, $n(P) = 30$, $n((M \\cup P)\') = 10$.', 'Let M be students liking Mathematics and P be students liking Physics.'),
      s(2, 'Step 1', '$$n(M \\cup P) = n(U) - n((M \\cup P)\') = 60 - 10 = 50$$', 'Subtract the 10 students who like neither from 60 to get the union count 50.'),
      s(3, 'Step 2', 'Using $n(M \\cup P) = n(M) + n(P) - n(M \\cap P)$:\n$$50 = 35 + 30 - n(M \\cap P) \\implies n(M \\cap P) = 65 - 50 = 15$$', 'Apply the inclusion-exclusion formula to find 15 students like both subjects.', 'Always check that n(M intersection P) <= min(n(M), n(P)).'),
      s(4, 'Final Answer', 'Both subjects $= 15$.\nOnly Mathematics $= n(M) - n(M \\cap P) = 35 - 15 = 20$.\nOnly Physics $= n(P) - n(M \\cap P) = 30 - 15 = 15$.', 'Subtract 15 from each individual count to get 20 for only Maths and 15 for only Physics.'),
    ]
  ),
  'ia-2-p1': sol(
    'Find the domain of the real-valued function $f(x) = \\frac{1}{\\sqrt{x^2 - 9}}$.',
    [
      s(1, 'Given', 'Given function $f(x) = \\frac{1}{\\sqrt{x^2 - 9}}$.', 'For f of x to be a real number, the expression inside the square root in the denominator must be strictly positive.'),
      s(2, 'Step 1', '$$x^2 - 9 > 0 \\implies (x - 3)(x + 3) > 0$$', 'Set x square minus 9 strictly greater than zero and factorize.', 'Do not use >= 0 because division by zero is undefined.'),
      s(3, 'Final Answer', '$$x < -3 \\text{ or } x > 3$$\nDomain of $f = (-\\infty, -3) \\cup (3, \\infty)$.', 'Thus x lies outside the closed interval minus 3 to 3. The domain is open minus infinity to minus 3 union 3 to infinity.'),
    ]
  ),
  'ia-2-p2': sol(
    'If $f(x) = 2x - 1$ and $g(x) = \\frac{x + 1}{2}$ for all $x \\in \\mathbb{R}$, find $(f \\circ g)(x)$ and $(g \\circ f)(x)$.',
    [
      s(1, 'Given', '$f(x) = 2x - 1$ and $g(x) = \\frac{x + 1}{2}$.', 'Note the definitions of f and g on R.'),
      s(2, 'Step 1', '$$(f \\circ g)(x) = f(g(x)) = 2\\left(\\frac{x + 1}{2}\\right) - 1 = (x + 1) - 1 = x$$', 'Substitute g of x into f to get x.'),
      s(3, 'Final Answer', '$$(g \\circ f)(x) = g(f(x)) = \\frac{(2x - 1) + 1}{2} = \\frac{2x}{2} = x$$\nHence $(f \\circ g)(x) = (g \\circ f)(x) = x$.', 'Substitute f of x into g to also get x, showing f and g are inverses.'),
    ]
  ),
  'ia-2-p3': sol(
    'If $f : \\mathbb{R} \\to \\mathbb{R}$ is defined by $f(x) = 3x + 5$, show that $f$ is a bijection and find $f^{-1}(x)$.',
    [
      s(1, 'Step 1 (One-one)', 'Let $x_1, x_2 \\in \\mathbb{R}$ with $f(x_1) = f(x_2)$.\n$$3x_1 + 5 = 3x_2 + 5 \\implies 3x_1 = 3x_2 \\implies x_1 = x_2$$\nSo $f$ is one-one (injective).', 'Assume f of x1 equals f of x2 and show x1 equals x2 to prove injectivity.'),
      s(2, 'Step 2 (Onto)', 'For any $y \\in \\mathbb{R}$, set $3x + 5 = y \\implies x = \\frac{y - 5}{3} \\in \\mathbb{R}$.\nThen $f\\left(\\frac{y - 5}{3}\\right) = 3\\left(\\frac{y - 5}{3}\\right) + 5 = y$.\nSo $f$ is onto (surjective).', 'Solve y equals 3x plus 5 for x and verify f of that x gives back y.'),
      s(3, 'Final Answer', 'Since $f$ is both one-one and onto, $f$ is a bijection.\n$$f^{-1}(x) = \\frac{x - 5}{3}$$', 'Therefore f is a bijection and its inverse is x minus 5 divided by 3.'),
    ]
  ),
  'ia-2-p4': sol(
    'Let $f : A \\to B$ and $g : B \\to C$ be bijections. Prove that $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.',
    [
      s(1, 'Given', '$f : A \\to B$ and $g : B \\to C$ are bijections, so $f^{-1} : B \\to A$ and $g^{-1} : C \\to B$ exist and $g \\circ f : A \\to C$ is a bijection.', 'First observe that since f and g are bijections, their composition g circle f is also a bijection and is invertible.'),
      s(2, 'Step 1', 'Consider $(f^{-1} \\circ g^{-1}) \\circ (g \\circ f)$ for any $a \\in A$:\n$$((f^{-1} \\circ g^{-1}) \\circ (g \\circ f))(a) = f^{-1}(g^{-1}(g(f(a)))) = f^{-1}(f(a)) = a = I_A(a)$$', 'Compose f inverse circle g inverse on the left with g circle f to get the identity map on A.'),
      s(3, 'Final Answer', 'Similarly, for any $c \\in C$:\n$$((g \\circ f) \\circ (f^{-1} \\circ g^{-1}))(c) = g(f(f^{-1}(g^{-1}(c)))) = g(g^{-1}(c)) = c = I_C(c)$$\nHence $(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}$.', 'Checking the reverse composition gives the identity on C, completing the proof.'),
    ]
  ),
  'ia-2-p5': sol(
    'If $f : \\mathbb{R} - \\{2\\} \\to \\mathbb{R} - \\{3\\}$ is defined by $f(x) = \\frac{3x + 1}{x - 2}$, prove that $f$ is both one-one and onto, and find $f^{-1}(x)$.',
    [
      s(1, 'Step 1 (One-one)', 'Let $f(x_1) = f(x_2) \\implies \\frac{3x_1 + 1}{x_1 - 2} = \\frac{3x_2 + 1}{x_2 - 2}$.\nCross-multiplying: $(3x_1 + 1)(x_2 - 2) = (3x_2 + 1)(x_1 - 2)$\n$$3x_1 x_2 - 6x_1 + x_2 - 2 = 3x_1 x_2 - 6x_2 + x_1 - 2 \\implies 7x_1 = 7x_2 \\implies x_1 = x_2$$', 'Cross-multiply f of x1 equals f of x2; the 3x1 x2 and minus 2 terms cancel, giving x1 equals x2.'),
      s(2, 'Step 2 (Onto)', 'For any $y \\in \\mathbb{R} - \\{3\\}$, solve $y = \\frac{3x + 1}{x - 2}$:\n$$xy - 2y = 3x + 1 \\implies x(y - 3) = 2y + 1 \\implies x = \\frac{2y + 1}{y - 3}$$\nCheck $x \\neq 2$: if $\\frac{2y + 1}{y - 3} = 2 \\implies 2y + 1 = 2y - 6$ (impossible). So $x \\in \\mathbb{R} - \\{2\\}$ and $f(x) = y$.', 'Solve for x in terms of y and verify x is never 2 since y cannot equal 3.'),
      s(3, 'Final Answer', '$f$ is both one-one and onto (a bijection).\n$$f^{-1}(x) = \\frac{2x + 1}{x - 3}, \\quad x \\in \\mathbb{R} - \\{3\\}$$', 'Thus f is bijective and f inverse of x equals 2x plus 1 over x minus 3.'),
    ]
  ),
  'ia-3-p1': sol(
    'Find the $10^{\\text{th}}$ term of the geometric progression $5, 25, 125, \\dots$',
    [
      s(1, 'Given', 'First term $a = 5$, common ratio $r = \\frac{25}{5} = 5$, and $n = 10$.', 'Identify the first term a equals 5 and common ratio r equals 5.'),
      s(2, 'Formula & Final Answer', '$$t_n = a r^{n-1}$$\n$$t_{10} = 5 \\cdot 5^{10-1} = 5 \\cdot 5^9 = 5^{10}$$', 'Use the nth term formula a times r power n minus 1 to get 5 power 10.'),
    ]
  ),
  'ia-3-p2': sol(
    'Find two positive numbers whose arithmetic mean is $10$ and geometric mean is $8$.',
    [
      s(1, 'Given', 'Let the two positive numbers be $a, b$.\n$\\text{A.M.} = \\frac{a + b}{2} = 10 \\implies a + b = 20$.\n$\\text{G.M.} = \\sqrt{ab} = 8 \\implies ab = 64$.', 'From the given A.M. and G.M., we get the sum a plus b equals 20 and product ab equals 64.'),
      s(2, 'Step 1', 'Form the quadratic equation $t^2 - (a + b)t + ab = 0$:\n$$t^2 - 20t + 64 = 0 \\implies (t - 16)(t - 4) = 0$$', 'Construct the quadratic equation with roots a and b and factorize it.'),
      s(3, 'Final Answer', 'The two numbers are $16$ and $4$.', 'Solving gives 16 and 4.'),
    ]
  ),
  'ia-3-p3': sol(
    'Find the sum to $n$ terms of the series $7 + 77 + 777 + \\dots$',
    [
      s(1, 'Step 1', 'Let $S_n = 7 + 77 + 777 + \\dots$ ($n$ terms).\nTake $7$ common and multiply and divide by $9$:\n$$S_n = \\frac{7}{9}(9 + 99 + 999 + \\dots \\text{ to } n \\text{ terms})$$', 'Factor out 7 and rewrite each term using 9, 99, 999 so we can convert to powers of 10.'),
      s(2, 'Step 2', '$$S_n = \\frac{7}{9}\\left[(10 - 1) + (10^2 - 1) + (10^3 - 1) + \\dots + (10^n - 1)\\right]$$\n$$S_n = \\frac{7}{9}\\left[(10 + 10^2 + \\dots + 10^n) - n\\right]$$', 'Split into a geometric progression of powers of 10 and n copies of 1.'),
      s(3, 'Final Answer', 'Using $G.P.$ sum $a\\frac{r^n - 1}{r - 1}$ with $a = 10, r = 10$:\n$$S_n = \\frac{7}{9}\\left[\\frac{10(10^n - 1)}{9} - n\\right] = \\frac{70(10^n - 1)}{81} - \\frac{7n}{9}$$', 'Sum the geometric progression to get the closed form.'),
    ]
  ),
  'ia-3-p4': sol(
    'If the sum of the first $n$ terms of two arithmetic progressions are in the ratio $(3n + 8) : (7n + 15)$, find the ratio of their $12^{\\text{th}}$ terms.',
    [
      s(1, 'Given', '$$\\frac{S_n}{S\'_n} = \\frac{\\frac{n}{2}[2a + (n - 1)d]}{\\frac{n}{2}[2a\' + (n - 1)d\']} = \\frac{2a + (n - 1)d}{2a\' + (n - 1)d\'} = \\frac{3n + 8}{7n + 15}$$', 'Write the ratio of the sum of n terms of the two A.P.s and cancel n by 2.'),
      s(2, 'Step 1', 'Ratio of $12^{\\text{th}}$ terms is $\\frac{a + 11d}{a\' + 11d\'} = \\frac{2a + 22d}{2a\' + 22d\'}$.\nComparing $n - 1 = 22 \\implies n = 23$.', 'To match a plus 11d, multiply numerator and denominator by 2 so n minus 1 equals 22, meaning n equals 23.', 'Always use n = 2k - 1 when finding the ratio of kth terms from Sn ratio.'),
      s(3, 'Final Answer', 'Substitute $n = 23$:\n$$\\frac{t_{12}}{t\'_{12}} = \\frac{3(23) + 8}{7(23) + 15} = \\frac{69 + 8}{161 + 15} = \\frac{77}{176} = \\frac{7}{16}$$\nThe ratio is $7 : 16$.', 'Substituting n equals 23 gives 77 over 176, which simplifies by dividing by 11 to 7 is to 16.'),
    ]
  ),
  'ia-3-p5': sol(
    'Find the sum to $n$ terms of the series $1 \\cdot 2^2 + 2 \\cdot 3^2 + 3 \\cdot 4^2 + \\dots$',
    [
      s(1, 'Step 1', 'The $k^{\\text{th}}$ term is:\n$$T_k = k(k + 1)^2 = k(k^2 + 2k + 1) = k^3 + 2k^2 + k$$', 'Find the kth term of the series and expand it into powers of k.'),
      s(2, 'Step 2', '$$S_n = \\sum_{k=1}^n T_k = \\sum_{k=1}^n k^3 + 2\\sum_{k=1}^n k^2 + \\sum_{k=1}^n k$$\n$$= \\frac{n^2(n+1)^2}{4} + 2 \\cdot \\frac{n(n+1)(2n+1)}{6} + \\frac{n(n+1)}{2}$$', 'Apply the standard summation formulas for cubes, squares, and natural numbers.'),
      s(3, 'Final Answer', 'Factoring $\\frac{n(n+1)}{12}$:\n$$S_n = \\frac{n(n+1)}{12}\\left[3n(n+1) + 4(2n+1) + 6\\right] = \\frac{n(n+1)}{12}(3n^2 + 11n + 10)$$\n$$S_n = \\frac{n(n+1)(n+2)(3n+5)}{12}$$', 'Factor out n times n plus 1 over 12 and factorize the quadratic to get the simplified product.'),
    ]
  ),
  'ia-4-p1': sol(
    'Verify the statement $P(n) : 1 + 3 + 5 + \\dots + (2n - 1) = n^2$ for $n = 1, 2, 3$.',
    [
      s(1, 'Step 1', 'For $n = 1$: LHS $= 1$, RHS $= 1^2 = 1 \\implies$ True.\nFor $n = 2$: LHS $= 1 + 3 = 4$, RHS $= 2^2 = 4 \\implies$ True.', 'Check the left and right sides for n equals 1 and n equals 2.'),
      s(2, 'Final Answer', 'For $n = 3$: LHS $= 1 + 3 + 5 = 9$, RHS $= 3^2 = 9 \\implies$ True.\nHence $P(n)$ is verified for $n = 1, 2, 3$.', 'For n equals 3, both sides equal 9. Thus P of n holds for 1, 2, and 3.'),
    ]
  ),
  'ia-4-p2': sol(
    'Show that $3^{2n} - 1$ is divisible by $8$ for $n = 1$ and $n = 2$.',
    [
      s(1, 'Step 1', 'For $n = 1$: $3^{2(1)} - 1 = 9 - 1 = 8 = 8(1)$, divisible by $8$.', 'Substitute n equals 1 to get 8, which is divisible by 8.'),
      s(2, 'Final Answer', 'For $n = 2$: $3^{2(2)} - 1 = 81 - 1 = 80 = 8(10)$, divisible by $8$.\nHence $3^{2n} - 1$ is divisible by $8$ for $n = 1, 2$.', 'Substitute n equals 2 to get 80, which is 8 times 10, so it is divisible by 8.'),
    ]
  ),
  'ia-4-p3': sol(
    'Using mathematical induction, prove that $1^2 + 2^2 + 3^2 + \\dots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}$ for all $n \\in \\mathbb{N}$.',
    [
      s(1, 'Base Case (n = 1)', 'Let $P(n) : 1^2 + 2^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}$.\nFor $n = 1$: LHS $= 1^2 = 1$, RHS $= \\frac{1(2)(3)}{6} = 1$. So $P(1)$ is true.', 'Verify P of 1: both LHS and RHS equal 1.'),
      s(2, 'Inductive Hypothesis', 'Assume $P(k)$ is true for some $k \\in \\mathbb{N}$:\n$$1^2 + 2^2 + \\dots + k^2 = \\frac{k(k+1)(2k+1)}{6}$$', 'Assume the formula holds for n equals k.'),
      s(3, 'Inductive Step (n = k + 1)', 'Add $(k + 1)^2$ to both sides:\n$$\\text{LHS} = \\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{(k+1)[k(2k+1) + 6(k+1)]}{6}$$\n$$= \\frac{(k+1)(2k^2 + 7k + 6)}{6} = \\frac{(k+1)(k+2)(2k+3)}{6}$$', 'Add the k plus 1 squared term, factor out k plus 1 over 6, and factorize the quadratic.'),
      s(4, 'Final Answer', 'This equals $\\frac{(k+1)[(k+1)+1][2(k+1)+1]}{6}$, so $P(k+1)$ is true.\nBy the Principle of Mathematical Induction, $P(n)$ is true for all $n \\in \\mathbb{N}$.', 'The expression matches the RHS for k plus 1, completing the induction proof.'),
    ]
  ),
  'ia-4-p4': sol(
    'By mathematical induction, prove that $\\frac{1}{1 \\cdot 3} + \\frac{1}{3 \\cdot 5} + \\frac{1}{5 \\cdot 7} + \\dots + \\frac{1}{(2n - 1)(2n + 1)} = \\frac{n}{2n + 1}$ for all $n \\in \\mathbb{N}$.',
    [
      s(1, 'Base Case (n = 1)', 'For $n = 1$: LHS $= \\frac{1}{1 \\cdot 3} = \\frac{1}{3}$, RHS $= \\frac{1}{2(1)+1} = \\frac{1}{3}$. So $P(1)$ is true.', 'Check n equals 1: both sides equal 1 over 3.'),
      s(2, 'Inductive Hypothesis', 'Assume $P(k)$ holds:\n$$\\frac{1}{1 \\cdot 3} + \\dots + \\frac{1}{(2k-1)(2k+1)} = \\frac{k}{2k+1}$$', 'Assume the statement holds for k.'),
      s(3, 'Inductive Step & Final Answer', 'Add $\\frac{1}{(2k+1)(2k+3)}$ to both sides:\n$$\\text{LHS} = \\frac{k}{2k+1} + \\frac{1}{(2k+1)(2k+3)} = \\frac{k(2k+3) + 1}{(2k+1)(2k+3)}$$\n$$= \\frac{2k^2 + 3k + 1}{(2k+1)(2k+3)} = \\frac{(2k+1)(k+1)}{(2k+1)(2k+3)} = \\frac{k+1}{2(k+1)+1}$$\nThus $P(k+1)$ is true. By induction, $P(n)$ holds for all $n \\in \\mathbb{N}$.', 'Combine over the common denominator, cancel 2k plus 1, and get k plus 1 over 2k plus 3.'),
    ]
  ),
  'ia-4-p5': sol(
    'Prove by mathematical induction that $4^n + 15n - 1$ is divisible by $9$ for every positive integer $n$.',
    [
      s(1, 'Base Case (n = 1)', 'Let $P(n) : 4^n + 15n - 1$ is divisible by $9$.\nFor $n = 1$: $4^1 + 15(1) - 1 = 18 = 9(2)$, divisible by $9$. So $P(1)$ is true.', 'For n equals 1, we get 18, which is divisible by 9.'),
      s(2, 'Inductive Hypothesis', 'Assume $P(k)$ is true: $4^k + 15k - 1 = 9m$ for some integer $m$, so $4^k = 9m - 15k + 1$.', 'Express 4 power k in terms of 9m from the assumption for k.'),
      s(3, 'Inductive Step & Final Answer', 'For $n = k + 1$:\n$$4^{k+1} + 15(k+1) - 1 = 4(4^k) + 15k + 14$$\n$$= 4(9m - 15k + 1) + 15k + 14 = 36m - 45k + 18 = 9(4m - 5k + 2)$$\nSince $4m - 5k + 2 \\in \\mathbb{Z}$, $P(k+1)$ is divisible by $9$. By induction, $P(n)$ holds for all $n \\in \\mathbb{N}$.', 'Substitute 4 power k, simplify, and factor out 9 to prove divisibility for k plus 1.'),
    ]
  ),
  'ia-5-p1': sol(
    'If $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & -4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 5 \\\\ -1 & 2 \\end{pmatrix}$, find $2A + B^T$.',
    [
      s(1, 'Step 1', '$$2A = 2\\begin{pmatrix} 1 & 2 \\\\ 3 & -4 \\end{pmatrix} = \\begin{pmatrix} 2 & 4 \\\\ 6 & -8 \\end{pmatrix}$$\n$$B^T = \\begin{pmatrix} 0 & -1 \\\\ 5 & 2 \\end{pmatrix}$$', 'Multiply every entry of A by 2, and take the transpose of B by swapping its rows and columns.'),
      s(2, 'Final Answer', '$$2A + B^T = \\begin{pmatrix} 2+0 & 4-1 \\\\ 6+5 & -8+2 \\end{pmatrix} = \\begin{pmatrix} 2 & 3 \\\\ 11 & -6 \\end{pmatrix}$$', 'Add corresponding entries to obtain 2, 3 in the first row and 11, minus 6 in the second row.'),
    ]
  ),
  'ia-5-p2': sol(
    'Find the value of $x$ if the matrix $\\begin{pmatrix} x - 1 & 2 \\\\ 3 & x - 2 \\end{pmatrix}$ is singular.',
    [
      s(1, 'Condition', 'A matrix is singular if and only if its determinant is $0$:\n$$\\begin{vmatrix} x - 1 & 2 \\\\ 3 & x - 2 \\end{vmatrix} = 0$$', 'For a singular matrix, set the determinant equal to zero.'),
      s(2, 'Step 1 & Final Answer', '$$(x - 1)(x - 2) - 6 = 0 \\implies x^2 - 3x + 2 - 6 = 0 \\implies x^2 - 3x - 4 = 0$$\n$$(x - 4)(x + 1) = 0 \\implies x = 4 \\text{ or } x = -1$$', 'Expand the 2 by 2 determinant and factorize the quadratic to get x equals 4 or minus 1.'),
    ]
  ),
  'ia-5-p3': sol(
    'Find the inverse of the matrix $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 3 & 2 & 3 \\\\ 1 & 1 & 2 \\end{pmatrix}$ using the adjoint method.',
    [
      s(1, 'Step 1 (Determinant)', '$$\\det A = 1(4 - 3) - 2(6 - 3) + 1(3 - 2) = 1 - 6 + 1 = -4 \\neq 0$$\nHence $A^{-1}$ exists.', 'Compute the determinant first; since it is minus 4 (non-zero), the inverse exists.'),
      s(2, 'Step 2 (Cofactor Matrix)', 'Cofactor matrix $C = \\begin{pmatrix} 1 & -3 & 1 \\\\ -3 & 1 & 1 \\\\ 4 & 0 & -4 \\end{pmatrix}$.\n$$\\text{Adj } A = C^T = \\begin{pmatrix} 1 & -3 & 4 \\\\ -3 & 1 & 0 \\\\ 1 & 1 & -4 \\end{pmatrix}$$', 'Calculate the 9 cofactors with alternating signs and take the transpose to form Adj A.', 'Remember the checkerboard sign pattern (+ - + / - + - / + - +).'),
      s(3, 'Final Answer', '$$A^{-1} = \\frac{1}{\\det A}\\text{Adj } A = -\\frac{1}{4}\\begin{pmatrix} 1 & -3 & 4 \\\\ -3 & 1 & 0 \\\\ 1 & 1 & -4 \\end{pmatrix}$$', 'Divide the adjoint matrix by the determinant minus 4 to get A inverse.'),
    ]
  ),
  'ia-5-p4': sol(
    'Show that $\\begin{vmatrix} 1 & a & a^2 \\\\ 1 & b & b^2 \\\\ 1 & c & c^2 \\end{vmatrix} = (a - b)(b - c)(c - a)$.',
    [
      s(1, 'Step 1', 'Apply $R_1 \\to R_1 - R_2$ and $R_2 \\to R_2 - R_3$:\n$$\\Delta = \\begin{vmatrix} 0 & a - b & a^2 - b^2 \\\\ 0 & b - c & b^2 - c^2 \\\\ 1 & c & c^2 \\end{vmatrix}$$', 'Use row operations R1 minus R2 and R2 minus R3 to create two zeros in the first column.'),
      s(2, 'Step 2', 'Take $(a - b)$ common from $R_1$ and $(b - c)$ common from $R_2$:\n$$\\Delta = (a - b)(b - c)\\begin{vmatrix} 0 & 1 & a + b \\\\ 0 & 1 & b + c \\\\ 1 & c & c^2 \\end{vmatrix}$$', 'Factor out a minus b from row 1 and b minus c from row 2.'),
      s(3, 'Final Answer', 'Expanding along $C_1$:\n$$\\Delta = (a - b)(b - c) \\cdot 1 \\cdot [(b + c) - (a + b)] = (a - b)(b - c)(c - a)$$', 'Expand along column 1 to obtain a minus b times b minus c times c minus a.'),
    ]
  ),
  'ia-5-p5': sol(
    'Solve the system of equations $x + y + z = 6$, $x - y + z = 2$, $2x + y - z = 1$ using Cramer’s rule.',
    [
      s(1, 'Step 1 (Compute Δ)', '$$\\Delta = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 1 \\\\ 2 & 1 & -1 \\end{vmatrix} = 1(1 - 1) - 1(-1 - 2) + 1(1 + 2) = 0 + 3 + 3 = 6 \\neq 0$$', 'Evaluate the coefficient determinant delta, which equals 6.'),
      s(2, 'Step 2 (Compute Δ₁, Δ₂, Δ₃)', '$$\\Delta_1 = \\begin{vmatrix} 6 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 1 & 1 & -1 \\end{vmatrix} = 6(0) - 1(-3) + 1(3) = 6$$\n$$\\Delta_2 = \\begin{vmatrix} 1 & 6 & 1 \\\\ 1 & 2 & 1 \\\\ 2 & 1 & -1 \\end{vmatrix} = 1(-3) - 6(-3) + 1(-3) = 12$$\n$$\\Delta_3 = \\begin{vmatrix} 1 & 1 & 6 \\\\ 1 & -1 & 2 \\\\ 2 & 1 & 1 \\end{vmatrix} = 1(-3) - 1(-3) + 6(3) = 18$$', 'Replace each column in turn with the constants 6, 2, 1 to find delta 1 equals 6, delta 2 equals 12, and delta 3 equals 18.'),
      s(3, 'Final Answer', '$$x = \\frac{\\Delta_1}{\\Delta} = \\frac{6}{6} = 1, \\quad y = \\frac{\\Delta_2}{\\Delta} = \\frac{12}{6} = 2, \\quad z = \\frac{\\Delta_3}{\\Delta} = \\frac{18}{6} = 3$$\nSolution: $(x, y, z) = (1, 2, 3)$.', 'Divide each by delta equals 6 to get x equals 1, y equals 2, z equals 3.'),
    ]
  ),
  'ia-6-p1': sol(
    'Find the unit vector in the direction of the vector $\\vec{a} = 2\\hat{i} + 3\\hat{j} + \\hat{k}$.',
    [
      s(1, 'Step 1', '$$|\\vec{a}| = \\sqrt{2^2 + 3^2 + 1^2} = \\sqrt{4 + 9 + 1} = \\sqrt{14}$$', 'First find the magnitude of vector a, which is square root of 14.'),
      s(2, 'Final Answer', '$$\\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|} = \\frac{2\\hat{i} + 3\\hat{j} + \\hat{k}}{\\sqrt{14}}$$', 'Divide vector a by its magnitude root 14 to get the unit vector.'),
    ]
  ),
  'ia-6-p2': sol(
    'If the vectors $-3\\hat{i} + 4\\hat{j} + \\lambda\\hat{k}$ and $\\mu\\hat{i} + 8\\hat{j} + 6\\hat{k}$ are collinear, find $\\lambda$ and $\\mu$.',
    [
      s(1, 'Condition', 'Since the vectors are collinear, their corresponding components are proportional:\n$$\\frac{-3}{\\mu} = \\frac{4}{8} = \\frac{\\lambda}{6}$$', 'For collinear vectors, equate the ratios of the i, j, and k components.'),
      s(2, 'Final Answer', 'From $\\frac{4}{8} = \\frac{1}{2}$:\n$$\\frac{-3}{\\mu} = \\frac{1}{2} \\implies \\mu = -6, \\quad \\frac{\\lambda}{6} = \\frac{1}{2} \\implies \\lambda = 3$$', 'Equating each ratio to 1 by 2 gives mu equals minus 6 and lambda equals 3.'),
    ]
  ),
  'ia-6-p3': sol(
    'Show that the four points with position vectors $4\\hat{i} + 5\\hat{j} + \\hat{k}$, $-\\hat{j} - \\hat{k}$, $3\\hat{i} + 9\\hat{j} + 4\\hat{k}$, and $-4\\hat{i} + 4\\hat{j} + 4\\hat{k}$ are coplanar.',
    [
      s(1, 'Step 1', 'Let the points be $A, B, C, D$.\n$$\\vec{AB} = -4\\hat{i} - 6\\hat{j} - 2\\hat{k}$$\n$$\\vec{AC} = -\\hat{i} + 4\\hat{j} + 3\\hat{k}$$\n$$\\vec{AD} = -8\\hat{i} - \\hat{j} + 3\\hat{k}$$', 'Form three vectors AB, AC, and AD starting from the same point A.'),
      s(2, 'Step 2 & Final Answer', 'Compute the scalar triple product $[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}]$:\n$$\\begin{vmatrix} -4 & -6 & -2 \\\\ -1 & 4 & 3 \\\\ -8 & -1 & 3 \\end{vmatrix} = -4(12 + 3) + 6(-3 + 24) - 2(1 + 32)$$\n$$= -60 + 126 - 66 = 0$$\nSince $[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}] = 0$, the four points are coplanar.', 'The 3 by 3 determinant evaluates to zero, proving the four points are coplanar.'),
    ]
  ),
  'ia-6-p4': sol(
    'Find the vector equation of the line passing through the point $2\\hat{i} + \\hat{j} + 3\\hat{k}$ and parallel to the vector $3\\hat{i} - 2\\hat{j} + \\hat{k}$.',
    [
      s(1, 'Formula', 'Vector equation of a line passing through $\\vec{a}$ and parallel to $\\vec{b}$ is:\n$$\\vec{r} = \\vec{a} + t\\vec{b}, \\quad t \\in \\mathbb{R}$$', 'Recall the standard vector equation r equals a plus t b.'),
      s(2, 'Final Answer', 'Here $\\vec{a} = 2\\hat{i} + \\hat{j} + 3\\hat{k}$ and $\\vec{b} = 3\\hat{i} - 2\\hat{j} + \\hat{k}$:\n$$\\vec{r} = (2\\hat{i} + \\hat{j} + 3\\hat{k}) + t(3\\hat{i} - 2\\hat{j} + \\hat{k}), \\quad t \\in \\mathbb{R}$$', 'Substitute a and b directly to get the vector equation of the line.'),
    ]
  ),
  'ia-6-p5': sol(
    'Find the vector equation of the plane passing through the points $A(2\\hat{i} + 2\\hat{j} - \\hat{k})$, $B(3\\hat{i} + 4\\hat{j} + 2\\hat{k})$, and $C(7\\hat{i} + 6\\hat{k})$.',
    [
      s(1, 'Step 1', 'Let $\\vec{a} = 2\\hat{i} + 2\\hat{j} - \\hat{k}$, $\\vec{b} = 3\\hat{i} + 4\\hat{j} + 2\\hat{k}$, $\\vec{c} = 7\\hat{i} + 6\\hat{k}$.\n$$\\vec{b} - \\vec{a} = \\hat{i} + 2\\hat{j} + 3\\hat{k}, \\quad \\vec{c} - \\vec{a} = 5\\hat{i} - 2\\hat{j} + 7\\hat{k}$$', 'Find the two direction vectors b minus a and c minus a lying in the plane.'),
      s(2, 'Step 2', 'Vector equation in parametric form: $\\vec{r} = (1 - s - t)\\vec{a} + s\\vec{b} + t\\vec{c}$.\nIn non-parametric form, normal $\\vec{n} = (\\vec{b} - \\vec{a}) \\times (\\vec{c} - \\vec{a})$:\n$$\\vec{n} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 3 \\\\ 5 & -2 & 7 \\end{vmatrix} = 20\\hat{i} + 8\\hat{j} - 12\\hat{k}$$', 'Take the cross product of the two direction vectors to find a normal vector n to the plane.'),
      s(3, 'Final Answer', 'Using $(\\vec{r} - \\vec{a}) \\cdot \\vec{n} = 0$ and dividing by $4$:\n$$\\vec{r} \\cdot (5\\hat{i} + 2\\hat{j} - 3\\hat{k}) = (2\\hat{i} + 2\\hat{j} - \\hat{k}) \\cdot (5\\hat{i} + 2\\hat{j} - 3\\hat{k}) = 10 + 4 + 3 = 17$$\n$$\\vec{r} \\cdot (5\\hat{i} + 2\\hat{j} - 3\\hat{k}) = 17$$', 'Simplify by dividing by 4 and take the dot product to obtain the non-parametric vector equation.'),
    ]
  ),
  'ia-7-p1': sol(
    'Find the angle between the vectors $\\vec{a} = \\hat{i} + 2\\hat{j} + 3\\hat{k}$ and $\\vec{b} = 3\\hat{i} - \\hat{j} + 2\\hat{k}$.',
    [
      s(1, 'Step 1', '$$\\vec{a} \\cdot \\vec{b} = (1)(3) + (2)(-1) + (3)(2) = 3 - 2 + 6 = 7$$\n$$|\\vec{a}| = \\sqrt{1 + 4 + 9} = \\sqrt{14}, \\quad |\\vec{b}| = \\sqrt{9 + 1 + 4} = \\sqrt{14}$$', 'Compute the dot product a dot b equals 7, and both magnitudes equal root 14.'),
      s(2, 'Final Answer', '$$\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} = \\frac{7}{\\sqrt{14}\\sqrt{14}} = \\frac{7}{14} = \\frac{1}{2} \\implies \\theta = \\frac{\\pi}{3} \\text{ or } 60^\\circ$$', 'Cos theta equals 1 by 2, so the angle between the vectors is 60 degrees.'),
    ]
  ),
  'ia-7-p2': sol(
    'Find the area of the parallelogram whose adjacent sides are $\\vec{a} = 2\\hat{i} - 3\\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} + 4\\hat{j} - 2\\hat{k}$.',
    [
      s(1, 'Step 1', '$$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -3 & 1 \\\\ 1 & 4 & -2 \\end{vmatrix} = (6 - 4)\\hat{i} - (-4 - 1)\\hat{j} + (8 + 3)\\hat{k} = 2\\hat{i} + 5\\hat{j} + 11\\hat{k}$$', 'Calculate the cross product a cross b using the 3 by 3 determinant.'),
      s(2, 'Final Answer', '$$\\text{Area} = |\\vec{a} \\times \\vec{b}| = \\sqrt{2^2 + 5^2 + 11^2} = \\sqrt{4 + 25 + 121} = \\sqrt{150} = 5\\sqrt{6} \\text{ sq. units}$$', 'The area of the parallelogram is the magnitude of the cross product, which is 5 root 6 square units.'),
    ]
  ),
  'ia-7-p3': sol(
    'Find a unit vector perpendicular to both $\\vec{a} = 2\\hat{i} + \\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} - \\hat{j} + 2\\hat{k}$.',
    [
      s(1, 'Step 1', '$$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 1 & 1 \\\\ 1 & -1 & 2 \\end{vmatrix} = (2 + 1)\\hat{i} - (4 - 1)\\hat{j} + (-2 - 1)\\hat{k} = 3\\hat{i} - 3\\hat{j} - 3\\hat{k}$$', 'Find a vector perpendicular to both by computing the cross product a cross b.'),
      s(2, 'Final Answer', '$$|\\vec{a} \\times \\vec{b}| = \\sqrt{9 + 9 + 9} = 3\\sqrt{3}$$\nRequired unit vectors: $\\pm\\frac{\\vec{a} \\times \\vec{b}}{|\\vec{a} \\times \\vec{b}|} = \\pm\\frac{1}{\\sqrt{3}}(\\hat{i} - \\hat{j} - \\hat{k})$.', 'Divide by the magnitude 3 root 3 and include the plus or minus sign for both perpendicular directions.', 'Always include +/- when asked for a unit vector perpendicular to two vectors.'),
    ]
  ),
  'ia-7-p4': sol(
    'Find the volume of the tetrahedron having the vertices $(1, 2, 1)$, $(3, 2, 5)$, $(2, -1, 0)$, and $(-1, 0, 1)$.',
    [
      s(1, 'Step 1', 'Let vertices be $A(1,2,1), B(3,2,5), C(2,-1,0), D(-1,0,1)$.\n$$\\vec{AB} = (2, 0, 4), \\quad \\vec{AC} = (1, -3, -1), \\quad \\vec{AD} = (-2, -2, 0)$$', 'Form the three coterminous edge vectors AB, AC, and AD.'),
      s(2, 'Step 2', '$$[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}] = \\begin{vmatrix} 2 & 0 & 4 \\\\ 1 & -3 & -1 \\\\ -2 & -2 & 0 \\end{vmatrix} = 2(0 - 2) + 4(-2 - 6) = -4 - 32 = -36$$', 'Compute the scalar triple product determinant, which equals minus 36.'),
      s(3, 'Final Answer', '$$V = \\frac{1}{6}\\left|[\\vec{AB}\\ \\vec{AC}\\ \\vec{AD}]\\right| = \\frac{1}{6}|-36| = 6 \\text{ cubic units}$$', 'The volume of the tetrahedron is one-sixth of the absolute value of the determinant, giving 6 cubic units.'),
    ]
  ),
  'ia-7-p5': sol(
    'Find the shortest distance between the skew lines $\\vec{r} = (6\\hat{i} + 2\\hat{j} + 2\\hat{k}) + t(\\hat{i} - 2\\hat{j} + 2\\hat{k})$ and $\\vec{r} = (-4\\hat{i} - \\hat{k}) + s(3\\hat{i} - 2\\hat{j} - 2\\hat{k})$.',
    [
      s(1, 'Given', '$\\vec{a}_1 = 6\\hat{i} + 2\\hat{j} + 2\\hat{k},\\ \\vec{b}_1 = \\hat{i} - 2\\hat{j} + 2\\hat{k}$.\n$\\vec{a}_2 = -4\\hat{i} - \\hat{k},\\ \\vec{b}_2 = 3\\hat{i} - 2\\hat{j} - 2\\hat{k}$.\n$$\\vec{a}_2 - \\vec{a}_1 = -10\\hat{i} - 2\\hat{j} - 3\\hat{k}$$', 'Identify a1, b1, a2, b2 and compute the vector a2 minus a1.'),
      s(2, 'Step 1', '$$\\vec{b}_1 \\times \\vec{b}_2 = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -2 & 2 \\\\ 3 & -2 & -2 \\end{vmatrix} = (4 + 4)\\hat{i} - (-2 - 6)\\hat{j} + (-2 + 6)\\hat{k} = 8\\hat{i} + 8\\hat{j} + 4\\hat{k}$$\n$$|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{64 + 64 + 16} = \\sqrt{144} = 12$$', 'Find b1 cross b2 and its magnitude, which equals 12.'),
      s(3, 'Final Answer', '$$S.D. = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|} = \\frac{|-80 - 16 - 12|}{12} = \\frac{108}{12} = 9 \\text{ units}$$', 'Take the dot product and divide by 12 to get the shortest distance equal to 9 units.'),
    ]
  ),
  'ia-8-p1': sol(
    'Find the period of the function $f(x) = \\cos\\left(\\frac{4x + 9}{5}\\right)$.',
    [
      s(1, 'Formula', 'The period of $\\cos(ax + b)$ is $\\frac{2\\pi}{|a|}$.', 'Recall that the period of cos ax plus b is 2 pi divided by mod a.'),
      s(2, 'Final Answer', 'Here $a = \\frac{4}{5}$, so:\n$$\\text{Period} = \\frac{2\\pi}{4/5} = \\frac{10\\pi}{4} = \\frac{5\\pi}{2}$$', 'Substituting a equals 4 by 5 gives the period 5 pi by 2.'),
    ]
  ),
  'ia-8-p2': sol(
    'Find the value of $\\sin 15^\\circ$ and $\\cos 75^\\circ$.',
    [
      s(1, 'Step 1', '$$\\sin 15^\\circ = \\sin(45^\\circ - 30^\\circ) = \\sin 45^\\circ \\cos 30^\\circ - \\cos 45^\\circ \\sin 30^\\circ$$\n$$= \\frac{1}{\\sqrt{2}} \\cdot \\frac{\\sqrt{3}}{2} - \\frac{1}{\\sqrt{2}} \\cdot \\frac{1}{2} = \\frac{\\sqrt{3} - 1}{2\\sqrt{2}}$$', 'Expand sin 45 minus 30 degrees using the compound angle formula.'),
      s(2, 'Final Answer', '$$\\cos 75^\\circ = \\cos(90^\\circ - 15^\\circ) = \\sin 15^\\circ = \\frac{\\sqrt{3} - 1}{2\\sqrt{2}}$$', 'Since 75 and 15 are complementary angles, cos 75 degrees equals sin 15 degrees.'),
    ]
  ),
  'ia-8-p3': sol(
    'If $A + B = 45^\\circ$, prove that $(1 + \\tan A)(1 + \\tan B) = 2$.',
    [
      s(1, 'Step 1', 'Given $A + B = 45^\\circ$. Taking $\\tan$ on both sides:\n$$\\tan(A + B) = \\tan 45^\\circ \\implies \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B} = 1$$', 'Apply tangent to both sides of A plus B equals 45 degrees.'),
      s(2, 'Step 2', '$$\\tan A + \\tan B = 1 - \\tan A \\tan B \\implies \\tan A + \\tan B + \\tan A \\tan B = 1$$', 'Cross-multiply and bring tan A tan B to the left side.'),
      s(3, 'Final Answer', 'Adding $1$ to both sides:\n$$1 + \\tan A + \\tan B + \\tan A \\tan B = 1 + 1 \\implies (1 + \\tan A)(1 + \\tan B) = 2$$', 'Add 1 to both sides and factorize to complete the proof.'),
    ]
  ),
  'ia-8-p4': sol(
    'If $A, B, C$ are angles in a triangle, prove that $\\sin 2A + \\sin 2B + \\sin 2C = 4\\sin A \\sin B \\sin C$.',
    [
      s(1, 'Given', '$A + B + C = 180^\\circ \\implies A + B = 180^\\circ - C$.\nSo $\\sin(A + B) = \\sin C$ and $\\cos(A + B) = -\\cos C$.', 'Since A, B, C are angles of a triangle, their sum is 180 degrees.'),
      s(2, 'Step 1', '$$\\text{LHS} = (\\sin 2A + \\sin 2B) + \\sin 2C = 2\\sin(A + B)\\cos(A - B) + 2\\sin C \\cos C$$', 'Apply the sum-to-product formula on sin 2A plus sin 2B and double-angle on sin 2C.'),
      s(3, 'Final Answer', 'Substitute $\\sin(A + B) = \\sin C$ and $\\cos C = -\\cos(A + B)$:\n$$\\text{LHS} = 2\\sin C[\\cos(A - B) - \\cos(A + B)] = 2\\sin C(2\\sin A \\sin B) = 4\\sin A \\sin B \\sin C$$', 'Factor out 2 sin C and simplify cos A minus B minus cos A plus B to get 4 sin A sin B sin C.'),
    ]
  ),
  'ia-8-p5': sol(
    'If $A + B + C = \\pi$, prove that $\\cos^2 \\frac{A}{2} + \\cos^2 \\frac{B}{2} + \\cos^2 \\frac{C}{2} = 2 + 2\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$.',
    [
      s(1, 'Step 1', 'Using $\\cos^2 \\theta = \\frac{1 + \\cos 2\\theta}{2}$ on first two terms:\n$$\\text{LHS} = 1 + \\frac{\\cos A + \\cos B}{2} + 1 - \\sin^2 \\frac{C}{2} = 2 + \\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2} - \\sin^2\\frac{C}{2}$$', 'Convert cos square terms using the half-angle identity and write cos square C by 2 as 1 minus sin square C by 2.'),
      s(2, 'Step 2', 'Since $\\frac{A + B}{2} = \\frac{\\pi}{2} - \\frac{C}{2}$, we have $\\cos\\frac{A+B}{2} = \\sin\\frac{C}{2}$ and $\\sin\\frac{C}{2} = \\cos\\frac{A+B}{2}$:\n$$\\text{LHS} = 2 + \\sin\\frac{C}{2}\\left[\\cos\\frac{A-B}{2} - \\cos\\frac{A+B}{2}\\right]$$', 'Substitute the complementary half-angle relation and factor out sin C by 2.'),
      s(3, 'Final Answer', '$$\\text{LHS} = 2 + \\sin\\frac{C}{2}\\left[2\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\right] = 2 + 2\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$$', 'Apply the product identity to reach the required RHS.'),
    ]
  ),
  'ia-9-p1': sol(
    'Find the principal solutions of $\\cos x = -\\frac{1}{2}$.',
    [
      s(1, 'Step 1', 'Since $\\cos x = -\\frac{1}{2} < 0$, $x$ lies in Quadrants II and III.\nWe know $\\cos\\frac{\\pi}{3} = \\frac{1}{2}$.', 'Cos x is negative in the second and third quadrants, with reference angle pi by 3.'),
      s(2, 'Final Answer', 'In Quadrant II: $x = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$.\nIn Quadrant III: $x = \\pi + \\frac{\\pi}{3} = \\frac{4\\pi}{3}$.\nPrincipal solutions: $x = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$.', 'Thus the principal solutions in zero to 2 pi are 2 pi by 3 and 4 pi by 3.'),
    ]
  ),
  'ia-9-p2': sol(
    'Find the general solution of $\\tan 2x = \\sqrt{3}$.',
    [
      s(1, 'Step 1', '$$\\tan 2x = \\sqrt{3} = \\tan\\frac{\\pi}{3}$$', 'Write root 3 as tan pi by 3.'),
      s(2, 'Final Answer', 'Using $\\tan\\theta = \\tan\\alpha \\implies \\theta = n\\pi + \\alpha$ ($n \\in \\mathbb{Z}$):\n$$2x = n\\pi + \\frac{\\pi}{3} \\implies x = \\frac{n\\pi}{2} + \\frac{\\pi}{6}, \\quad n \\in \\mathbb{Z}$$', 'Divide by 2 to get x equals n pi by 2 plus pi by 6.'),
    ]
  ),
  'ia-9-p3': sol(
    'Solve $2\\cos^2\\theta - 3\\sin\\theta = 0$ for $\\theta$.',
    [
      s(1, 'Step 1', 'Substitute $\\cos^2\\theta = 1 - \\sin^2\\theta$:\n$$2(1 - \\sin^2\\theta) - 3\\sin\\theta = 0 \\implies 2\\sin^2\\theta + 3\\sin\\theta - 2 = 0$$', 'Convert cos square theta to 1 minus sin square theta to form a quadratic in sin theta.'),
      s(2, 'Step 2', '$$(2\\sin\\theta - 1)(\\sin\\theta + 2) = 0$$\nSince $\\sin\\theta = -2$ is impossible ($|\\sin\\theta| \\le 1$), we have $\\sin\\theta = \\frac{1}{2} = \\sin\\frac{\\pi}{6}$.', 'Factorize; discard sin theta equals minus 2 because sine lies between minus 1 and 1.'),
      s(3, 'Final Answer', '$$\\theta = n\\pi + (-1)^n\\frac{\\pi}{6}, \\quad n \\in \\mathbb{Z}$$', 'The general solution is n pi plus minus 1 power n times pi by 6.'),
    ]
  ),
  'ia-9-p4': sol(
    'Solve $\\sqrt{3}\\cos\\theta + \\sin\\theta = \\sqrt{2}$.',
    [
      s(1, 'Step 1', 'Divide both sides by $\\sqrt{(\\sqrt{3})^2 + 1^2} = 2$:\n$$\\frac{\\sqrt{3}}{2}\\cos\\theta + \\frac{1}{2}\\sin\\theta = \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}}$$', 'Divide the equation by 2 so the coefficients become cosine and sine of pi by 6.'),
      s(2, 'Step 2', '$$\\cos\\theta\\cos\\frac{\\pi}{6} + \\sin\\theta\\sin\\frac{\\pi}{6} = \\cos\\frac{\\pi}{4} \\implies \\cos\\left(\\theta - \\frac{\\pi}{6}\\right) = \\cos\\frac{\\pi}{4}$$', 'Combine using cos A minus B.'),
      s(3, 'Final Answer', '$$\\theta - \\frac{\\pi}{6} = 2n\\pi \\pm \\frac{\\pi}{4} \\implies \\theta = 2n\\pi + \\frac{\\pi}{6} \\pm \\frac{\\pi}{4}, \\quad n \\in \\mathbb{Z}$$', 'Write the general solution for cosine and add pi by 6.'),
    ]
  ),
  'ia-9-p5': sol(
    'Solve $\\cos\\theta + \\cos 2\\theta + \\cos 3\\theta = 0$.',
    [
      s(1, 'Step 1', 'Group $\\cos 3\\theta + \\cos\\theta$:\n$$(\\cos 3\\theta + \\cos\\theta) + \\cos 2\\theta = 0 \\implies 2\\cos 2\\theta \\cos\\theta + \\cos 2\\theta = 0$$', 'Pair cos 3 theta with cos theta and apply sum-to-product so cos 2 theta factors out.'),
      s(2, 'Step 2', '$$\\cos 2\\theta(2\\cos\\theta + 1) = 0$$\nCase 1: $\\cos 2\\theta = 0 \\implies 2\\theta = (2n + 1)\\frac{\\pi}{2} \\implies \\theta = (2n + 1)\\frac{\\pi}{4}$.', 'Solve the first factor cos 2 theta equals zero.'),
      s(3, 'Final Answer', 'Case 2: $\\cos\\theta = -\\frac{1}{2} = \\cos\\frac{2\\pi}{3} \\implies \\theta = 2n\\pi \\pm \\frac{2\\pi}{3}$.\nGeneral solution: $\\theta = (2n + 1)\\frac{\\pi}{4}$ or $\\theta = 2n\\pi \\pm \\frac{2\\pi}{3}$, $n \\in \\mathbb{Z}$.', 'Solve cos theta equals minus 1 by 2 and combine both solution families.'),
    ]
  ),
  'ia-10-p1': sol(
    'Find the principal value of $\\sin^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right) + \\cos^{-1}\\left(-\\frac{1}{2}\\right)$.',
    [
      s(1, 'Step 1', '$$\\sin^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right) = -\\frac{\\pi}{3} \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$$\n$$\\cos^{-1}\\left(-\\frac{1}{2}\\right) = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3} \\in [0, \\pi]$$', 'Evaluate each principal value in its respective standard range.'),
      s(2, 'Final Answer', '$$-\\frac{\\pi}{3} + \\frac{2\\pi}{3} = \\frac{\\pi}{3}$$', 'Add minus pi by 3 and 2 pi by 3 to get pi by 3.'),
    ]
  ),
  'ia-10-p2': sol(
    'Evaluate $\\tan^{-1}\\left(\\frac{1}{2}\\right) + \\tan^{-1}\\left(\\frac{1}{3}\\right)$.',
    [
      s(1, 'Formula', 'For $xy < 1$:\n$$\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\left(\\frac{x + y}{1 - xy}\\right)$$', 'Check xy equals 1 by 6 which is less than 1, so we use the standard sum formula.'),
      s(2, 'Final Answer', '$$\\tan^{-1}\\left(\\frac{\\frac{1}{2} + \\frac{1}{3}}{1 - \\frac{1}{6}}\\right) = \\tan^{-1}\\left(\\frac{5/6}{5/6}\\right) = \\tan^{-1}(1) = \\frac{\\pi}{4}$$', 'Simplify the fraction to 1, giving the final answer pi by 4.'),
    ]
  ),
  'ia-10-p3': sol(
    'Prove that $\\sin^{-1}\\left(\\frac{4}{5}\\right) + \\sin^{-1}\\left(\\frac{5}{13}\\right) + \\sin^{-1}\\left(\\frac{16}{65}\\right) = \\frac{\\pi}{2}$.',
    [
      s(1, 'Step 1', 'Let $\\alpha = \\sin^{-1}\\left(\\frac{4}{5}\\right) \\implies \\cos\\alpha = \\frac{3}{5}$.\nLet $\\beta = \\sin^{-1}\\left(\\frac{5}{13}\\right) \\implies \\cos\\beta = \\frac{12}{13}$.', 'Convert the first two inverse sines into angles alpha and beta and find their cosines.'),
      s(2, 'Step 2', '$$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta = \\frac{3}{5}\\cdot\\frac{12}{13} - \\frac{4}{5}\\cdot\\frac{5}{13} = \\frac{36 - 20}{65} = \\frac{16}{65}$$', 'Compute cos alpha plus beta, which gives 16 over 65.'),
      s(3, 'Final Answer', 'Thus $\\alpha + \\beta = \\cos^{-1}\\left(\\frac{16}{65}\\right)$.\n$$\\text{LHS} = \\cos^{-1}\\left(\\frac{16}{65}\\right) + \\sin^{-1}\\left(\\frac{16}{65}\\right) = \\frac{\\pi}{2}$$', 'Using cos inverse x plus sin inverse x equals pi by 2 completes the proof.'),
    ]
  ),
  'ia-10-p4': sol(
    'Prove that $\\cos^{-1}\\left(\\frac{4}{5}\\right) + \\sin^{-1}\\left(\\frac{3}{\\sqrt{34}}\\right) = \\tan^{-1}\\left(\\frac{27}{11}\\right)$.',
    [
      s(1, 'Step 1', 'Convert both to $\\tan^{-1}$:\nIf $\\cos\\alpha = \\frac{4}{5}$, then $\\tan\\alpha = \\frac{3}{4} \\implies \\alpha = \\tan^{-1}\\left(\\frac{3}{4}\\right)$.\nIf $\\sin\\beta = \\frac{3}{\\sqrt{34}}$, then $\\cos\\beta = \\frac{5}{\\sqrt{34}} \\implies \\tan\\beta = \\frac{3}{5} \\implies \\beta = \\tan^{-1}\\left(\\frac{3}{5}\\right)$.', 'Use right-angled triangles to rewrite both terms as tan inverse.'),
      s(2, 'Final Answer', 'Since $\\frac{3}{4} \\cdot \\frac{3}{5} = \\frac{9}{20} < 1$:\n$$\\text{LHS} = \\tan^{-1}\\left(\\frac{\\frac{3}{4} + \\frac{3}{5}}{1 - \\frac{9}{20}}\\right) = \\tan^{-1}\\left(\\frac{27/20}{11/20}\\right) = \\tan^{-1}\\left(\\frac{27}{11}\\right)$$', 'Apply the tan inverse sum formula to get tan inverse of 27 over 11.'),
    ]
  ),
  'ia-10-p5': sol(
    'Solve $\\tan^{-1}\\left(\\frac{x - 1}{x - 2}\\right) + \\tan^{-1}\\left(\\frac{x + 1}{x + 2}\\right) = \\frac{\\pi}{4}$.',
    [
      s(1, 'Step 1', 'Taking $\\tan$ on both sides using $\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$:\n$$\\frac{\\frac{x-1}{x-2} + \\frac{x+1}{x+2}}{1 - \\frac{(x-1)(x+1)}{(x-2)(x+2)}} = \\tan\\frac{\\pi}{4} = 1$$', 'Combine the two inverse tangents using the sum formula and equate to tan pi by 4 equals 1.'),
      s(2, 'Step 2', '$$\\frac{(x-1)(x+2) + (x+1)(x-2)}{(x^2 - 4) - (x^2 - 1)} = 1 \\implies \\frac{2x^2 - 4}{-3} = 1$$', 'Simplify the numerator to 2x square minus 4 and the denominator to minus 3.'),
      s(3, 'Final Answer', '$$2x^2 - 4 = -3 \\implies 2x^2 = 1 \\implies x = \\pm\\frac{1}{\\sqrt{2}}$$\n(Verify both satisfy the equation: valid.)', 'Solve 2x square equals 1 to get x equals plus or minus 1 over root 2.'),
    ]
  ),
  'ia-11-p1': sol(
    'If $\\sinh x = \\frac{3}{4}$, find $\\cosh 2x$ and $\\sinh 2x$.',
    [
      s(1, 'Step 1', 'Using $\\cosh^2 x - \\sinh^2 x = 1$:\n$$\\cosh x = \\sqrt{1 + \\left(\\frac{3}{4}\\right)^2} = \\sqrt{\\frac{25}{16}} = \\frac{5}{4}$$', 'Use the fundamental hyperbolic identity to find cosh x equals 5 by 4 (always positive).', 'Remember cosh x is always >= 1 for real x.'),
      s(2, 'Final Answer', '$$\\cosh 2x = 1 + 2\\sinh^2 x = 1 + 2\\left(\\frac{9}{16}\\right) = \\frac{17}{8}$$\n$$\\sinh 2x = 2\\sinh x \\cosh x = 2\\left(\\frac{3}{4}\\right)\\left(\\frac{5}{4}\\right) = \\frac{15}{8}$$', 'Apply the double-angle hyperbolic formulas to get 17 by 8 and 15 by 8.'),
    ]
  ),
  'ia-11-p2': sol(
    'Prove that $(\\cosh x - \\sinh x)^n = \\cosh(nx) - \\sinh(nx)$ for any integer $n$.',
    [
      s(1, 'Step 1', 'By definition, $\\cosh x = \\frac{e^x + e^{-x}}{2}$ and $\\sinh x = \\frac{e^x - e^{-x}}{2}$.\n$$\\cosh x - \\sinh x = \\frac{e^x + e^{-x} - e^x + e^{-x}}{2} = e^{-x}$$', 'Subtract the exponential definitions to see that cosh x minus sinh x simplifies to e power minus x.'),
      s(2, 'Final Answer', 'Raising both sides to power $n$:\n$$(\\cosh x - \\sinh x)^n = (e^{-x})^n = e^{-nx} = \\cosh(nx) - \\sinh(nx)$$', 'Raising to power n gives e power minus nx, which is cosh nx minus sinh nx.'),
    ]
  ),
  'ia-11-p3': sol(
    'Prove that $\\sinh^{-1}(x) = \\log_e\\left(x + \\sqrt{x^2 + 1}\\right)$ for all $x \\in \\mathbb{R}$.',
    [
      s(1, 'Step 1', 'Let $y = \\sinh^{-1}(x) \\implies x = \\sinh y = \\frac{e^y - e^{-y}}{2}$.\n$$e^y - e^{-y} = 2x \\implies e^{2y} - 2x e^y - 1 = 0$$', 'Set y equals sinh inverse x and multiply through by 2 e power y to form a quadratic in e power y.'),
      s(2, 'Step 2 & Final Answer', 'Solving the quadratic in $e^y$:\n$$e^y = \\frac{2x \\pm \\sqrt{4x^2 + 4}}{2} = x \\pm \\sqrt{x^2 + 1}$$\nSince $e^y > 0$ and $x - \\sqrt{x^2 + 1} < 0$, take the positive sign: $e^y = x + \\sqrt{x^2 + 1}$.\nTaking $\\log_e$: $y = \\sinh^{-1}(x) = \\log_e\\left(x + \\sqrt{x^2 + 1}\\right)$.', 'Discard the negative root since e power y is positive, and take natural log.'),
    ]
  ),
  'ia-11-p4': sol(
    'Show that $\\tanh^{-1}\\left(\\frac{1}{2}\\right) = \\frac{1}{2}\\log_e 3$.',
    [
      s(1, 'Formula', 'For $|x| < 1$:\n$$\\tanh^{-1}(x) = \\frac{1}{2}\\log_e\\left(\\frac{1 + x}{1 - x}\\right)$$', 'Apply the logarithmic formula for tanh inverse x.'),
      s(2, 'Final Answer', 'Substitute $x = \\frac{1}{2}$:\n$$\\tanh^{-1}\\left(\\frac{1}{2}\\right) = \\frac{1}{2}\\log_e\\left(\\frac{1 + 1/2}{1 - 1/2}\\right) = \\frac{1}{2}\\log_e\\left(\\frac{3/2}{1/2}\\right) = \\frac{1}{2}\\log_e 3$$', 'Simplify the fraction inside the logarithm to 3, proving the identity.'),
    ]
  ),
  'ia-11-p5': sol(
    'Prove that $\\cosh 3x = 4\\cosh^3 x - 3\\cosh x$ and $\\sinh 3x = 3\\sinh x + 4\\sinh^3 x$.',
    [
      s(1, 'Step 1 (cosh 3x)', 'Let $c = \\cosh x = \\frac{e^x + e^{-x}}{2}$.\n$$4\\cosh^3 x - 3\\cosh x = 4\\left(\\frac{e^x + e^{-x}}{2}\\right)^3 - 3\\left(\\frac{e^x + e^{-x}}{2}\\right)$$\n$$= \\frac{e^{3x} + 3e^x + 3e^{-x} + e^{-3x}}{2} - \\frac{3e^x + 3e^{-x}}{2} = \\frac{e^{3x} + e^{-3x}}{2} = \\cosh 3x$$', 'Substitute the exponential definition into the RHS of cosh 3x and cancel middle terms.'),
      s(2, 'Final Answer (sinh 3x)', 'Similarly, with $\\sinh x = \\frac{e^x - e^{-x}}{2}$:\n$$3\\sinh x + 4\\sinh^3 x = \\frac{3e^x - 3e^{-x}}{2} + \\frac{e^{3x} - 3e^x + 3e^{-x} - e^{-3x}}{2} = \\frac{e^{3x} - e^{-3x}}{2} = \\sinh 3x$$', 'Follow the same algebraic cancellation for sinh 3x to complete both proofs.'),
    ]
  ),
  'ia-12-p1': sol(
    'In $\\triangle ABC$, if $a = 4$, $b = 5$, and $c = 7$, find $\\cos B$.',
    [
      s(1, 'Formula', 'Cosine rule: $\\cos B = \\frac{c^2 + a^2 - b^2}{2ca}$.', 'Recall the cosine rule for angle B.'),
      s(2, 'Final Answer', '$$\\cos B = \\frac{7^2 + 4^2 - 5^2}{2(7)(4)} = \\frac{49 + 16 - 25}{56} = \\frac{40}{56} = \\frac{5}{7}$$', 'Substitute a, b, c to get 40 over 56, which reduces to 5 by 7.'),
    ]
  ),
  'ia-12-p2': sol(
    'In $\\triangle ABC$, if $\\sum a\\sin(B - C) = 0$, prove it using the sine rule.',
    [
      s(1, 'Step 1', 'By the sine rule, $a = 2R\\sin A$, $b = 2R\\sin B$, $c = 2R\\sin C$.\nAlso $\\sin A = \\sin(B + C)$ since $A + B + C = \\pi$.', 'Replace a by 2R sin A and use sin A equals sin B plus C.'),
      s(2, 'Step 2 & Final Answer', '$$a\\sin(B - C) = 2R\\sin(B + C)\\sin(B - C) = 2R(\\sin^2 B - \\sin^2 C)$$\nSumming cyclically:\n$$\\sum a\\sin(B - C) = 2R\\left[(\\sin^2 B - \\sin^2 C) + (\\sin^2 C - \\sin^2 A) + (\\sin^2 A - \\sin^2 B)\\right] = 0$$', 'All squared sine terms cancel pairwise in the cyclic sum, giving zero.'),
    ]
  ),
  'ia-12-p3': sol(
    'In $\\triangle ABC$, prove that $\\cot\\frac{A}{2} + \\cot\\frac{B}{2} + \\cot\\frac{C}{2} = \\frac{s^2}{\\Delta}$.',
    [
      s(1, 'Formula', 'Using half-angle formulas: $\\cot\\frac{A}{2} = \\frac{s(s-a)}{\\Delta}$, $\\cot\\frac{B}{2} = \\frac{s(s-b)}{\\Delta}$, $\\cot\\frac{C}{2} = \\frac{s(s-c)}{\\Delta}$.', 'Write each half-angle cotangent in terms of s, a, b, c, and area delta.'),
      s(2, 'Final Answer', '$$\\text{LHS} = \\frac{s}{\\Delta}[(s - a) + (s - b) + (s - c)] = \\frac{s}{\\Delta}[3s - (a + b + c)]$$\nSince $a + b + c = 2s$:\n$$\\text{LHS} = \\frac{s}{\\Delta}(3s - 2s) = \\frac{s^2}{\\Delta}$$', 'Substitute a plus b plus c equals 2s to get s square over delta.'),
    ]
  ),
  'ia-12-p4': sol(
    'In $\\triangle ABC$, prove that $\\frac{1}{r_1} + \\frac{1}{r_2} + \\frac{1}{r_3} = \\frac{1}{r}$.',
    [
      s(1, 'Formula', '$r_1 = \\frac{\\Delta}{s - a},\\ r_2 = \\frac{\\Delta}{s - b},\\ r_3 = \\frac{\\Delta}{s - c},\\ r = \\frac{\\Delta}{s}$.', 'Recall the exradii and inradius formulas.'),
      s(2, 'Final Answer', '$$\\text{LHS} = \\frac{s - a}{\\Delta} + \\frac{s - b}{\\Delta} + \\frac{s - c}{\\Delta} = \\frac{3s - (a + b + c)}{\\Delta} = \\frac{3s - 2s}{\\Delta} = \\frac{s}{\\Delta} = \\frac{1}{r}$$', 'Add the reciprocals and replace a plus b plus c by 2s to obtain 1 over r.'),
    ]
  ),
  'ia-12-p5': sol(
    'In $\\triangle ABC$, prove that $r_1 + r_2 + r_3 - r = 4R$.',
    [
      s(1, 'Formula', 'Use $r = 4R\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$, $r_1 = 4R\\sin\\frac{A}{2}\\cos\\frac{B}{2}\\cos\\frac{C}{2}$, etc.', 'Express r and the three exradii in terms of circumradius R and half-angles.'),
      s(2, 'Step 1', '$$r_1 + r_2 = 4R\\cos\\frac{C}{2}\\left(\\sin\\frac{A}{2}\\cos\\frac{B}{2} + \\cos\\frac{A}{2}\\sin\\frac{B}{2}\\right) = 4R\\cos\\frac{C}{2}\\sin\\frac{A+B}{2} = 4R\\cos^2\\frac{C}{2}$$\n$$r_3 - r = 4R\\sin\\frac{C}{2}\\left(\\cos\\frac{A}{2}\\cos\\frac{B}{2} - \\sin\\frac{A}{2}\\sin\\frac{B}{2}\\right) = 4R\\sin\\frac{C}{2}\\cos\\frac{A+B}{2} = 4R\\sin^2\\frac{C}{2}$$', 'Pair r1 plus r2 and r3 minus r and simplify using A plus B equals pi minus C.'),
      s(3, 'Final Answer', '$$(r_1 + r_2) + (r_3 - r) = 4R\\left(\\cos^2\\frac{C}{2} + \\sin^2\\frac{C}{2}\\right) = 4R(1) = 4R$$', 'Adding both pairs gives 4R times 1 equals 4R.'),
    ]
  ),
  'ia-1-p6': sol(
    'Write the set $A = \\{x \\in \\mathbb{Z} : x^2 < 10\\}$ in roster form and find $n(A)$.',
    [
      s(1, 'Given', 'The set-builder form is $A = \\{x \\in \\mathbb{Z} : x^2 < 10\\}$.', 'We need all integers x whose square is strictly less than 10.'),
      s(2, 'Step 1', 'Testing integers: $(-3)^2 = 9 < 10$, while $(\\pm 4)^2 = 16 \\nless 10$.\nThus $x \\in \\{-3, -2, -1, 0, 1, 2, 3\\}$.', 'Check squares of integers around 0. Values from minus 3 to plus 3 satisfy x square less than 10.'),
      s(3, 'Final Answer', 'Roster form: $A = \\{-3, -2, -1, 0, 1, 2, 3\\}$.\nCardinality: $n(A) = 7$.', 'So A has 7 elements from minus 3 to 3.'),
    ]
  ),
  'ia-1-p7': sol(
    'For any two sets $A$ and $B$, prove that $P(A \\cap B) = P(A) \\cap P(B)$.',
    [
      s(1, 'Definition', 'Recall that $X \\in P(S) \\iff X \\subseteq S$.', 'An element belongs to a power set if and only if it is a subset of the original set.'),
      s(2, 'Step 1', 'Let $X$ be any set.\n$$X \\in P(A \\cap B) \\iff X \\subseteq A \\cap B \\iff X \\subseteq A \\text{ and } X \\subseteq B$$', 'X is a subset of A intersection B precisely when X is a subset of both A and B.'),
      s(3, 'Final Answer', '$$\\iff X \\in P(A) \\text{ and } X \\in P(B) \\iff X \\in P(A) \\cap P(B)$$\nHence $P(A \\cap B) = P(A) \\cap P(B)$.', 'Since every equivalence holds both ways, the two power sets are equal.'),
    ]
  ),
  'ia-1-p8': sol(
    'For any three sets $A, B, C$, prove that $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$.',
    [
      s(1, 'Step 1', 'Let $x$ be any element. Then:\n$$x \\in A \\cap (B \\cup C) \\iff x \\in A \\text{ and } x \\in (B \\cup C)$$\n$$\\iff x \\in A \\text{ and } (x \\in B \\text{ or } x \\in C)$$', 'Take an arbitrary element x and expand intersection and union definitions.'),
      s(2, 'Step 2', 'By logical distributivity:\n$$\\iff (x \\in A \\text{ and } x \\in B) \\text{ or } (x \\in A \\text{ and } x \\in C)$$\n$$\\iff x \\in (A \\cap B) \\text{ or } x \\in (A \\cap C)$$', 'Distribute and over or.'),
      s(3, 'Final Answer', '$$\\iff x \\in (A \\cap B) \\cup (A \\cap C)$$\nTherefore, $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$.', 'This completes the proof of the distributive law.'),
    ]
  ),
  'ia-1-p9': sol(
    'Let $A = \\{1, 2, 3, 4, 5, 6\\}$ and $R = \\{(x, y) : y = x + 1\\}$ on $A$. Write $R$ in roster form and find its domain and range.',
    [
      s(1, 'Given', 'For $x \\in A = \\{1, 2, 3, 4, 5, 6\\}$, we need $y = x + 1 \\in A$.', 'Only pairs where both x and x plus 1 are in A belong to R.'),
      s(2, 'Step 1', 'For $x = 1, 2, 3, 4, 5$, we get $y = 2, 3, 4, 5, 6 \\in A$.\nFor $x = 6$, $y = 7 \\notin A$.\n$$R = \\{(1, 2), (2, 3), (3, 4), (4, 5), (5, 6)\\}$$', 'List all valid ordered pairs.'),
      s(3, 'Final Answer', 'Domain of $R = \\{1, 2, 3, 4, 5\\}$.\nRange of $R = \\{2, 3, 4, 5, 6\\}$.', 'First coordinates form the domain and second coordinates form the range.'),
    ]
  ),
  'ia-1-p10': sol(
    'Let $R$ be a relation on $\\mathbb{N} \\times \\mathbb{N}$ defined by $(a, b)\\,R\\,(c, d) \\iff ad = bc$. Prove that $R$ is an equivalence relation.',
    [
      s(1, 'Reflexive', 'For any $(a, b) \\in \\mathbb{N} \\times \\mathbb{N}$, $ab = ba \\implies (a, b)\\,R\\,(a, b)$.\nSo $R$ is reflexive.', 'First verify reflexivity using commutativity of multiplication.'),
      s(2, 'Symmetric', 'Suppose $(a, b)\\,R\\,(c, d)$, so $ad = bc$.\nThen $cb = da \\implies (c, d)\\,R\\,(a, b)$.\nSo $R$ is symmetric.', 'Reversing the equality shows symmetry.'),
      s(3, 'Transitive & Final Answer', 'Suppose $(a, b)\\,R\\,(c, d)$ and $(c, d)\\,R\\,(e, f)$, so $ad = bc$ and $cf = de$.\nMultiplying: $(ad)(cf) = (bc)(de) \\implies af = be$ (since $c, d \\in \\mathbb{N}$, $cd \\neq 0$).\nThus $(a, b)\\,R\\,(e, f)$, so $R$ is transitive.\nHence $R$ is an equivalence relation.', 'Multiplying and cancelling non-zero cd proves transitivity, so R is an equivalence relation.'),
    ]
  ),
  'ia-2-p6': sol(
    'Find the domain of the real-valued function $f(x) = \\sqrt{9 - x^2} + \\frac{1}{x - 1}$.',
    [
      s(1, 'Conditions', 'For $f(x) \\in \\mathbb{R}$, we need $9 - x^2 \\ge 0$ and $x - 1 \\neq 0$.', 'The expression inside the square root must be non-negative and the denominator non-zero.'),
      s(2, 'Step 1', '$9 - x^2 \\ge 0 \\implies x^2 \\le 9 \\implies -3 \\le x \\le 3$.\nAlso $x - 1 \\neq 0 \\implies x \\neq 1$.', 'Solve the inequality and exclude x equals 1.'),
      s(3, 'Final Answer', 'Domain of $f = [-3, 3] - \\{1\\} = [-3, 1) \\cup (1, 3]$.', 'The domain is the closed interval minus 3 to 3 excluding 1.'),
    ]
  ),
  'ia-2-p7': sol(
    'If $f : \\mathbb{R} \\to \\mathbb{R}$ is defined by $f(x) = \\begin{cases} 3x - 2, & x > 3 \\\\ x^2 - 2, & -2 \\le x \\le 2 \\\\ 2x + 1, & x < -3 \\end{cases}$, find $f(4) + f(0) - f(-4)$.',
    [
      s(1, 'Step 1', 'For $x = 4 > 3$: $f(4) = 3(4) - 2 = 10$.\nFor $x = 0 \\in [-2, 2]$: $f(0) = 0^2 - 2 = -2$.\nFor $x = -4 < -3$: $f(-4) = 2(-4) + 1 = -7$.', 'Select the matching branch for each input value.'),
      s(2, 'Final Answer', '$$f(4) + f(0) - f(-4) = 10 + (-2) - (-7) = 8 + 7 = 15$$', 'Combine the three evaluated values to get 15.'),
    ]
  ),
  'ia-2-p8': sol(
    'If $f(x) = 2x$, $g(x) = x^2$, and $h(x) = x + 1$, verify that $(h \\circ (g \\circ f))(x) = ((h \\circ g) \\circ f)(x)$.',
    [
      s(1, 'Step 1 (LHS)', '$$(g \\circ f)(x) = g(f(x)) = g(2x) = (2x)^2 = 4x^2$$\n$$(h \\circ (g \\circ f))(x) = h(4x^2) = 4x^2 + 1$$', 'Compute g of f first, then apply h.'),
      s(2, 'Final Answer (RHS)', '$$(h \\circ g)(x) = h(g(x)) = h(x^2) = x^2 + 1$$\n$$((h \\circ g) \\circ f)(x) = (h \\circ g)(2x) = (2x)^2 + 1 = 4x^2 + 1$$\nThus $\\text{LHS} = \\text{RHS}$, verifying associativity.', 'Both sides simplify to 4x square plus 1.'),
    ]
  ),
  'ia-2-p9': sol(
    'Check whether $f : \\mathbb{R} \\to \\mathbb{R}$ defined by $f(x) = x^3 + 2$ is one-one and onto (bijective).',
    [
      s(1, 'One-One Check', 'Let $f(x_1) = f(x_2)$ for $x_1, x_2 \\in \\mathbb{R}$:\n$$x_1^3 + 2 = x_2^3 + 2 \\implies x_1^3 = x_2^3 \\implies x_1 = x_2$$\nThus $f$ is one-one (injective).', 'Equating outputs yields equal inputs, so f is one-one.'),
      s(2, 'Onto Check & Final Answer', 'For any $y \\in \\mathbb{R}$, set $y = x^3 + 2 \\implies x = (y - 2)^{1/3} \\in \\mathbb{R}$.\nThen $f((y - 2)^{1/3}) = (y - 2) + 2 = y$, so $f$ is onto (surjective).\nTherefore, $f$ is a bijection.', 'Every real y has a real cube-root preimage, so f is both one-one and onto.'),
    ]
  ),
  'ia-2-p10': sol(
    'If $f : [1, \\infty) \\to [2, \\infty)$ is defined by $f(x) = x^2 - 2x + 3$, show that $f$ is a bijection and find $f^{-1}(x)$.',
    [
      s(1, 'Step 1 (Complete the Square)', '$$f(x) = (x^2 - 2x + 1) + 2 = (x - 1)^2 + 2$$', 'Rewrite f(x) in vertex form.'),
      s(2, 'Step 2 (One-One & Onto)', 'For $x_1, x_2 \\in [1, \\infty)$, $f(x_1) = f(x_2) \\implies (x_1 - 1)^2 = (x_2 - 1)^2$. Since $x_1 - 1 \\ge 0$ and $x_2 - 1 \\ge 0$, $x_1 = x_2$ (one-one).\nFor any $y \\in [2, \\infty)$, $x = 1 + \\sqrt{y - 2} \\in [1, \\infty)$ satisfies $f(x) = y$ (onto).', 'Use x >= 1 to take the positive square root cleanly.'),
      s(3, 'Final Answer', 'Therefore $f$ is a bijection and its inverse is:\n$$f^{-1}(x) = 1 + \\sqrt{x - 2}, \\quad x \\in [2, \\infty)$$', 'Interchanging x and y gives f inverse of x equals 1 plus root x minus 2.'),
    ]
  ),
  'ia-3-p6': sol(
    'Find the sum of the first $20$ terms of the arithmetic progression $3, 7, 11, 15, \\dots$',
    [
      s(1, 'Given', 'First term $a = 3$, common difference $d = 7 - 3 = 4$, number of terms $n = 20$.', 'Identify a, d, and n from the given A.P.'),
      s(2, 'Final Answer', '$$S_n = \\frac{n}{2}[2a + (n - 1)d]$$\n$$S_{20} = \\frac{20}{2}[2(3) + (20 - 1)(4)] = 10[6 + 76] = 10(82) = 820$$', 'Substitute into the sum formula to get 820.'),
    ]
  ),
  'ia-3-p7': sol(
    'Insert $5$ arithmetic means between $8$ and $26$, and find their sum.',
    [
      s(1, 'Step 1 (Common Difference)', 'Let the $5$ arithmetic means be $A_1, A_2, A_3, A_4, A_5$.\nThen $8, A_1, A_2, A_3, A_4, A_5, 26$ is an A.P. with $7$ terms.\n$$T_7 = a + 6d = 26 \\implies 8 + 6d = 26 \\implies 6d = 18 \\implies d = 3$$', 'Find the common difference d of the 7-term A.P.'),
      s(2, 'Final Answer', 'The $5$ arithmetic means are:\n$A_1 = 11,\\ A_2 = 14,\\ A_3 = 17,\\ A_4 = 20,\\ A_5 = 23$.\nSum of the $5$ means $= 5 \\times \\frac{8 + 26}{2} = 5 \\times 17 = 85$.', 'List the five means and compute their sum as 85.'),
    ]
  ),
  'ia-3-p8': sol(
    'Find the sum of the infinite geometric series $1 + \\frac{1}{3} + \\frac{1}{9} + \\frac{1}{27} + \\dots$ and express $0.\\overline{45}$ as a rational fraction.',
    [
      s(1, 'Part 1 (Infinite G.P.)', 'Here $a = 1$ and $r = \\frac{1}{3}$ with $|r| < 1$.\n$$S_\\infty = \\frac{a}{1 - r} = \\frac{1}{1 - 1/3} = \\frac{1}{2/3} = \\frac{3}{2}$$', 'Apply the infinite G.P. sum formula a over 1 minus r.'),
      s(2, 'Final Answer (Part 2)', '$$0.\\overline{45} = 0.45 + 0.0045 + 0.000045 + \\dots$$\nHere $a = \\frac{45}{100}$ and $r = \\frac{1}{100}$:\n$$0.\\overline{45} = \\frac{45/100}{1 - 1/100} = \\frac{45}{99} = \\frac{5}{11}$$', 'Express the repeating decimal as an infinite G.P. to get 5 by 11.'),
    ]
  ),
  'ia-3-p9': sol(
    'The sum of three numbers in G.P. is $56$. If we subtract $1, 7, 21$ from these numbers in order, we obtain an A.P. Find the numbers.',
    [
      s(1, 'Step 1', 'Let the three numbers in G.P. be $a, ar, ar^2$.\nGiven: $a(1 + r + r^2) = 56 \\dots (1)$.\nSince $a - 1, ar - 7, ar^2 - 21$ are in A.P.:\n$$2(ar - 7) = (a - 1) + (ar^2 - 21) \\implies a(r^2 - 2r + 1) = 8 \\dots (2)$$', 'Set up the two equations from the G.P. sum and A.P. condition.'),
      s(2, 'Step 2', 'Divide $(1)$ by $(2)$:\n$$\\frac{1 + r + r^2}{r^2 - 2r + 1} = \\frac{56}{8} = 7 \\implies 1 + r + r^2 = 7r^2 - 14r + 7$$\n$$6r^2 - 15r + 6 = 0 \\implies 2r^2 - 5r + 2 = 0 \\implies (2r - 1)(r - 2) = 0$$\nSo $r = 2$ or $r = \\frac{1}{2}$.', 'Solve the quadratic for common ratio r.'),
      s(3, 'Final Answer', 'If $r = 2$: $a(1 + 2 + 4) = 56 \\implies a = 8$, giving numbers $8, 16, 32$.\nIf $r = \\frac{1}{2}$: $a(1 + \\frac{1}{2} + \\frac{1}{4}) = 56 \\implies a = 32$, giving numbers $32, 16, 8$.', 'The three numbers are 8, 16, 32 (or 32, 16, 8).'),
    ]
  ),
  'ia-3-p10': sol(
    'Find the sum to $n$ terms of the series $1 + \\frac{4}{5} + \\frac{7}{5^2} + \\frac{10}{5^3} + \\dots$',
    [
      s(1, 'Step 1 (Identify AGP)', 'Let $S_n = 1 + \\frac{4}{5} + \\frac{7}{5^2} + \\dots + \\frac{3n - 2}{5^{n-1}}$.\nMultiply by $r = \\frac{1}{5}$:\n$$\\frac{1}{5}S_n = \\frac{1}{5} + \\frac{4}{5^2} + \\dots + \\frac{3n - 5}{5^{n-1}} + \\frac{3n - 2}{5^n}$$', 'Write S_n and (1/5)S_n shifted by one term.'),
      s(2, 'Step 2 (Subtract)', '$$\\frac{4}{5}S_n = 1 + 3\\left(\\frac{1}{5} + \\frac{1}{5^2} + \\dots + \\frac{1}{5^{n-1}}\\right) - \\frac{3n - 2}{5^n}$$\n$$\\frac{4}{5}S_n = 1 + 3 \\cdot \\frac{\\frac{1}{5}\\left(1 - \\frac{1}{5^{n-1}}\\right)}{1 - \\frac{1}{5}} - \\frac{3n - 2}{5^n} = 1 + \\frac{3}{4}\\left(1 - \\frac{1}{5^{n-1}}\\right) - \\frac{3n - 2}{5^n}$$', 'Subtract to isolate a finite geometric series.'),
      s(3, 'Final Answer', '$$\\frac{4}{5}S_n = \\frac{7}{4} - \\frac{15 + 12n - 8}{4 \\cdot 5^n} = \\frac{7}{4} - \\frac{12n + 7}{4 \\cdot 5^n}$$\n$$S_n = \\frac{35}{16} - \\frac{12n + 7}{16 \\cdot 5^{n-1}}$$', 'Multiply by 5/4 to obtain the closed-form sum.'),
    ]
  ),
  'ia-4-p6': sol(
    'Prove by mathematical induction that $1^3 + 2^3 + 3^3 + \\dots + n^3 = \\frac{n^2(n + 1)^2}{4}$ for all $n \\in \\mathbb{N}$.',
    [
      s(1, 'Base Case (n = 1)', 'For $n = 1$: $\\text{LHS} = 1^3 = 1$, $\\text{RHS} = \\frac{1^2(2)^2}{4} = 1$. So $P(1)$ is true.', 'Verify the base case n equals 1.'),
      s(2, 'Inductive Hypothesis', 'Assume $P(k)$ is true for some $k \\in \\mathbb{N}$:\n$$1^3 + 2^3 + \\dots + k^3 = \\frac{k^2(k + 1)^2}{4}$$', 'Assume the formula holds for k.'),
      s(3, 'Inductive Step & Final Answer', 'Add $(k + 1)^3$ to both sides:\n$$\\text{LHS} = \\frac{k^2(k + 1)^2}{4} + (k + 1)^3 = \\frac{(k + 1)^2}{4}[k^2 + 4k + 4] = \\frac{(k + 1)^2(k + 2)^2}{4}$$\nHence $P(k + 1)$ is true. By mathematical induction, $P(n)$ holds for all $n \\in \\mathbb{N}$.', 'Factor out (k+1)^2/4 to complete the induction.'),
    ]
  ),
  'ia-4-p7': sol(
    'Using mathematical induction, prove that $1 + (1 + 2) + (1 + 2 + 3) + \\dots$ to $n$ terms $= \\frac{n(n + 1)(n + 2)}{6}$.',
    [
      s(1, 'Base Case & General Term', 'The $k^{\\text{th}}$ term is $t_k = 1 + 2 + \\dots + k = \\frac{k(k + 1)}{2}$.\nFor $n = 1$: $\\text{LHS} = 1$, $\\text{RHS} = \\frac{1 \\cdot 2 \\cdot 3}{6} = 1$.', 'Note the kth term and verify n equals 1.'),
      s(2, 'Inductive Step & Final Answer', 'Assume true for $k$: $S_k = \\frac{k(k + 1)(k + 2)}{6}$.\nFor $k + 1$:\n$$S_{k+1} = \\frac{k(k + 1)(k + 2)}{6} + \\frac{(k + 1)(k + 2)}{2} = \\frac{(k + 1)(k + 2)}{6}[k + 3]$$\n$$= \\frac{(k + 1)(k + 2)(k + 3)}{6}$$\nBy induction, the formula holds for all $n \\in \\mathbb{N}$.', 'Add the (k+1)th term and factor out (k+1)(k+2)/6.'),
    ]
  ),
  'ia-4-p8': sol(
    'Verify $P(n) : 1 \\cdot 2 + 2 \\cdot 3 + \\dots + n(n + 1) = \\frac{n(n + 1)(n + 2)}{3}$ for $n = 1$ and $n = 2$.',
    [
      s(1, 'Check n = 1', 'For $n = 1$:\n$$\\text{LHS} = 1 \\cdot 2 = 2, \\quad \\text{RHS} = \\frac{1(2)(3)}{3} = 2$$\nSo $P(1)$ is true.', 'Verify both sides for n equals 1.'),
      s(2, 'Check n = 2 & Final Answer', 'For $n = 2$:\n$$\\text{LHS} = 1 \\cdot 2 + 2 \\cdot 3 = 2 + 6 = 8, \\quad \\text{RHS} = \\frac{2(3)(4)}{3} = 8$$\nHence $P(n)$ is verified for both $n = 1$ and $n = 2$.', 'Verify both sides equal 8 for n equals 2.'),
    ]
  ),
  'ia-4-p9': sol(
    'Prove by mathematical induction that $1 \\cdot 2 \\cdot 3 + 2 \\cdot 3 \\cdot 4 + \\dots + n(n + 1)(n + 2) = \\frac{n(n + 1)(n + 2)(n + 3)}{4}$ for all $n \\in \\mathbb{N}$.',
    [
      s(1, 'Base Case (n = 1)', 'For $n = 1$: $\\text{LHS} = 1 \\cdot 2 \\cdot 3 = 6$, $\\text{RHS} = \\frac{1 \\cdot 2 \\cdot 3 \\cdot 4}{4} = 6$. True.', 'Check the base case n equals 1.'),
      s(2, 'Inductive Step & Final Answer', 'Assume true for $k$: $S_k = \\frac{k(k + 1)(k + 2)(k + 3)}{4}$.\nFor $k + 1$:\n$$S_{k+1} = \\frac{k(k + 1)(k + 2)(k + 3)}{4} + (k + 1)(k + 2)(k + 3)$$\n$$= \\frac{(k + 1)(k + 2)(k + 3)}{4}(k + 4)$$\nBy mathematical induction, the result holds for all $n \\in \\mathbb{N}$.', 'Factor out (k+1)(k+2)(k+3)/4 to obtain the formula for k plus 1.'),
    ]
  ),
  'ia-4-p10': sol(
    'Prove by mathematical induction that $5^{2n} - 1$ is divisible by $24$ for all $n \\in \\mathbb{N}$.',
    [
      s(1, 'Base Case (n = 1)', 'For $n = 1$: $5^2 - 1 = 24$, which is divisible by $24$.', 'Verify n equals 1.'),
      s(2, 'Inductive Hypothesis', 'Assume $5^{2k} - 1 = 24m$ for some integer $m \\ge 1$, so $5^{2k} = 24m + 1$.', 'Assume 5 power 2k minus 1 is a multiple of 24.'),
      s(3, 'Inductive Step & Final Answer', 'For $n = k + 1$:\n$$5^{2(k+1)} - 1 = 25 \\cdot 5^{2k} - 1 = 25(24m + 1) - 1 = 24(25m) + 24 = 24(25m + 1)$$\nThis is clearly divisible by $24$. By mathematical induction, $5^{2n} - 1$ is divisible by $24$ for all $n \\in \\mathbb{N}$.', 'Substitute 5 power 2k and factor out 24.'),
    ]
  ),
  'ia-5-p6': sol(
    'Express $A = \\begin{pmatrix} 2 & 3 \\\\ 5 & 4 \\end{pmatrix}$ as the sum of a symmetric matrix and a skew-symmetric matrix.',
    [
      s(1, 'Formula', 'Any square matrix $A = P + Q$, where $P = \\frac{1}{2}(A + A^T)$ is symmetric and $Q = \\frac{1}{2}(A - A^T)$ is skew-symmetric.', 'Use the standard symmetric and skew-symmetric decomposition.'),
      s(2, 'Step 1', '$A^T = \\begin{pmatrix} 2 & 5 \\\\ 3 & 4 \\end{pmatrix}$\n$$P = \\frac{1}{2}\\begin{pmatrix} 4 & 8 \\\\ 8 & 8 \\end{pmatrix} = \\begin{pmatrix} 2 & 4 \\\\ 4 & 4 \\end{pmatrix}, \\quad Q = \\frac{1}{2}\\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$$', 'Compute P and Q.'),
      s(3, 'Final Answer', '$$A = \\begin{pmatrix} 2 & 4 \\\\ 4 & 4 \\end{pmatrix} + \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$$', 'Verify that P is symmetric, Q is skew-symmetric, and P plus Q equals A.'),
    ]
  ),
  'ia-5-p7': sol(
    'If $A = \\begin{pmatrix} 1 & -2 & 3 \\\\ -4 & 2 & 5 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 3 \\\\ 4 & 5 \\\\ 2 & 1 \\end{pmatrix}$, find $AB$ and $BA$.',
    [
      s(1, 'Step 1 (Compute AB)', '$A$ is $2 \\times 3$ and $B$ is $3 \\times 2$, so $AB$ is $2 \\times 2$:\n$$AB = \\begin{pmatrix} 1(2) - 2(4) + 3(2) & 1(3) - 2(5) + 3(1) \\\\ -4(2) + 2(4) + 5(2) & -4(3) + 2(5) + 5(1) \\end{pmatrix} = \\begin{pmatrix} 0 & -4 \\\\ 10 & 3 \\end{pmatrix}$$', 'Multiply rows of A by columns of B.'),
      s(2, 'Final Answer (Compute BA)', '$BA$ is $3 \\times 3$:\n$$BA = \\begin{pmatrix} 2 - 12 & -4 + 6 & 6 + 15 \\\\ 4 - 20 & -8 + 10 & 12 + 25 \\\\ 2 - 4 & -4 + 2 & 6 + 5 \\end{pmatrix} = \\begin{pmatrix} -10 & 2 & 21 \\\\ -16 & 2 & 37 \\\\ -2 & -2 & 11 \\end{pmatrix}$$', 'Multiply rows of B by columns of A to get the 3 by 3 product.'),
    ]
  ),
  'ia-5-p8': sol(
    'Evaluate the determinant $\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 3 & 4 \\\\ 3 & 5 & 7 \\end{vmatrix}$ without expanding directly.',
    [
      s(1, 'Step 1 (Row Operation)', 'Observe that row $3$ equals the sum of row $1$ and row $2$ ($1+2=3,\\; 2+3=5,\\; 3+4=7$). Apply $R_3 \\to R_3 - (R_1 + R_2)$:\n$$\\Delta = \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 3 & 4 \\\\ 3-(1+2) & 5-(2+3) & 7-(3+4) \\end{vmatrix}$$', 'Observe that row 3 equals row 1 plus row 2, so subtract R1 and R2 from R3.'),
      s(2, 'Final Answer', 'Apply $R_3 \\to R_3 - R_1 - R_2$:\n$$\\Delta = \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 3 & 4 \\\\ 3-1-2 & 5-2-3 & 7-3-4 \\end{vmatrix} = \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 3 & 4 \\\\ 0 & 0 & 0 \\end{vmatrix} = 0$$', 'Row 3 becomes all zeros, so the determinant is 0.'),
    ]
  ),
  'ia-5-p9': sol(
    'Show that $\\begin{vmatrix} a + b + 2c & a & b \\\\ c & b + c + 2a & b \\\\ c & a & c + a + 2b \\end{vmatrix} = 2(a + b + c)^3$.',
    [
      s(1, 'Step 1', 'Apply $C_1 \\to C_1 + C_2 + C_3$. Every entry in $C_1$ becomes $2(a + b + c)$. Take $2(a + b + c)$ common:\n$$\\Delta = 2(a + b + c)\\begin{vmatrix} 1 & a & b \\\\ 1 & b + c + 2a & b \\\\ 1 & a & c + a + 2b \\end{vmatrix}$$', 'Add columns 2 and 3 to column 1 and factor out 2(a+b+c).'),
      s(2, 'Final Answer', 'Apply $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$:\n$$\\Delta = 2(a + b + c)\\begin{vmatrix} 1 & a & b \\\\ 0 & a + b + c & 0 \\\\ 0 & 0 & a + b + c \\end{vmatrix} = 2(a + b + c)(a + b + c)^2 = 2(a + b + c)^3$$', 'Subtract R1 from R2 and R3 to make an upper-triangular determinant.'),
    ]
  ),
  'ia-5-p10': sol(
    'Solve the system $2x - y + 3z = 9$, $x + y + z = 6$, $x - y + z = 2$ by matrix inversion method.',
    [
      s(1, 'Step 1 (Matrix Equation)', 'Write $AX = B$ where $A = \\begin{pmatrix} 2 & -1 & 3 \\\\ 1 & 1 & 1 \\\\ 1 & -1 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 9 \\\\ 6 \\\\ 2 \\end{pmatrix}$.\n$$|A| = 2(1 + 1) - (-1)(1 - 1) + 3(-1 - 1) = 4 - 6 = -2 \\neq 0$$', 'Compute determinant of A equals minus 2.'),
      s(2, 'Step 2 (Adjoint & Inverse)', 'Cofactor matrix $C = \\begin{pmatrix} 2 & 0 & -2 \\\\ -2 & -1 & 1 \\\\ -4 & 1 & 3 \\end{pmatrix}$, so $\\operatorname{Adj}(A) = C^T = \\begin{pmatrix} 2 & -2 & -4 \\\\ 0 & -1 & 1 \\\\ -2 & 1 & 3 \\end{pmatrix}$.\n$$A^{-1} = \\frac{1}{|A|}\\operatorname{Adj}(A) = -\\frac{1}{2}\\begin{pmatrix} 2 & -2 & -4 \\\\ 0 & -1 & 1 \\\\ -2 & 1 & 3 \\end{pmatrix}$$', 'Find cofactors and transpose to get the adjoint and inverse.'),
      s(3, 'Final Answer', '$$X = A^{-1}B = -\\frac{1}{2}\\begin{pmatrix} 18 - 12 - 8 \\\\ 0 - 6 + 2 \\\\ -18 + 6 + 6 \\end{pmatrix} = -\\frac{1}{2}\\begin{pmatrix} -2 \\\\ -4 \\\\ -6 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$$\nSolution: $x = 1,\\ y = 2,\\ z = 3$.', 'Multiply A inverse by B to get x=1, y=2, z=3.'),
    ]
  ),
  'ia-6-p6': sol(
    'Find the position vector of the point dividing the line joining $2\\hat{i} + \\hat{j} - \\hat{k}$ and $4\\hat{i} - 3\\hat{j} + 2\\hat{k}$ internally in the ratio $2 : 1$.',
    [
      s(1, 'Formula', 'Internal section formula in ratio $m : n$ is $\\vec{r} = \\frac{m\\vec{b} + n\\vec{a}}{m + n}$.', 'Recall the internal section formula for position vectors.'),
      s(2, 'Final Answer', 'With $\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}$, $\\vec{b} = 4\\hat{i} - 3\\hat{j} + 2\\hat{k}$, $m = 2, n = 1$:\n$$\\vec{r} = \\frac{2(4\\hat{i} - 3\\hat{j} + 2\\hat{k}) + 1(2\\hat{i} + \\hat{j} - \\hat{k})}{2 + 1} = \\frac{10\\hat{i} - 5\\hat{j} + 3\\hat{k}}{3}$$', 'Substitute m=2, n=1 and simplify.'),
    ]
  ),
  'ia-6-p7': sol(
    'Show that the points with position vectors $\\hat{i} - 2\\hat{j} + 3\\hat{k}$, $2\\hat{i} + 3\\hat{j} - 4\\hat{k}$, and $-7\\hat{j} + 10\\hat{k}$ are collinear.',
    [
      s(1, 'Step 1', 'Let $A, B, C$ be the given points.\n$$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = (2 - 1)\\hat{i} + (3 + 2)\\hat{j} + (-4 - 3)\\hat{k} = \\hat{i} + 5\\hat{j} - 7\\hat{k}$$\n$$\\overrightarrow{BC} = \\overrightarrow{OC} - \\overrightarrow{OB} = (0 - 2)\\hat{i} + (-7 - 3)\\hat{j} + (10 + 4)\\hat{k} = -2\\hat{i} - 10\\hat{j} + 14\\hat{k}$$', 'Compute vectors AB and BC.'),
      s(2, 'Final Answer', 'Observe that $\\overrightarrow{BC} = -2(\\hat{i} + 5\\hat{j} - 7\\hat{k}) = -2\\overrightarrow{AB}$.\nSince $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ are parallel with $B$ as a common point, $A, B, C$ are collinear.', 'Since BC is a scalar multiple of AB, the three points are collinear.'),
    ]
  ),
  'ia-6-p8': sol(
    'Let $\\vec{a}, \\vec{b}, \\vec{c}$ be non-coplanar vectors. Show that $\\vec{a} - 2\\vec{b} + 3\\vec{c}$, $-2\\vec{a} + 3\\vec{b} - 4\\vec{c}$, and $\\vec{a} - 3\\vec{b} + 5\\vec{c}$ are coplanar.',
    [
      s(1, 'Criterion', 'Three vectors expressed in terms of non-coplanar $\\vec{a}, \\vec{b}, \\vec{c}$ are coplanar if the determinant of their coefficients is $0$.', 'Check the determinant of the coefficient matrix.'),
      s(2, 'Final Answer', '$$\\begin{vmatrix} 1 & -2 & 3 \\\\ -2 & 3 & -4 \\\\ 1 & -3 & 5 \\end{vmatrix} = 1(15 - 12) + 2(-10 + 4) + 3(6 - 3) = 3 - 12 + 9 = 0$$\nHence the three given vectors are coplanar.', 'The determinant evaluates to 0, proving coplanarity.'),
    ]
  ),
  'ia-6-p9': sol(
    'Prove by vector method that the line segments joining the midpoints of the opposite sides of a quadrilateral bisect each other.',
    [
      s(1, 'Step 1', 'Let $ABCD$ be a quadrilateral with vertices having position vectors $\\vec{a}, \\vec{b}, \\vec{c}, \\vec{d}$.\nMidpoints of $AB, BC, CD, DA$ are:\n$P = \\frac{\\vec{a} + \\vec{b}}{2},\\ Q = \\frac{\\vec{b} + \\vec{c}}{2},\\ R = \\frac{\\vec{c} + \\vec{d}}{2},\\ S = \\frac{\\vec{d} + \\vec{a}}{2}$.', 'Write position vectors of the four midpoints P, Q, R, S.'),
      s(2, 'Final Answer', 'Midpoint of $PR$ has position vector $\\frac{1}{2}\\left(\\frac{\\vec{a}+\\vec{b}}{2} + \\frac{\\vec{c}+\\vec{d}}{2}\\right) = \\frac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4}$.\nMidpoint of $QS$ has position vector $\\frac{1}{2}\\left(\\frac{\\vec{b}+\\vec{c}}{2} + \\frac{\\vec{d}+\\vec{a}}{2}\\right) = \\frac{\\vec{a} + \\vec{b} + \\vec{c} + \\vec{d}}{4}$.\nSince both midpoints coincide, $PR$ and $QS$ bisect each other.', 'Both segments share the exact same midpoint.'),
    ]
  ),
  'ia-6-p10': sol(
    'Find the vector equation of the line passing through the points $2\\hat{i} + \\hat{j} + 3\\hat{k}$ and $-4\\hat{i} + 3\\hat{j} - \\hat{k}$.',
    [
      s(1, 'Formula', 'Vector equation of the line through $\\vec{a}$ and $\\vec{b}$ is $\\vec{r} = \\vec{a} + t(\\vec{b} - \\vec{a})$, $t \\in \\mathbb{R}$.', 'Use the two-point vector equation of a line.'),
      s(2, 'Final Answer', '$\\vec{b} - \\vec{a} = (-4 - 2)\\hat{i} + (3 - 1)\\hat{j} + (-1 - 3)\\hat{k} = -6\\hat{i} + 2\\hat{j} - 4\\hat{k}$.\nHence:\n$$\\vec{r} = (2\\hat{i} + \\hat{j} + 3\\hat{k}) + t(-6\\hat{i} + 2\\hat{j} - 4\\hat{k}), \\quad t \\in \\mathbb{R}$$', 'Compute b minus a and write the parametric vector equation.'),
    ]
  ),
  'ia-7-p6': sol(
    'Find $\\lambda$ if the vectors $\\vec{a} = 2\\hat{i} + \\lambda\\hat{j} + \\hat{k}$ and $\\vec{b} = \\hat{i} - 2\\hat{j} + 3\\hat{k}$ are perpendicular.',
    [
      s(1, 'Condition', 'Two non-zero vectors are perpendicular iff $\\vec{a} \\cdot \\vec{b} = 0$.', 'Set the dot product equal to zero.'),
      s(2, 'Final Answer', '$$2(1) + \\lambda(-2) + 1(3) = 0 \\implies 5 - 2\\lambda = 0 \\implies \\lambda = \\frac{5}{2}$$', 'Solve 5 minus 2 lambda equals 0 to get lambda equals 5 by 2.'),
    ]
  ),
  'ia-7-p7': sol(
    'Find the scalar and vector projections of $\\vec{a} = 2\\hat{i} + 3\\hat{j} + 2\\hat{k}$ on $\\vec{b} = \\hat{i} + 2\\hat{j} + \\hat{k}$.',
    [
      s(1, 'Formula', 'Scalar projection $= \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$; Vector projection $= \\left(\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}$.', 'Write both projection formulas.'),
      s(2, 'Step 1', '$\\vec{a} \\cdot \\vec{b} = 2(1) + 3(2) + 2(1) = 10$, and $|\\vec{b}| = \\sqrt{1^2 + 2^2 + 1^2} = \\sqrt{6}$.', 'Compute the dot product and magnitude of b.'),
      s(3, 'Final Answer', 'Scalar projection $= \\frac{10}{\\sqrt{6}}$.\nVector projection $= \\frac{10}{6}(\\hat{i} + 2\\hat{j} + \\hat{k}) = \\frac{5}{3}(\\hat{i} + 2\\hat{j} + \\hat{k})$.', 'Substitute into both formulas to get the scalar and vector projections.'),
    ]
  ),
  'ia-7-p8': sol(
    'Find the area of the triangle having vertices $A(1, 2, 3)$, $B(2, 3, 1)$, and $C(3, 1, 2)$.',
    [
      s(1, 'Step 1', '$$\\overrightarrow{AB} = \\hat{i} + \\hat{j} - 2\\hat{k}, \\quad \\overrightarrow{AC} = 2\\hat{i} - \\hat{j} - \\hat{k}$$', 'Form two adjacent side vectors from vertex A.'),
      s(2, 'Step 2', '$$\\overrightarrow{AB} \\times \\overrightarrow{AC} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 1 & -2 \\\\ 2 & -1 & -1 \\end{vmatrix} = (-1 - 2)\\hat{i} - (-1 + 4)\\hat{j} + (-1 - 2)\\hat{k} = -3\\hat{i} - 3\\hat{j} - 3\\hat{k}$$', 'Evaluate the cross product.'),
      s(3, 'Final Answer', '$$\\text{Area} = \\frac{1}{2}|\\overrightarrow{AB} \\times \\overrightarrow{AC}| = \\frac{1}{2}\\sqrt{9 + 9 + 9} = \\frac{3\\sqrt{3}}{2}\\text{ sq. units}$$', 'Half the magnitude of the cross product gives 3 root 3 by 2.'),
    ]
  ),
  'ia-7-p9': sol(
    'Find the volume of the parallelepiped whose coterminous edges are $\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}$, $\\vec{b} = \\hat{i} - \\hat{j} + \\hat{k}$, and $\\vec{c} = \\hat{i} + 2\\hat{j} - \\hat{k}$.',
    [
      s(1, 'Formula', 'Volume $V = |[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|$.', 'The volume equals the absolute value of the scalar triple product.'),
      s(2, 'Final Answer', '$$[\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 1(1 - 2) - 1(-1 - 1) + 1(2 + 1) = -1 + 2 + 3 = 4$$\nVolume $= 4\\text{ cubic units}$.', 'Evaluate the 3 by 3 determinant to get 4 cubic units.'),
    ]
  ),
  'ia-7-p10': sol(
    'If $\\vec{a} = \\hat{i} - 2\\hat{j} + 3\\hat{k}$, $\\vec{b} = 2\\hat{i} + \\hat{j} - \\hat{k}$, and $\\vec{c} = \\hat{j} + \\hat{k}$, find $(\\vec{a} \\times \\vec{b}) \\times \\vec{c}$.',
    [
      s(1, 'Formula', 'Use the vector triple product identity:\n$$(\\vec{a} \\times \\vec{b}) \\times \\vec{c} = (\\vec{a} \\cdot \\vec{c})\\vec{b} - (\\vec{b} \\cdot \\vec{c})\\vec{a}$$', 'Apply the BAC-CAB expansion.'),
      s(2, 'Final Answer', '$\\vec{a} \\cdot \\vec{c} = 1(0) - 2(1) + 3(1) = 1$, and $\\vec{b} \\cdot \\vec{c} = 2(0) + 1(1) - 1(1) = 0$.\n$$(\\vec{a} \\times \\vec{b}) \\times \\vec{c} = 1\\vec{b} - 0\\vec{a} = 2\\hat{i} + \\hat{j} - \\hat{k}$$', 'Compute the dot products to get 2i plus j minus k.'),
    ]
  ),
  'ia-8-p6': sol(
    'Find the maximum and minimum values of $3\\cos x + 4\\sin x + 5$.',
    [
      s(1, 'Formula', 'For $a\\cos x + b\\sin x + c$, range is $[c - \\sqrt{a^2 + b^2},\\ c + \\sqrt{a^2 + b^2}]$.', 'Use the amplitude formula root(a^2 + b^2).'),
      s(2, 'Final Answer', '$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5$.\nMaximum value $= 5 + 5 = 10$.\nMinimum value $= 5 - 5 = 0$.', 'Adding and subtracting amplitude 5 from 5 gives max 10 and min 0.'),
    ]
  ),
  'ia-8-p7': sol(
    'Prove that $\\cos 20^\\circ \\cos 40^\\circ \\cos 60^\\circ \\cos 80^\\circ = \\frac{1}{16}$.',
    [
      s(1, 'Step 1', 'Put $\\cos 60^\\circ = \\frac{1}{2}$:\n$$\\text{LHS} = \\frac{1}{2}\\cos 20^\\circ \\cdot \\frac{1}{2}(2\\cos 40^\\circ \\cos 80^\\circ) = \\frac{1}{4}\\cos 20^\\circ(\\cos 120^\\circ + \\cos 40^\\circ)$$', 'Substitute cos 60 equals 1/2 and apply 2 cos A cos B.'),
      s(2, 'Final Answer', 'Since $\\cos 120^\\circ = -\\frac{1}{2}$:\n$$\\text{LHS} = -\\frac{1}{8}\\cos 20^\\circ + \\frac{1}{8}(2\\cos 40^\\circ \\cos 20^\\circ) = -\\frac{1}{8}\\cos 20^\\circ + \\frac{1}{8}(\\cos 60^\\circ + \\cos 20^\\circ) = \\frac{1}{8}\\left(\\frac{1}{2}\\right) = \\frac{1}{16}$$', 'Apply 2 cos A cos B once more; cos 20 cancels leaving 1 by 16.'),
    ]
  ),
  'ia-8-p8': sol(
    'Find the exact value of $\\sin 18^\\circ$ and hence deduce $\\cos 36^\\circ$.',
    [
      s(1, 'Step 1', 'Let $\\theta = 18^\\circ$. Then $5\\theta = 90^\\circ \\implies 2\\theta = 90^\\circ - 3\\theta$.\nTaking sine: $\\sin 2\\theta = \\cos 3\\theta \\implies 2\\sin\\theta\\cos\\theta = 4\\cos^3\\theta - 3\\cos\\theta$.\nDividing by $\\cos\\theta \\neq 0$:\n$$2\\sin\\theta = 4(1 - \\sin^2\\theta) - 3 \\implies 4\\sin^2\\theta + 2\\sin\\theta - 1 = 0$$', 'Use 2 theta equals 90 minus 3 theta to form a quadratic in sin theta.'),
      s(2, 'Step 2', '$$\\sin 18^\\circ = \\frac{-2 + \\sqrt{4 + 16}}{8} = \\frac{\\sqrt{5} - 1}{4} \\quad (\\text{since } \\sin 18^\\circ > 0)$$', 'Keep the positive root since 18 degrees lies in the first quadrant.'),
      s(3, 'Final Answer', '$$\\cos 36^\\circ = 1 - 2\\sin^2 18^\\circ = 1 - 2\\left(\\frac{6 - 2\\sqrt{5}}{16}\\right) = \\frac{8 - 6 + 2\\sqrt{5}}{8} = \\frac{\\sqrt{5} + 1}{4}$$', 'Use cos 2 theta equals 1 minus 2 sin square theta to deduce cos 36 degrees.'),
    ]
  ),
  'ia-8-p9': sol(
    'Prove that $\\tan A \\tan(60^\\circ - A) \\tan(60^\\circ + A) = \\tan 3A$, and deduce $\\tan 20^\\circ \\tan 40^\\circ \\tan 80^\\circ = \\sqrt{3}$.',
    [
      s(1, 'Step 1', '$$\\tan(60^\\circ - A)\\tan(60^\\circ + A) = \\frac{\\sqrt{3} - \\tan A}{1 + \\sqrt{3}\\tan A} \\cdot \\frac{\\sqrt{3} + \\tan A}{1 - \\sqrt{3}\\tan A} = \\frac{3 - \\tan^2 A}{1 - 3\\tan^2 A}$$', 'Expand tan(60 - A) and tan(60 + A) using tan 60 equals root 3.'),
      s(2, 'Final Answer', 'Multiply by $\\tan A$:\n$$\\text{LHS} = \\frac{3\\tan A - \\tan^3 A}{1 - 3\\tan^2 A} = \\tan 3A$$\nPutting $A = 20^\\circ$:\n$$\\tan 20^\\circ \\tan 40^\\circ \\tan 80^\\circ = \\tan 60^\\circ = \\sqrt{3}$$', 'Recognize the tan 3A formula and substitute A equals 20 degrees.'),
    ]
  ),
  'ia-8-p10': sol(
    'If $A + B + C = \\pi$, prove that $\\cos A + \\cos B + \\cos C = 1 + 4\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$.',
    [
      s(1, 'Step 1', '$$\\text{LHS} = (\\cos A + \\cos B) + \\cos C = 2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2} + 1 - 2\\sin^2\\frac{C}{2}$$', 'Apply sum-to-product on cos A plus cos B and half-angle on cos C.'),
      s(2, 'Final Answer', 'Since $\\frac{A + B}{2} = \\frac{\\pi}{2} - \\frac{C}{2}$, $\\cos\\frac{A+B}{2} = \\sin\\frac{C}{2}$:\n$$\\text{LHS} = 1 + 2\\sin\\frac{C}{2}\\left(\\cos\\frac{A-B}{2} - \\cos\\frac{A+B}{2}\\right) = 1 + 4\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$$', 'Factor out 2 sin(C/2) and apply cos(X-Y) minus cos(X+Y).'),
    ]
  ),
  'ia-9-p6': sol(
    'Find the general solution of $\\sin 3x = \\frac{1}{2}$.',
    [
      s(1, 'Formula', 'If $\\sin\\theta = \\sin\\alpha$, then $\\theta = n\\pi + (-1)^n\\alpha$, $n \\in \\mathbb{Z}$.', 'Recall the general solution of sin theta equals sin alpha.'),
      s(2, 'Final Answer', '$$\\sin 3x = \\sin\\frac{\\pi}{6} \\implies 3x = n\\pi + (-1)^n\\frac{\\pi}{6}$$\n$$x = \\frac{n\\pi}{3} + (-1)^n\\frac{\\pi}{18}, \\quad n \\in \\mathbb{Z}$$', 'Divide by 3 to obtain the general solution for x.'),
    ]
  ),
  'ia-9-p7': sol(
    'Solve $\\sec^2\\theta = 1 - \\tan\\theta$ for $\\theta$.',
    [
      s(1, 'Step 1', 'Use $\\sec^2\\theta = 1 + \\tan^2\\theta$:\n$$1 + \\tan^2\\theta = 1 - \\tan\\theta \\implies \\tan\\theta(\\tan\\theta + 1) = 0$$', 'Convert sec square to 1 plus tan square and factor.'),
      s(2, 'Final Answer', 'Either $\\tan\\theta = 0 \\implies \\theta = n\\pi$, or $\\tan\\theta = -1 = \\tan\\left(-\\frac{\\pi}{4}\\right) \\implies \\theta = n\\pi - \\frac{\\pi}{4}$, $n \\in \\mathbb{Z}$.', 'Write both branches of general solutions.'),
    ]
  ),
  'ia-9-p8': sol(
    'Solve $\\tan\\theta + \\tan 2\\theta + \\sqrt{3}\\tan\\theta\\tan 2\\theta = \\sqrt{3}$.',
    [
      s(1, 'Step 1', 'Rearrange terms:\n$$\\tan\\theta + \\tan 2\\theta = \\sqrt{3}(1 - \\tan\\theta\\tan 2\\theta)$$\n$$\\frac{\\tan\\theta + \\tan 2\\theta}{1 - \\tan\\theta\\tan 2\\theta} = \\sqrt{3} \\implies \\tan 3\\theta = \\sqrt{3}$$', 'Group terms to recognize the tan(theta + 2 theta) identity.'),
      s(2, 'Final Answer', '$$\\tan 3\\theta = \\tan\\frac{\\pi}{3} \\implies 3\\theta = n\\pi + \\frac{\\pi}{3} \\implies \\theta = \\frac{n\\pi}{3} + \\frac{\\pi}{9}, \\quad n \\in \\mathbb{Z}$$', 'Note that 3 theta equals n pi plus pi by 3 avoids undefined tan theta or tan 2 theta.'),
    ]
  ),
  'ia-9-p9': sol(
    'Solve $\\sin\\theta + \\sin 3\\theta + \\sin 5\\theta = 0$.',
    [
      s(1, 'Step 1', 'Group $\\sin 5\\theta + \\sin\\theta$:\n$$(\\sin 5\\theta + \\sin\\theta) + \\sin 3\\theta = 2\\sin 3\\theta\\cos 2\\theta + \\sin 3\\theta = \\sin 3\\theta(2\\cos 2\\theta + 1) = 0$$', 'Apply sum-to-product on sin 5 theta plus sin theta and factor sin 3 theta.'),
      s(2, 'Final Answer', 'Case 1: $\\sin 3\\theta = 0 \\implies \\theta = \\frac{n\\pi}{3}$, $n \\in \\mathbb{Z}$.\nCase 2: $\\cos 2\\theta = -\\frac{1}{2} = \\cos\\frac{2\\pi}{3} \\implies 2\\theta = 2n\\pi \\pm \\frac{2\\pi}{3} \\implies \\theta = n\\pi \\pm \\frac{\\pi}{3}$, $n \\in \\mathbb{Z}$.', 'Both families combine into general solutions for theta.'),
    ]
  ),
  'ia-9-p10': sol(
    'Solve $\\cos 3\\theta - \\cos\\theta = \\sin 2\\theta$.',
    [
      s(1, 'Step 1', 'Apply $\\cos C - \\cos D = -2\\sin\\frac{C+D}{2}\\sin\\frac{C-D}{2}$:\n$$-2\\sin 2\\theta\\sin\\theta = \\sin 2\\theta \\implies \\sin 2\\theta(2\\sin\\theta + 1) = 0$$', 'Convert cos 3 theta minus cos theta and factor out sin 2 theta.'),
      s(2, 'Final Answer', 'Case 1: $\\sin 2\\theta = 0 \\implies 2\\theta = n\\pi \\implies \\theta = \\frac{n\\pi}{2}$, $n \\in \\mathbb{Z}$.\nCase 2: $\\sin\\theta = -\\frac{1}{2} = \\sin\\left(-\\frac{\\pi}{6}\\right) \\implies \\theta = n\\pi + (-1)^{n+1}\\frac{\\pi}{6}$, $n \\in \\mathbb{Z}$.', 'Solve both factors for all integer n.'),
    ]
  ),
  'ia-10-p6': sol(
    'Evaluate $\\cos\\left(\\tan^{-1}\\left(\\frac{3}{4}\\right)\\right)$.',
    [
      s(1, 'Step 1', 'Let $\\theta = \\tan^{-1}\\left(\\frac{3}{4}\\right) \\in \\left(0, \\frac{\\pi}{2}\\right)$, so $\\tan\\theta = \\frac{3}{4}$.\nIn a right triangle with opposite $= 3$, adjacent $= 4$, hypotenuse $= \\sqrt{3^2 + 4^2} = 5$.', 'Use a 3-4-5 right triangle for the acute angle theta.'),
      s(2, 'Final Answer', '$$\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{4}{5}$$', 'Thus cos of tan inverse 3 by 4 equals 4 by 5.'),
    ]
  ),
  'ia-10-p7': sol(
    'Prove that $\\tan^{-1}\\left(\\frac{1}{2}\\right) + \\tan^{-1}\\left(\\frac{1}{5}\\right) + \\tan^{-1}\\left(\\frac{1}{8}\\right) = \\frac{\\pi}{4}$.',
    [
      s(1, 'Step 1', 'Combine the first two terms (since $\\frac{1}{2} \\cdot \\frac{1}{5} = \\frac{1}{10} < 1$):\n$$\\tan^{-1}\\left(\\frac{1}{2}\\right) + \\tan^{-1}\\left(\\frac{1}{5}\\right) = \\tan^{-1}\\left(\\frac{\\frac{1}{2} + \\frac{1}{5}}{1 - \\frac{1}{10}}\\right) = \\tan^{-1}\\left(\\frac{7/10}{9/10}\\right) = \\tan^{-1}\\left(\\frac{7}{9}\\right)$$', 'Add the first two inverse tangents.'),
      s(2, 'Final Answer', 'Now add $\\tan^{-1}\\left(\\frac{1}{8}\\right)$ (since $\\frac{7}{9} \\cdot \\frac{1}{8} = \\frac{7}{72} < 1$):\n$$\\tan^{-1}\\left(\\frac{7}{9}\\right) + \\tan^{-1}\\left(\\frac{1}{8}\\right) = \\tan^{-1}\\left(\\frac{\\frac{7}{9} + \\frac{1}{8}}{1 - \\frac{7}{72}}\\right) = \\tan^{-1}\\left(\\frac{65/72}{65/72}\\right) = \\tan^{-1}(1) = \\frac{\\pi}{4}$$', 'The ratio reduces to 1, giving pi by 4.'),
    ]
  ),
  'ia-10-p8': sol(
    'If $\\tan^{-1} x + \\tan^{-1} y + \\tan^{-1} z = \\pi$, prove that $x + y + z = xyz$.',
    [
      s(1, 'Step 1', 'Let $\\alpha = \\tan^{-1} x$, $\\beta = \\tan^{-1} y$, $\\gamma = \\tan^{-1} z$, so $\\alpha + \\beta + \\gamma = \\pi$ and $\\tan\\alpha = x, \\tan\\beta = y, \\tan\\gamma = z$.', 'Write the inverse tangents as angles summing to pi.'),
      s(2, 'Final Answer', '$\\alpha + \\beta = \\pi - \\gamma$. Taking $\\tan$ on both sides:\n$$\\tan(\\alpha + \\beta) = \\tan(\\pi - \\gamma) \\implies \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta} = -\\tan\\gamma$$\n$$\\frac{x + y}{1 - xy} = -z \\implies x + y = -z + xyz \\implies x + y + z = xyz$$', 'Take tangent of both sides and cross-multiply.'),
    ]
  ),
  'ia-10-p9': sol(
    'Solve $\\sin^{-1}(1 - x) - 2\\sin^{-1} x = \\frac{\\pi}{2}$.',
    [
      s(1, 'Step 1', 'Let $\\theta = \\sin^{-1} x$, so $x = \\sin\\theta$. Rewrite the equation:\n$$\\sin^{-1}(1 - x) = \\frac{\\pi}{2} + 2\\theta$$\nTaking sine on both sides:\n$$1 - x = \\sin\\left(\\frac{\\pi}{2} + 2\\theta\\right) = \\cos 2\\theta = 1 - 2\\sin^2\\theta = 1 - 2x^2$$', 'Isolate sin inverse (1 - x) and take sine of both sides.'),
      s(2, 'Step 2', '$$1 - x = 1 - 2x^2 \\implies 2x^2 - x = 0 \\implies x(2x - 1) = 0 \\implies x = 0 \\text{ or } x = \\frac{1}{2}$$', 'Solve for candidate values of x.'),
      s(3, 'Final Answer', 'Verify in original equation:\nFor $x = 0$: $\\sin^{-1}(1) - 0 = \\frac{\\pi}{2}$ (Valid).\nFor $x = \\frac{1}{2}$: $\\sin^{-1}\\left(\\frac{1}{2}\\right) - 2\\sin^{-1}\\left(\\frac{1}{2}\\right) = -\\frac{\\pi}{6} \\neq \\frac{\\pi}{2}$ (Extraneous).\nHence the only solution is $x = 0$.', 'Always check inverse trig solutions; only x equals 0 satisfies the equation.', 'Discard x = 1/2 because it yields -pi/6 instead of pi/2.'),
    ]
  ),
  'ia-10-p10': sol(
    'If $\\cos^{-1} p + \\cos^{-1} q + \\cos^{-1} r = \\pi$, prove that $p^2 + q^2 + r^2 + 2pqr = 1$.',
    [
      s(1, 'Step 1', 'Write $\\cos^{-1} p + \\cos^{-1} q = \\pi - \\cos^{-1} r$.\nTake $\\cos$ on both sides:\n$$pq - \\sqrt{1 - p^2}\\sqrt{1 - q^2} = -r$$', 'Transpose cos inverse r and take cosine of both sides.'),
      s(2, 'Final Answer', '$$pq + r = \\sqrt{(1 - p^2)(1 - q^2)}$$\nSquaring both sides:\n$$p^2q^2 + 2pqr + r^2 = 1 - p^2 - q^2 + p^2q^2$$\n$$p^2 + q^2 + r^2 + 2pqr = 1$$', 'Isolate the radical, square both sides, and cancel p^2 q^2.'),
    ]
  ),
  'ia-11-p6': sol(
    'Prove that $\\cosh^2 x - \\sinh^2 x = 1$ using exponential definitions.',
    [
      s(1, 'Definition', '$\\cosh x = \\frac{e^x + e^{-x}}{2}$ and $\\sinh x = \\frac{e^x - e^{-x}}{2}$.', 'Recall the exponential definitions of cosh x and sinh x.'),
      s(2, 'Final Answer', '$$\\cosh^2 x - \\sinh^2 x = \\left(\\frac{e^x + e^{-x}}{2}\\right)^2 - \\left(\\frac{e^x - e^{-x}}{2}\\right)^2$$\n$$= \\frac{(e^{2x} + 2 + e^{-2x}) - (e^{2x} - 2 + e^{-2x})}{4} = \\frac{4}{4} = 1$$', 'Expand both squares and simplify to 1.'),
    ]
  ),
  'ia-11-p7': sol(
    'If $\\cosh x = \\frac{5}{2}$, find the values of $\\cosh 2x$ and $\\sinh 2x$.',
    [
      s(1, 'Step 1 (cosh 2x)', '$$\\cosh 2x = 2\\cosh^2 x - 1 = 2\\left(\\frac{25}{4}\\right) - 1 = \\frac{25}{2} - 1 = \\frac{23}{2}$$', 'Use cosh 2x equals 2 cosh square x minus 1.'),
      s(2, 'Final Answer (sinh 2x)', '$\\sinh^2 x = \\cosh^2 x - 1 = \\frac{25}{4} - 1 = \\frac{21}{4} \\implies \\sinh x = \\pm\\frac{\\sqrt{21}}{2}$.\n$$\\sinh 2x = 2\\sinh x\\cosh x = 2\\left(\\pm\\frac{\\sqrt{21}}{2}\\right)\\left(\\frac{5}{2}\\right) = \\pm\\frac{5\\sqrt{21}}{2}$$', 'Keep both plus and minus signs for sinh 2x since x can be positive or negative.'),
    ]
  ),
  'ia-11-p8': sol(
    'Prove that $\\tanh^{-1}(x) = \\frac{1}{2}\\log_e\\left(\\frac{1 + x}{1 - x}\\right)$ for $|x| < 1$.',
    [
      s(1, 'Step 1', 'Let $y = \\tanh^{-1}(x)$, so $x = \\tanh y = \\frac{e^y - e^{-y}}{e^y + e^{-y}} = \\frac{e^{2y} - 1}{e^{2y} + 1}$.', 'Express x in terms of e power 2y.'),
      s(2, 'Final Answer', 'By componendo and dividendo:\n$$\\frac{1 + x}{1 - x} = \\frac{(e^{2y} + 1) + (e^{2y} - 1)}{(e^{2y} + 1) - (e^{2y} - 1)} = \\frac{2e^{2y}}{2} = e^{2y}$$\nTaking $\\log_e$ on both sides: $2y = \\log_e\\left(\\frac{1 + x}{1 - x}\\right) \\implies \\tanh^{-1}(x) = \\frac{1}{2}\\log_e\\left(\\frac{1 + x}{1 - x}\\right)$.', 'Apply componendo and dividendo, then take the natural logarithm.'),
    ]
  ),
  'ia-11-p9': sol(
    'Prove that $\\sinh(x + y) = \\sinh x\\cosh y + \\cosh x\\sinh y$.',
    [
      s(1, 'Step 1', '$$\\text{RHS} = \\left(\\frac{e^x - e^{-x}}{2}\\right)\\left(\\frac{e^y + e^{-y}}{2}\\right) + \\left(\\frac{e^x + e^{-x}}{2}\\right)\\left(\\frac{e^y - e^{-y}}{2}\\right)$$', 'Substitute exponential definitions on the right-hand side.'),
      s(2, 'Final Answer', '$$\\text{RHS} = \\frac{1}{4}[(e^{x+y} + e^{x-y} - e^{-x+y} - e^{-x-y}) + (e^{x+y} - e^{x-y} + e^{-x+y} - e^{-x-y})]$$\n$$= \\frac{2e^{x+y} - 2e^{-(x+y)}}{4} = \\frac{e^{x+y} - e^{-(x+y)}}{2} = \\sinh(x + y)$$', 'Cross terms cancel, leaving sinh(x + y).'),
    ]
  ),
  'ia-11-p10': sol(
    'If $\\sinh x = \\tan\\theta$, prove that $x = \\log_e(\\sec\\theta + \\tan\\theta)$ and $\\cosh x = \\sec\\theta$.',
    [
      s(1, 'Step 1 (cosh x)', 'For principal angle $\\theta \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$, $\\sec\\theta > 0$:\n$$\\cosh^2 x = 1 + \\sinh^2 x = 1 + \\tan^2\\theta = \\sec^2\\theta \\implies \\cosh x = \\sec\\theta$$', 'Since cosh x is always positive, take the positive square root sec theta.'),
      s(2, 'Final Answer', 'Adding $\\cosh x + \\sinh x$:\n$$e^x = \\cosh x + \\sinh x = \\sec\\theta + \\tan\\theta$$\nTaking $\\log_e$ on both sides: $x = \\log_e(\\sec\\theta + \\tan\\theta)$.', 'Use cosh x plus sinh x equals e power x and take natural log.'),
    ]
  ),
  'ia-12-p6': sol(
    'In $\\triangle ABC$, if $a, b, c$ are in A.P., prove that $\\cot\\frac{A}{2}, \\cot\\frac{B}{2}, \\cot\\frac{C}{2}$ are in A.P.',
    [
      s(1, 'Step 1', 'Given $a, b, c$ are in A.P., so $2b = a + c$, or equivalently $b - a = c - b$.\nSubtracting from $s$: $(s - a) - (s - b) = (s - b) - (s - c)$, meaning $s - a, s - b, s - c$ are in A.P.', 'Show that s-a, s-b, s-c are also in A.P.'),
      s(2, 'Final Answer', 'Multiply each term by the constant $\\frac{s}{\\Delta} > 0$:\n$$\\frac{s(s - a)}{\\Delta},\\ \\frac{s(s - b)}{\\Delta},\\ \\frac{s(s - c)}{\\Delta} \\text{ are in A.P.}$$\nUsing $\\cot\\frac{A}{2} = \\frac{s(s-a)}{\\Delta}$, etc., we conclude $\\cot\\frac{A}{2}, \\cot\\frac{B}{2}, \\cot\\frac{C}{2}$ are in A.P.', 'Multiplying an A.P. by s over delta yields the three half-angle cotangents.'),
    ]
  ),
  'ia-12-p7': sol(
    'In $\\triangle ABC$, prove using projection rule that $(b + c)\\cos A + (c + a)\\cos B + (a + b)\\cos C = a + b + c$.',
    [
      s(1, 'Step 1', 'Expand the LHS and regroup terms:\n$$\\text{LHS} = (b\\cos C + c\\cos B) + (c\\cos A + a\\cos C) + (a\\cos B + b\\cos A)$$', 'Regroup terms to match the projection rule.'),
      s(2, 'Final Answer', 'By projection formulas: $b\\cos C + c\\cos B = a$, $c\\cos A + a\\cos C = b$, and $a\\cos B + b\\cos A = c$.\n$$\\text{LHS} = a + b + c = \\text{RHS}$$', 'Apply each projection identity to get a plus b plus c.'),
    ]
  ),
  'ia-12-p8': sol(
    'In $\\triangle ABC$, prove that $\\tan\\frac{A}{2} + \\tan\\frac{B}{2} + \\tan\\frac{C}{2} = \\frac{ab + bc + ca - s^2}{\\Delta}$.',
    [
      s(1, 'Formula', 'Recall $\\tan\\frac{A}{2} = \\frac{\\Delta}{s(s - a)}$, $\\tan\\frac{B}{2} = \\frac{\\Delta}{s(s - b)}$, $\\tan\\frac{C}{2} = \\frac{\\Delta}{s(s - c)}$.', 'Write half-angle tangents using delta and semiperimeter s.'),
      s(2, 'Step 1', '$$\\text{LHS} = \\frac{\\Delta}{s}\\left[\\frac{1}{s-a} + \\frac{1}{s-b} + \\frac{1}{s-c}\\right] = \\frac{\\Delta}{s} \\cdot \\frac{(s-b)(s-c) + (s-c)(s-a) + (s-a)(s-b)}{(s-a)(s-b)(s-c)}$$\nNote $(s-a)(s-b)(s-c) = \\frac{\\Delta^2}{s}$.', 'Combine fractions over the common denominator delta square by s.'),
      s(3, 'Final Answer', 'Numerator $= 3s^2 - 2s(a + b + c) + (ab + bc + ca) = 3s^2 - 4s^2 + ab + bc + ca = ab + bc + ca - s^2$.\n$$\\text{LHS} = \\frac{\\Delta}{s} \\cdot \\frac{ab + bc + ca - s^2}{\\Delta^2 / s} = \\frac{ab + bc + ca - s^2}{\\Delta}$$', 'Replace a+b+c by 2s and cancel delta/s.'),
    ]
  ),
  'ia-12-p9': sol(
    'In $\\triangle ABC$, prove that $r\\cdot r_1\\cdot r_2\\cdot r_3 = \\Delta^2$.',
    [
      s(1, 'Formula', '$r = \\frac{\\Delta}{s}$, $r_1 = \\frac{\\Delta}{s - a}$, $r_2 = \\frac{\\Delta}{s - b}$, $r_3 = \\frac{\\Delta}{s - c}$.', 'Write the standard formulas for inradius and exradii.'),
      s(2, 'Final Answer', '$$r \\cdot r_1 \\cdot r_2 \\cdot r_3 = \\frac{\\Delta^4}{s(s - a)(s - b)(s - c)} = \\frac{\\Delta^4}{\\Delta^2} = \\Delta^2$$', 'Use Heron formula s(s-a)(s-b)(s-c) equals delta square to simplify to delta square.'),
    ]
  ),
  'ia-12-p10': sol(
    'In $\\triangle ABC$, prove that $\\cos A + \\cos B + \\cos C = 1 + \\frac{r}{R}$.',
    [
      s(1, 'Step 1', 'Using conditional triangle transformation:\n$$\\cos A + \\cos B + \\cos C = 1 + 4\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$$', 'Start from the standard triangle cosine-sum identity.'),
      s(2, 'Final Answer', 'Since $r = 4R\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2}$, we have $4\\sin\\frac{A}{2}\\sin\\frac{B}{2}\\sin\\frac{C}{2} = \\frac{r}{R}$.\nTherefore:\n$$\\cos A + \\cos B + \\cos C = 1 + \\frac{r}{R}$$', 'Substitute the inradius formula to obtain 1 plus r over R.'),
    ]
  ),
};
