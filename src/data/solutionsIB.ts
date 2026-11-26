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

export const SOLUTIONS_IB: Record<string, LectureSolution> = {
  'ib-1-p1': sol(
    'Find the equation of the locus of a point $P$ which is equidistant from $A(2, 3)$ and $B(-1, 5)$.',
    [
      s(1, 'Given', 'Let $P(x, y)$ be any point on the locus.\nGiven points $A(2, 3)$ and $B(-1, 5)$, with geometric condition $PA = PB$.', 'Take a general point P of x, y on the locus and write the condition PA equals PB.'),
      s(2, 'Step 1', 'Squaring both sides: $PA^2 = PB^2$\n$$(x - 2)^2 + (y - 3)^2 = (x + 1)^2 + (y - 5)^2$$\n$$x^2 - 4x + 4 + y^2 - 6y + 9 = x^2 + 2x + 1 + y^2 - 10y + 25$$', 'Square both sides to avoid roots and expand using the distance formula.'),
      s(3, 'Final Answer', '$$-4x - 6y + 13 = 2x - 10y + 26$$\n$$6x - 4y + 13 = 0$$', 'Cancel x square and y square and collect all terms to one side to get 6x minus 4y plus 13 equals zero.'),
    ]
  ),
  'ib-1-p2': sol(
    'Find the locus of a point $P(x, y)$ whose distance from $(3, -4)$ is always $5$ units.',
    [
      s(1, 'Given', 'Let $P(x, y)$ be a point on the locus and $C(3, -4)$ be the fixed point.\nCondition: $CP = 5$.', 'Write the fixed point C and distance condition CP equals 5.'),
      s(2, 'Final Answer', '$$CP^2 = 5^2 \\implies (x - 3)^2 + (y + 4)^2 = 25$$\n$$x^2 - 6x + 9 + y^2 + 8y + 16 = 25$$\n$$x^2 + y^2 - 6x + 8y = 0$$', 'Square both sides, expand, and cancel 25 from both sides to obtain the circle locus.'),
    ]
  ),
  'ib-1-p3': sol(
    'The ends of the hypotenuse of a right-angled triangle are $(0, 6)$ and $(6, 0)$. Find the equation of the locus of its third vertex.',
    [
      s(1, 'Given', 'Let $A(0, 6)$ and $B(6, 0)$ be the ends of the hypotenuse, and $P(x, y)$ be the third vertex.\nSince $\\angle APB = 90^\\circ$, $PA^2 + PB^2 = AB^2$.', 'By Pythagoras theorem on right triangle APB, PA square plus PB square equals AB square.'),
      s(2, 'Step 1', '$$[x^2 + (y - 6)^2] + [(x - 6)^2 + y^2] = (6 - 0)^2 + (0 - 6)^2$$\n$$2x^2 + 2y^2 - 12x - 12y + 72 = 72$$', 'Substitute the distance squares and expand.'),
      s(3, 'Final Answer', '$$2x^2 + 2y^2 - 12x - 12y = 0 \\implies x^2 + y^2 - 6x - 6y = 0$$\n(where $P \\neq A, B$).', 'Divide by 2 to get x square plus y square minus 6x minus 6y equals zero.', 'Always mention that P cannot coincide with A or B so a triangle is formed.'),
    ]
  ),
  'ib-1-p4': sol(
    'Find the equation of the locus of a point $P$, the sum of whose distances from $(0, 2)$ and $(0, -2)$ is $6$ units.',
    [
      s(1, 'Given', 'Let $P(x, y)$ be a point on the locus, $A(0, 2)$ and $B(0, -2)$.\nCondition: $PA + PB = 6 \\implies PA = 6 - PB$.', 'Move PB to the right side before squaring.'),
      s(2, 'Step 1', 'Squaring: $PA^2 = 36 + PB^2 - 12PB$\n$$x^2 + (y - 2)^2 = 36 + x^2 + (y + 2)^2 - 12PB$$\n$$-4y = 36 + 4y - 12PB \\implies 12PB = 8y + 36 \\implies 3PB = 2y + 9$$', 'Expand and cancel x square, y square, and 4, then divide by 4.'),
      s(3, 'Final Answer', 'Squaring again: $9[x^2 + (y + 2)^2] = (2y + 9)^2$\n$$9x^2 + 9y^2 + 36y + 36 = 4y^2 + 36y + 81$$\n$$9x^2 + 5y^2 = 45 \\quad \\left(\\text{or } \\frac{x^2}{5} + \\frac{y^2}{9} = 1\\right)$$', 'Square one more time and cancel 36y to get 9x square plus 5y square equals 45.'),
    ]
  ),
  'ib-1-p5': sol(
    'Find the equation of the locus of $P$ if $A(4, 0)$ and $B(-4, 0)$ and $|PA - PB| = 4$.',
    [
      s(1, 'Given', 'Let $P(x, y)$ be on the locus, with $A(4, 0)$ and $B(-4, 0)$.\nCondition: $PA - PB = \\pm 4 \\implies PA = PB \\pm 4$.', 'Write PA equals PB plus or minus 4.'),
      s(2, 'Step 1', 'Squaring: $PA^2 = PB^2 + 16 \\pm 8PB$\n$$(x - 4)^2 + y^2 = (x + 4)^2 + y^2 + 16 \\pm 8PB$$\n$$-8x = 8x + 16 \\pm 8PB \\implies -16x - 16 = \\pm 8PB \\implies \\mp PB = 2x + 2$$', 'Cancel x square, y square, and 16, then divide through by 8.'),
      s(3, 'Final Answer', 'Squaring again: $PB^2 = (2x + 2)^2$\n$$(x + 4)^2 + y^2 = 4x^2 + 8x + 4$$\n$$x^2 + 8x + 16 + y^2 = 4x^2 + 8x + 4 \\implies 3x^2 - y^2 = 12$$', 'Square again and cancel 8x to get the hyperbola 3x square minus y square equals 12.'),
    ]
  ),
  'ib-2-p1': sol(
    'If the origin is shifted to $(2, 3)$ by translation of axes, find the transformed equation of $x^2 + y^2 - 4x - 6y + 9 = 0$.',
    [
      s(1, 'Formula', 'With new origin $(h, k) = (2, 3)$, the translation formulas are:\n$$x = X + 2, \\quad y = Y + 3$$', 'Substitute x equals X plus 2 and y equals Y plus 3 into the given equation.'),
      s(2, 'Step 1', '$$(X + 2)^2 + (Y + 3)^2 - 4(X + 2) - 6(Y + 3) + 9 = 0$$\n$$X^2 + 4X + 4 + Y^2 + 6Y + 9 - 4X - 8 - 6Y - 18 + 9 = 0$$', 'Expand each bracket carefully.'),
      s(3, 'Final Answer', '$$X^2 + Y^2 - 4 = 0 \\quad (\\text{or } x^2 + y^2 = 4)$$', 'All linear terms cancel, leaving X square plus Y square equals 4.'),
    ]
  ),
  'ib-2-p2': sol(
    'When the origin is shifted to $(-1, 2)$, find the new coordinates of the point $(4, -3)$.',
    [
      s(1, 'Given & Formula', 'New origin $(h, k) = (-1, 2)$ and old coordinates $(x, y) = (4, -3)$.\nUsing $X = x - h$ and $Y = y - k$:', 'Use the inverse translation formulas X equals x minus h and Y equals y minus k.'),
      s(2, 'Final Answer', '$$X = 4 - (-1) = 5, \\quad Y = -3 - 2 = -5$$\nThe new coordinates are $(5, -5)$.', 'So the new coordinates in the shifted frame are 5, minus 5.'),
    ]
  ),
  'ib-2-p3': sol(
    'When the axes are rotated through an angle $45^\\circ$, find the transformed equation of $17x^2 - 16xy + 17y^2 = 225$.',
    [
      s(1, 'Formula', 'For rotation angle $\\theta = 45^\\circ$:\n$$x = X\\cos 45^\\circ - Y\\sin 45^\\circ = \\frac{X - Y}{\\sqrt{2}}, \\quad y = X\\sin 45^\\circ + Y\\cos 45^\\circ = \\frac{X + Y}{\\sqrt{2}}$$', 'Write the rotation equations for theta equals 45 degrees.'),
      s(2, 'Step 1', 'Compute $x^2 + y^2$ and $xy$:\n$$x^2 + y^2 = \\frac{(X - Y)^2 + (X + Y)^2}{2} = X^2 + Y^2$$\n$$xy = \\frac{X^2 - Y^2}{2}$$', 'Note that x square plus y square stays X square plus Y square, and xy becomes half of X square minus Y square.'),
      s(3, 'Final Answer', 'Substitute into $17(x^2 + y^2) - 16xy = 225$:\n$$17(X^2 + Y^2) - 16\\left(\\frac{X^2 - Y^2}{2}\\right) = 225$$\n$$17X^2 + 17Y^2 - 8X^2 + 8Y^2 = 225 \\implies 9X^2 + 25Y^2 = 225$$', 'Simplifying gives 9X square plus 25Y square equals 225.'),
    ]
  ),
  'ib-2-p4': sol(
    'Find the point to which the origin should be shifted so that the equation $x^2 + y^2 - 4x + 6y - 7 = 0$ has no first-degree terms.',
    [
      s(1, 'Step 1', 'Let the origin be shifted to $(h, k)$, so $x = X + h$ and $y = Y + k$.\nSubstitute into $x^2 + y^2 - 4x + 6y - 7 = 0$:\n$$(X + h)^2 + (Y + k)^2 - 4(X + h) + 6(Y + k) - 7 = 0$$\n$$X^2 + Y^2 + (2h - 4)X + (2k + 6)Y + (h^2 + k^2 - 4h + 6k - 7) = 0$$', 'Substitute x equals X plus h and y equals Y plus k, and group the coefficients of X and Y.'),
      s(2, 'Final Answer', 'To eliminate first-degree terms, set coefficients of $X$ and $Y$ to zero:\n$$2h - 4 = 0 \\implies h = 2$$\n$$2k + 6 = 0 \\implies k = -3$$\nOrigin should be shifted to $(2, -3)$.', 'Equating the coefficients of X and Y to zero gives the shifted origin 2, minus 3.'),
    ]
  ),
  'ib-2-p5': sol(
    'Show that the axes are to be rotated through an angle of $\\frac{1}{2}\\tan^{-1}\\left(\\frac{2h}{a - b}\\right)$ to remove the $xy$ term from $ax^2 + 2hxy + by^2 = 0$ when $a \\neq b$.',
    [
      s(1, 'Formula', 'Substitute $x = X\\cos\\theta - Y\\sin\\theta$ and $y = X\\sin\\theta + Y\\cos\\theta$ into $ax^2 + 2hxy + by^2 = 0$.', 'Apply the general rotation formulas for angle theta.'),
      s(2, 'Step 1', 'Collect the coefficient of $XY$:\n$$\\text{Coeff. of } XY = -2a\\sin\\theta\\cos\\theta + 2h(\\cos^2\\theta - \\sin^2\\theta) + 2b\\sin\\theta\\cos\\theta$$\n$$= -(a - b)\\sin 2\\theta + 2h\\cos 2\\theta$$', 'Group all XY terms and apply the double-angle identities sin 2theta and cos 2theta.'),
      s(3, 'Final Answer', 'Set coefficient of $XY$ to $0$:\n$$(a - b)\\sin 2\\theta = 2h\\cos 2\\theta \\implies \\tan 2\\theta = \\frac{2h}{a - b}$$\nSince $a \\neq b$: $\\theta = \\frac{1}{2}\\tan^{-1}\\left(\\frac{2h}{a - b}\\right)$.', 'Dividing by cos 2theta gives tan 2theta equals 2h over a minus b, proving the result.'),
    ]
  ),
  'ib-3-p1': sol(
    'Transform the equation $\\sqrt{3}x + y + 10 = 0$ into normal form.',
    [
      s(1, 'Step 1', 'Rewrite with positive constant on RHS:\n$$-\\sqrt{3}x - y = 10$$', 'Move the constant to the right-hand side and make it positive because p must be positive.'),
      s(2, 'Step 2 & Final Answer', 'Divide by $\\sqrt{(-\\sqrt{3})^2 + (-1)^2} = \\sqrt{3 + 1} = 2$:\n$$\\left(-\\frac{\\sqrt{3}}{2}\\right)x + \\left(-\\frac{1}{2}\\right)y = 5$$\nIn normal form $x\\cos\\alpha + y\\sin\\alpha = p$:\n$$x\\cos 210^\\circ + y\\sin 210^\\circ = 5$$', 'Divide by 2 and identify alpha as 210 degrees in the third quadrant, with p equals 5.', 'Never leave p negative in normal form.'),
    ]
  ),
  'ib-3-p2': sol(
    'Find the distance between the parallel lines $3x - 4y + 7 = 0$ and $3x - 4y + 5 = 0$.',
    [
      s(1, 'Formula', 'Distance between parallel lines $ax + by + c_1 = 0$ and $ax + by + c_2 = 0$ is:\n$$d = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}$$', 'Recall the parallel lines distance formula.'),
      s(2, 'Final Answer', 'Here $a = 3, b = -4, c_1 = 7, c_2 = 5$:\n$$d = \\frac{|7 - 5|}{\\sqrt{3^2 + (-4)^2}} = \\frac{2}{\\sqrt{25}} = \\frac{2}{5}\\text{ units}$$', 'Substitute the coefficients to get 2 over 5 units.'),
    ]
  ),
  'ib-3-p3': sol(
    'Find the value of $p$ if the lines $3x + 4y = 5$, $2x + 3y = 4$, and $px + 4y = 6$ are concurrent.',
    [
      s(1, 'Step 1', 'Solve the first two lines $3x + 4y = 5$ and $2x + 3y = 4$:\nMultiply first by $3$ and second by $4$:\n$$9x + 12y = 15 \\quad \\text{and} \\quad 8x + 12y = 16$$\nSubtracting: $x = -1$.\nSubstituting in $2(-1) + 3y = 4 \\implies 3y = 6 \\implies y = 2$.', 'Find the intersection point of the first two lines as minus 1, 2.'),
      s(2, 'Final Answer', 'Since the three lines are concurrent, $(-1, 2)$ lies on $px + 4y = 6$:\n$$p(-1) + 4(2) = 6 \\implies -p + 8 = 6 \\implies p = 2$$', 'Substitute minus 1, 2 into the third line to obtain p equals 2.'),
    ]
  ),
  'ib-3-p4': sol(
    'Find the circumcentre of the triangle whose vertices are $(1, 3)$, $(-3, 5)$, and $(5, -1)$.',
    [
      s(1, 'Given', 'Let $S(h, k)$ be the circumcentre of $\\triangle ABC$ with $A(1, 3)$, $B(-3, 5)$, $C(5, -1)$.\nThen $SA^2 = SB^2 = SC^2$.', 'The circumcentre is equidistant from all three vertices.'),
      s(2, 'Step 1 ($SA^2 = SB^2$)', '$$(h - 1)^2 + (k - 3)^2 = (h + 3)^2 + (k - 5)^2$$\n$$-2h - 6k + 10 = 6h - 10k + 34$$\n$$8h - 4k + 24 = 0 \\implies 2h - k + 6 = 0 \\implies k = 2h + 6$$', 'Equating SA square and SB square gives k equals 2h plus 6.'),
      s(3, 'Step 2 ($SA^2 = SC^2$)', '$$(h - 1)^2 + (k - 3)^2 = (h - 5)^2 + (k + 1)^2$$\n$$-2h - 6k + 10 = -10h + 2k + 26$$\n$$8h - 8k - 16 = 0 \\implies h - k - 2 = 0$$', 'Equating SA square and SC square gives h minus k minus 2 equals zero.'),
      s(4, 'Final Answer', 'Substitute $k = 2h + 6$ into $h - k - 2 = 0$:\n$$h - (2h + 6) - 2 = 0 \\implies -h - 8 = 0 \\implies h = -8$$\n$$k = 2(-8) + 6 = -10$$\nCircumcentre $S = (-8, -10)$.', 'Solving the two linear equations gives the circumcentre minus 8, minus 10.'),
    ]
  ),
  'ib-3-p5': sol(
    'Find the image of the point $(1, 2)$ with respect to the straight line $3x + 4y - 1 = 0$.',
    [
      s(1, 'Formula', 'If $(h, k)$ is the image of $(x_1, y_1)$ in $ax + by + c = 0$, then:\n$$\\frac{h - x_1}{a} = \\frac{k - y_1}{b} = \\frac{-2(ax_1 + by_1 + c)}{a^2 + b^2}$$', 'Use the direct image formula with a factor of minus 2.'),
      s(2, 'Step 1', 'Here $(x_1, y_1) = (1, 2)$ and $a = 3, b = 4, c = -1$:\n$$\\frac{h - 1}{3} = \\frac{k - 2}{4} = \\frac{-2[3(1) + 4(2) - 1]}{3^2 + 4^2} = \\frac{-2(10)}{25} = -\\frac{4}{5}$$', 'Compute the right-hand ratio as minus 4 over 5.'),
      s(3, 'Final Answer', '$$h - 1 = -\\frac{12}{5} \\implies h = -\\frac{7}{5}, \\quad k - 2 = -\\frac{16}{5} \\implies k = -\\frac{6}{5}$$\nImage point $= \\left(-\\frac{7}{5}, -\\frac{6}{5}\\right)$.', 'Solving for h and k gives minus 7 by 5, minus 6 by 5.'),
    ]
  ),
  'ib-4-p1': sol(
    'Find the acute angle between the pair of lines $x^2 - 7xy + 12y^2 = 0$.',
    [
      s(1, 'Given & Formula', 'Comparing with $ax^2 + 2hxy + by^2 = 0$: $a = 1$, $2h = -7 \\implies h = -\\frac{7}{2}$, $b = 12$.\nAcute angle $\\theta$ satisfies $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{|a + b|}$.', 'Read off a, h, and b and write the acute angle formula.'),
      s(2, 'Final Answer', '$$\\tan\\theta = \\frac{2\\sqrt{\\frac{49}{4} - 12}}{|1 + 12|} = \\frac{2\\sqrt{\\frac{1}{4}}}{13} = \\frac{1}{13}$$\n$$\\theta = \\tan^{-1}\\left(\\frac{1}{13}\\right)$$', 'Simplify to get theta equals tan inverse 1 by 13.'),
    ]
  ),
  'ib-4-p2': sol(
    'Find $k$ if the equation $2x^2 + kxy - 6y^2 + 3x + y + 1 = 0$ represents a pair of perpendicular lines.',
    [
      s(1, 'Given', 'Comparing with $ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$:\n$a = 2$, $b = -6$, $h = \\frac{k}{2}$, $g = \\frac{3}{2}$, $f = \\frac{1}{2}$, $c = 1$.', 'Identify all six second-degree coefficients.'),
      s(2, 'Step 1 (Perpendicularity Check)', 'For perpendicular lines, we require $a + b = 0$.\nHere $a + b = 2 + (-6) = -4 \\neq 0$, so the equation cannot represent perpendicular lines for any $k$.', 'Check a plus b first: 2 minus 6 is minus 4, which is non-zero, so strictly speaking no k gives perpendicular lines.', 'In exams, verify a + b = 0 before computing Delta = 0.'),
      s(3, 'Final Answer (Pair of Lines Condition)', 'If the problem intends a pair of straight lines ($\\Delta = 0$):\n$$abc + 2fgh - af^2 - bg^2 - ch^2 = 0$$\n$$-12 + 2\\left(\\frac{1}{2}\\right)\\left(\\frac{3}{2}\\right)\\left(\\frac{k}{2}\\right) - 2\\left(\\frac{1}{4}\\right) + 6\\left(\\frac{9}{4}\\right) - \\frac{k^2}{4} = 0$$\n$$k^2 - 3k - 4 = 0 \\implies (k - 4)(k + 1) = 0 \\implies k = 4 \\text{ or } k = -1$$', 'Applying the pair-of-lines discriminant Delta equals zero yields k equals 4 or minus 1.'),
    ]
  ),
  'ib-4-p3': sol(
    'Show that the equation of the pair of angle bisectors of the lines $ax^2 + 2hxy + by^2 = 0$ is $h(x^2 - y^2) = (a - b)xy$.',
    [
      s(1, 'Given', 'Let $ax^2 + 2hxy + by^2 = 0$ represent two lines $l_1 x + m_1 y = 0$ and $l_2 x + m_2 y = 0$.\nThen $l_1 l_2 = a$, $m_1 m_2 = b$, and $l_1 m_2 + l_2 m_1 = 2h$.', 'Factor the homogeneous quadratic into two lines through the origin.'),
      s(2, 'Step 1', 'The angle bisectors satisfy equal perpendicular distances from $(x, y)$:\n$$\\frac{l_1 x + m_1 y}{\\sqrt{l_1^2 + m_1^2}} = \\pm \\frac{l_2 x + m_2 y}{\\sqrt{l_2^2 + m_2^2}}$$\nMultiplying both bisectors together:\n$$\\frac{(l_1 x + m_1 y)^2}{l_1^2 + m_1^2} - \\frac{(l_2 x + m_2 y)^2}{l_2^2 + m_2^2} = 0$$', 'Equate the perpendicular distances and combine both signs by squaring.'),
      s(3, 'Final Answer', 'Cross-multiplying and simplifying:\n$$(l_1 m_2 + l_2 m_1)(x^2 - y^2) = 2(l_1 l_2 - m_1 m_2)xy$$\n$$2h(x^2 - y^2) = 2(a - b)xy \\implies h(x^2 - y^2) = (a - b)xy$$', 'Substitute the symmetric combinations of l and m and cancel 2 to prove the bisector formula.'),
    ]
  ),
  'ib-4-p4': sol(
    'Show that the area of the triangle formed by the lines $ax^2 + 2hxy + by^2 = 0$ and $lx + my + n = 0$ is $\\frac{n^2\\sqrt{h^2 - ab}}{|am^2 - 2hlm + bl^2|}$.',
    [
      s(1, 'Step 1', 'Let $ax^2 + 2hxy + by^2 = (l_1 x + m_1 y)(l_2 x + m_2 y) = 0$, intersecting at $O(0, 0)$.\nLet the other two vertices on $lx + my + n = 0$ be $A(x_1, y_1)$ and $B(x_2, y_2)$.', 'Factor the pair of lines and denote the triangle vertices as O, A, and B.'),
      s(2, 'Step 2', 'Solving $l_1 x + m_1 y = 0$ with $lx + my + n = 0$:\n$$x_1 = \\frac{m_1 n}{l_1 m - l m_1}, \\quad y_1 = \\frac{-l_1 n}{l_1 m - l m_1}$$\nSimilarly for $B(x_2, y_2)$. Now Area $= \\frac{1}{2}|x_1 y_2 - x_2 y_1| = \\frac{n^2 |l_1 m_2 - l_2 m_1|}{2|(l_1 m - l m_1)(l_2 m - l m_2)|}$.', 'Compute the determinant x1 y2 minus x2 y1 using the intersection coordinates.'),
      s(3, 'Final Answer', 'Since $|l_1 m_2 - l_2 m_1| = \\sqrt{(l_1 m_2 + l_2 m_1)^2 - 4l_1 l_2 m_1 m_2} = 2\\sqrt{h^2 - ab}$,\nand $(l_1 m - l m_1)(l_2 m - l m_2) = am^2 - 2hlm + bl^2$:\n$$\\text{Area} = \\frac{n^2 \\sqrt{h^2 - ab}}{|am^2 - 2hlm + bl^2|}$$', 'Replace the numerator and denominator with a, h, b, l, m, n to complete the derivation.'),
    ]
  ),
  'ib-4-p5': sol(
    'Find the angle between the lines joining the origin to the points of intersection of the curve $x^2 + 2xy + y^2 + 2x + 2y - 5 = 0$ and the line $3x - y + 1 = 0$.',
    [
      s(1, 'Step 1 (Homogenize)', 'From the line, $y - 3x = 1$. Homogenizing the curve with $1 = y - 3x$:\n$$x^2 + 2xy + y^2 + (2x + 2y)(y - 3x) - 5(y - 3x)^2 = 0$$', 'Use y minus 3x equals 1 to make every term degree 2.'),
      s(2, 'Step 2', 'Expand and collect terms:\n$$x^2 + 2xy + y^2 + (2xy - 6x^2 + 2y^2 - 6xy) - 5(y^2 - 6xy + 9x^2) = 0$$\n$$-50x^2 + 28xy - 2y^2 = 0 \\implies 25x^2 - 14xy + y^2 = 0$$', 'Simplify to the homogeneous equation 25x square minus 14xy plus y square equals zero.'),
      s(3, 'Final Answer', 'Here $a = 25, 2h = -14 \\implies h = -7, b = 1$:\n$$\\cos\\theta = \\frac{|a + b|}{\\sqrt{(a - b)^2 + 4h^2}} = \\frac{26}{\\sqrt{24^2 + 14^2}} = \\frac{26}{\\sqrt{772}} = \\frac{13}{\\sqrt{193}}$$\n$$\\theta = \\cos^{-1}\\left(\\frac{13}{\\sqrt{193}}\\right)$$', 'Use the cos theta formula to find the acute angle between the two lines.'),
    ]
  ),
  'ib-5-p1': sol(
    'Find the distance between the points $(3, -2, 1)$ and $(-1, 4, 3)$.',
    [
      s(1, 'Formula', 'Distance between $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$:\n$$AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$', 'Write the 3D distance formula.'),
      s(2, 'Final Answer', '$$AB = \\sqrt{(-1 - 3)^2 + (4 - (-2))^2 + (3 - 1)^2} = \\sqrt{16 + 36 + 4} = \\sqrt{56} = 2\\sqrt{14}$$', 'Substitute the coordinates to obtain 2 root 14 units.'),
    ]
  ),
  'ib-5-p2': sol(
    'Three vertices of a parallelogram are $(1, 2, 3)$, $(-1, -2, -1)$, and $(2, 3, 2)$. Find the fourth vertex.',
    [
      s(1, 'Formula', 'In parallelogram $ABCD$, diagonals $AC$ and $BD$ bisect each other:\n$$\\text{Midpoint of } AC = \\text{Midpoint of } BD \\implies D = A + C - B$$', 'Use the midpoint equality of diagonals AC and BD.'),
      s(2, 'Final Answer', 'With $A(1, 2, 3)$, $B(-1, -2, -1)$, $C(2, 3, 2)$:\n$$D = (1 + 2 - (-1),\\ 2 + 3 - (-2),\\ 3 + 2 - (-1)) = (4, 7, 6)$$', 'Calculate A plus C minus B coordinate-wise to get 4, 7, 6.'),
    ]
  ),
  'ib-5-p3': sol(
    'Find the ratio in which the $YZ$-plane divides the line segment joining $A(-2, 4, 7)$ and $B(3, -5, 8)$.',
    [
      s(1, 'Step 1', 'Let the $YZ$-plane divide $AB$ in the ratio $k : 1$.\nAny point on the $YZ$-plane has $x$-coordinate equal to $0$.', 'At the point where AB meets the YZ-plane, x equals zero.'),
      s(2, 'Final Answer', 'Using the section formula for $x$:\n$$\\frac{3k + (-2)}{k + 1} = 0 \\implies 3k = 2 \\implies k = \\frac{2}{3}$$\nRatio $= 2 : 3$ internally.', 'Solving gives k equals 2 by 3, so the ratio is 2 is to 3 internally.'),
    ]
  ),
  'ib-5-p4': sol(
    'Show that the points $A(1, 2, 3)$, $B(7, 0, 1)$, and $C(-2, 3, 4)$ are collinear.',
    [
      s(1, 'Step 1', 'Compute direction ratios of $AB$ and $BC$:\nDRs of $AB$: $(7 - 1,\\ 0 - 2,\\ 1 - 3) = (6, -2, -2)$.\nDRs of $BC$: $(-2 - 7,\\ 3 - 0,\\ 4 - 1) = (-9, 3, 3)$.', 'Find the direction ratios of segments AB and BC.'),
      s(2, 'Final Answer', 'Check proportionality:\n$$\\frac{6}{-9} = \\frac{-2}{3} = \\frac{-2}{3}$$\nSince the DRs of $AB$ and $BC$ are proportional and $B$ is a common point, $A, B, C$ are collinear.', 'All three ratios equal minus 2 by 3 with common point B, proving collinearity.'),
    ]
  ),
  'ib-5-p5': sol(
    'Show that the points $(1, 2, 3)$, $(2, 3, 1)$, and $(3, 1, 2)$ form an equilateral triangle and find its centroid.',
    [
      s(1, 'Step 1 (Side Lengths)', 'Let $A(1, 2, 3)$, $B(2, 3, 1)$, $C(3, 1, 2)$:\n$$AB = \\sqrt{(2-1)^2 + (3-2)^2 + (1-3)^2} = \\sqrt{1 + 1 + 4} = \\sqrt{6}$$\n$$BC = \\sqrt{(3-2)^2 + (1-3)^2 + (2-1)^2} = \\sqrt{1 + 4 + 1} = \\sqrt{6}$$\n$$CA = \\sqrt{(1-3)^2 + (2-1)^2 + (3-2)^2} = \\sqrt{4 + 1 + 1} = \\sqrt{6}$$', 'Calculate AB, BC, and CA; each equals root 6.'),
      s(2, 'Final Answer', 'Since $AB = BC = CA = \\sqrt{6}$, $\\triangle ABC$ is equilateral.\nCentroid $G = \\left(\\frac{1 + 2 + 3}{3},\\ \\frac{2 + 3 + 1}{3},\\ \\frac{3 + 1 + 2}{3}\\right) = (2, 2, 2)$.', 'Average the coordinates of A, B, and C to get the centroid 2, 2, 2.'),
    ]
  ),
  'ib-6-p1': sol(
    'A line makes angles $90^\\circ, 60^\\circ, 30^\\circ$ with the positive $X, Y, Z$ axes respectively. Find its direction cosines.',
    [
      s(1, 'Formula', 'If a line makes angles $\\alpha, \\beta, \\gamma$ with the positive $X, Y, Z$ axes, its direction cosines are $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$.', 'Write the direction cosines formula.'),
      s(2, 'Final Answer', '$$l = \\cos 90^\\circ = 0, \\quad m = \\cos 60^\\circ = \\frac{1}{2}, \\quad n = \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$$\nDirection cosines are $\\left(0, \\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$.', 'Evaluate cosine at 90, 60, and 30 degrees to get 0, half, root 3 by 2.'),
    ]
  ),
  'ib-6-p2': sol(
    'Find the angle between two lines whose direction ratios are $(1, 1, 2)$ and $(\\sqrt{3} - 1, -\\sqrt{3} - 1, 4)$.',
    [
      s(1, 'Formula', 'Let $(a_1, b_1, c_1) = (1, 1, 2)$ and $(a_2, b_2, c_2) = (\\sqrt{3}-1, -\\sqrt{3}-1, 4)$.\n$$\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\sqrt{a_2^2 + b_2^2 + c_2^2}}$$', 'Recall the angle formula using direction ratios.'),
      s(2, 'Step 1', '$$a_1 a_2 + b_1 b_2 + c_1 c_2 = (\\sqrt{3} - 1) + (-\\sqrt{3} - 1) + 8 = 6$$\n$$\\sqrt{1^2 + 1^2 + 2^2} = \\sqrt{6}$$\n$$\\sqrt{(\\sqrt{3} - 1)^2 + (\\sqrt{3} + 1)^2 + 16} = \\sqrt{4 + 4 + 16} = \\sqrt{24} = 2\\sqrt{6}$$', 'Compute the dot product and both magnitudes.'),
      s(3, 'Final Answer', '$$\\cos\\theta = \\frac{6}{\\sqrt{6} \\cdot 2\\sqrt{6}} = \\frac{6}{12} = \\frac{1}{2} \\implies \\theta = 60^\\circ \\text{ (or } \\frac{\\pi}{3}\\text{)}$$', 'Cos theta equals half, so the angle is 60 degrees.'),
    ]
  ),
  'ib-6-p3': sol(
    'Find the direction cosines of two lines connected by the relations $l + m + n = 0$ and $2lm + 2nl - mn = 0$.',
    [
      s(1, 'Step 1', 'From $l + m + n = 0$, we have $n = -(l + m)$.\nSubstitute into $2lm + 2nl - mn = 0$:\n$$2lm - 2l(l + m) + m(l + m) = 0 \\implies 2l^2 - lm - m^2 = 0$$\n$$(2l + m)(l - m) = 0 \\implies m = l \\text{ or } m = -2l$$', 'Eliminate n to obtain a homogeneous quadratic in l and m, then factorize.'),
      s(2, 'Step 2', 'Case 1 ($m = l$): $n = -(l + l) = -2l \\implies \\frac{l}{1} = \\frac{m}{1} = \\frac{n}{-2}$.\nDividing by $\\sqrt{1^2 + 1^2 + (-2)^2} = \\sqrt{6}$ gives $\\pm\\left(\\frac{1}{\\sqrt{6}}, \\frac{1}{\\sqrt{6}}, -\\frac{2}{\\sqrt{6}}\\right)$.\nCase 2 ($m = -2l$): $n = -(l - 2l) = l \\implies \\frac{l}{1} = \\frac{m}{-2} = \\frac{n}{1}$.\nDividing by $\\sqrt{6}$ gives $\\pm\\left(\\frac{1}{\\sqrt{6}}, -\\frac{2}{\\sqrt{6}}, \\frac{1}{\\sqrt{6}}\\right)$.', 'Normalize each set of direction ratios by dividing by root 6.'),
      s(3, 'Final Answer', 'Direction cosines are $\\pm\\left(\\frac{1}{\\sqrt{6}}, \\frac{1}{\\sqrt{6}}, -\\frac{2}{\\sqrt{6}}\\right)$ and $\\pm\\left(\\frac{1}{\\sqrt{6}}, -\\frac{2}{\\sqrt{6}}, \\frac{1}{\\sqrt{6}}\\right)$.', 'Write the two pairs of direction cosines.'),
    ]
  ),
  'ib-6-p4': sol(
    'Find the angle between any two diagonals of a cube.',
    [
      s(1, 'Step 1', 'Place a cube of side $a$ with one vertex at $O(0, 0, 0)$ and edges along the coordinate axes.\nVertices of two diagonals $OP$ and $AB$:\n$O(0,0,0),\\ P(a,a,a)$ and $A(a,0,0),\\ B(0,a,a)$.', 'Choose two diagonals OP and AB of a cube of side a.'),
      s(2, 'Step 2', 'DRs of $OP$: $(a, a, a) \\propto (1, 1, 1)$.\nDRs of $AB$: $(-a, a, a) \\propto (-1, 1, 1)$.', 'Write the direction ratios of both diagonals.'),
      s(3, 'Final Answer', '$$\\cos\\theta = \\frac{|(1)(-1) + (1)(1) + (1)(1)|}{\\sqrt{1+1+1}\\sqrt{1+1+1}} = \\frac{1}{3}$$\n$$\\theta = \\cos^{-1}\\left(\\frac{1}{3}\\right)$$', 'Compute cos theta to get cos inverse 1 by 3.'),
    ]
  ),
  'ib-6-p5': sol(
    'Show that the lines whose direction cosines are given by $l + m + n = 0$ and $2mn + 3nl - 5lm = 0$ are perpendicular to each other.',
    [
      s(1, 'Step 1', 'From $l + m + n = 0$, $n = -(l + m)$.\nSubstitute in $2mn + 3nl - 5lm = 0$:\n$$-2m(l + m) - 3l(l + m) - 5lm = 0 \\implies 3l^2 + 10lm + 2m^2 = 0$$\nBy product of roots in $\\frac{l}{m}$: $\\frac{l_1 l_2}{m_1 m_2} = \\frac{2}{3} \\implies \\frac{l_1 l_2}{2} = \\frac{m_1 m_2}{3}$.', 'Eliminate n to relate l1 l2 and m1 m2.'),
      s(2, 'Step 2', 'Similarly, substitute $l = -(m + n)$:\n$$2mn - 3n(m + n) + 5m(m + n) = 0 \\implies 5m^2 + 4mn - 3n^2 = 0$$\nBy product of roots in $\\frac{m}{n}$: $\\frac{m_1 m_2}{n_1 n_2} = -\\frac{3}{5} \\implies \\frac{m_1 m_2}{3} = \\frac{n_1 n_2}{-5}$.', 'Eliminate l to relate m1 m2 and n1 n2.'),
      s(3, 'Final Answer', 'Combining: $\\frac{l_1 l_2}{2} = \\frac{m_1 m_2}{3} = \\frac{n_1 n_2}{-5} = k$.\n$$l_1 l_2 + m_1 m_2 + n_1 n_2 = (2 + 3 - 5)k = 0$$\nHence the two lines are perpendicular.', 'Since l1 l2 plus m1 m2 plus n1 n2 equals zero, the lines are perpendicular.'),
    ]
  ),
  'ib-7-p1': sol(
    'Write the equation of the plane $4x - 4y + 2z + 5 = 0$ in intercept form and find its intercepts.',
    [
      s(1, 'Step 1', 'Rewrite as $4x - 4y + 2z = -5$, and divide throughout by $-5$:\n$$\\frac{4x}{-5} - \\frac{4y}{-5} + \\frac{2z}{-5} = 1 \\implies \\frac{x}{-5/4} + \\frac{y}{5/4} + \\frac{z}{-5/2} = 1$$', 'Divide by minus 5 to bring the RHS to 1.'),
      s(2, 'Final Answer', 'Intercept form: $\\frac{x}{-5/4} + \\frac{y}{5/4} + \\frac{z}{-5/2} = 1$.\nIntercepts: $x$-intercept $= -\\frac{5}{4}$, $y$-intercept $= \\frac{5}{4}$, $z$-intercept $= -\\frac{5}{2}$.', 'Read off the x, y, and z intercepts from the denominators.'),
    ]
  ),
  'ib-7-p2': sol(
    'Find the angle between the planes $x + 2y + 2z - 5 = 0$ and $3x + 3y + 2z - 8 = 0$.',
    [
      s(1, 'Formula', 'Normal vectors have DRs $(a_1, b_1, c_1) = (1, 2, 2)$ and $(a_2, b_2, c_2) = (3, 3, 2)$.\n$$\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\sqrt{a_2^2 + b_2^2 + c_2^2}}$$', 'The angle between planes equals the angle between their normals.'),
      s(2, 'Final Answer', '$$\\cos\\theta = \\frac{|1(3) + 2(3) + 2(2)|}{\\sqrt{1+4+4}\\sqrt{9+9+4}} = \\frac{13}{3\\sqrt{22}}$$\n$$\\theta = \\cos^{-1}\\left(\\frac{13}{3\\sqrt{22}}\\right)$$', 'Substitute the coefficients to obtain cos inverse 13 over 3 root 22.'),
    ]
  ),
  'ib-7-p3': sol(
    'Find the equation of the plane passing through $(1, 1, 1)$ and parallel to the plane $x + 2y + 3z - 7 = 0$.',
    [
      s(1, 'Step 1', 'Any plane parallel to $x + 2y + 3z - 7 = 0$ has the form:\n$$x + 2y + 3z = k$$', 'Parallel planes share the same x, y, z coefficients.'),
      s(2, 'Final Answer', 'Since it passes through $(1, 1, 1)$:\n$$1 + 2(1) + 3(1) = k \\implies k = 6$$\nEquation of the plane: $x + 2y + 3z - 6 = 0$.', 'Substitute 1, 1, 1 to find k equals 6.'),
    ]
  ),
  'ib-7-p4': sol(
    'Find the equation of the plane passing through $(1, 1, 0)$, $(1, 2, 1)$, and $(-2, 2, -1)$.',
    [
      s(1, 'Step 1', 'Any plane through $(1, 1, 0)$ is:\n$$a(x - 1) + b(y - 1) + c(z - 0) = 0$$', 'Write the one-point form of a plane through 1, 1, 0.'),
      s(2, 'Step 2', 'Since it passes through $(1, 2, 1)$ and $(-2, 2, -1)$:\n$$a(0) + b(1) + c(1) = 0 \\implies b + c = 0 \\implies c = -b$$\n$$a(-3) + b(1) + c(-1) = 0 \\implies -3a + b - (-b) = 0 \\implies -3a + 2b = 0$$', 'Substitute the remaining two points to relate a, b, and c.'),
      s(3, 'Final Answer', 'Choosing $b = 3$ gives $a = 2$ and $c = -3$:\n$$2(x - 1) + 3(y - 1) - 3z = 0 \\implies 2x + 3y - 3z - 5 = 0$$', 'Take a equals 2, b equals 3, c equals minus 3 to get 2x plus 3y minus 3z minus 5 equals zero.'),
    ]
  ),
  'ib-7-p5': sol(
    'Find the foot of the perpendicular drawn from $(1, 3, 4)$ to the plane $2x - y + z + 3 = 0$, and find its perpendicular distance.',
    [
      s(1, 'Formula', 'Foot $(h, k, l)$ of perpendicular from $(x_1, y_1, z_1)$ to $ax + by + cz + d = 0$ satisfies:\n$$\\frac{h - x_1}{a} = \\frac{k - y_1}{b} = \\frac{l - z_1}{c} = \\frac{-(ax_1 + by_1 + cz_1 + d)}{a^2 + b^2 + c^2}$$', 'Apply the foot-of-perpendicular formula.'),
      s(2, 'Step 1', 'Here $(x_1, y_1, z_1) = (1, 3, 4)$ and $a = 2, b = -1, c = 1, d = 3$:\n$$\\frac{h - 1}{2} = \\frac{k - 3}{-1} = \\frac{l - 4}{1} = \\frac{-(2(1) - 3 + 4 + 3)}{4 + 1 + 1} = -\\frac{6}{6} = -1$$', 'The common ratio simplifies to minus 1.'),
      s(3, 'Final Answer', '$$h = 1 - 2 = -1, \\quad k = 3 + 1 = 4, \\quad l = 4 - 1 = 3$$\nFoot of perpendicular $= (-1, 4, 3)$.\nPerpendicular distance $= \\frac{|2(1) - 3 + 4 + 3|}{\\sqrt{2^2 + (-1)^2 + 1^2}} = \\frac{6}{\\sqrt{6}} = \\sqrt{6}$ units.', 'Thus the foot is minus 1, 4, 3 and the perpendicular distance is root 6 units.'),
    ]
  ),
  'ib-8-p1': sol(
    'Evaluate $\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx}$ ($b \\neq 0$).',
    [
      s(1, 'Formula', 'Use the standard limit $\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1$.', 'Recall the standard sine limit as theta approaches 0.'),
      s(2, 'Final Answer', '$$\\lim_{x \\to 0} \\frac{\\sin ax}{\\sin bx} = \\lim_{x \\to 0} \\frac{\\left(\\frac{\\sin ax}{ax}\\right) \\cdot ax}{\\left(\\frac{\\sin bx}{bx}\\right) \\cdot bx} = \\frac{1 \\cdot a}{1 \\cdot b} = \\frac{a}{b}$$', 'Multiply and divide numerator by ax and denominator by bx to obtain a by b.'),
    ]
  ),
  'ib-8-p2': sol(
    'Evaluate $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x}$.',
    [
      s(1, 'Formula', 'Use $\\lim_{t \\to 0} \\frac{e^t - 1}{t} = 1$.', 'Use the standard exponential limit.'),
      s(2, 'Final Answer', '$$\\lim_{x \\to 0} \\frac{e^{3x} - 1}{x} = 3 \\lim_{x \\to 0} \\frac{e^{3x} - 1}{3x} = 3(1) = 3$$', 'Multiply and divide by 3 to get the limit value 3.'),
    ]
  ),
  'ib-8-p3': sol(
    'Evaluate $\\lim_{x \\to 0} \\frac{\\sqrt{1 + x} - 1}{x}$.',
    [
      s(1, 'Step 1 (Rationalize)', 'Since direct substitution gives $\\frac{0}{0}$, multiply numerator and denominator by $\\sqrt{1 + x} + 1$:\n$$\\lim_{x \\to 0} \\frac{(\\sqrt{1 + x} - 1)(\\sqrt{1 + x} + 1)}{x(\\sqrt{1 + x} + 1)} = \\lim_{x \\to 0} \\frac{(1 + x) - 1}{x(\\sqrt{1 + x} + 1)}$$', 'Rationalize the numerator to remove the 0 by 0 indeterminate form.'),
      s(2, 'Final Answer', '$$= \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{1 + x} + 1)} = \\lim_{x \\to 0} \\frac{1}{\\sqrt{1 + x} + 1} = \\frac{1}{1 + 1} = \\frac{1}{2}$$', 'Cancel x and substitute x equals 0 to get 1 by 2.'),
    ]
  ),
  'ib-8-p4': sol(
    'Check the continuity of $f(x) = \\begin{cases} \\frac{\\cos ax - \\cos bx}{x^2}, & x \\neq 0 \\\\ \\frac{b^2 - a^2}{2}, & x = 0 \\end{cases}$ at $x = 0$.',
    [
      s(1, 'Step 1 (Evaluate Limit)', '$$\\lim_{x \\to 0} \\frac{\\cos ax - \\cos bx}{x^2} = \\lim_{x \\to 0} \\frac{-2\\sin\\left(\\frac{a+b}{2}x\\right)\\sin\\left(\\frac{a-b}{2}x\\right)}{x^2}$$\n$$= 2\\lim_{x \\to 0} \\frac{\\sin\\left(\\frac{a+b}{2}x\\right)}{x} \\cdot \\frac{\\sin\\left(\\frac{b-a}{2}x\\right)}{x}$$', 'Apply the cos C minus cos D identity and split the two sine factors over x.'),
      s(2, 'Step 2', '$$= 2 \\cdot \\left(\\frac{a + b}{2}\\right) \\cdot \\left(\\frac{b - a}{2}\\right) = \\frac{b^2 - a^2}{2}$$', 'Evaluate the trigonometric limits to get b square minus a square over 2.'),
      s(3, 'Final Answer', 'Since $\\lim_{x \\to 0} f(x) = \\frac{b^2 - a^2}{2} = f(0)$, the function $f(x)$ is continuous at $x = 0$.', 'Because the limit matches f of 0, f is continuous at x equals 0.'),
    ]
  ),
  'ib-8-p5': sol(
    'Find real constants $a, b$ so that the function $f(x) = \\begin{cases} \\sin x, & x \\le 0 \\\\ x^2 + a, & 0 < x < 1 \\\\ bx + 3, & 1 \\le x \\le 3 \\\\ -3, & x > 3 \\end{cases}$ is continuous on $\\mathbb{R}$.',
    [
      s(1, 'Step 1 (Continuity at x = 0)', 'LHL at $0$: $\\lim_{x \\to 0^-} \\sin x = 0 = f(0)$.\nRHL at $0$: $\\lim_{x \\to 0^+} (x^2 + a) = a$.\nFor continuity at $x = 0$: $a = 0$.', 'Equate left-hand and right-hand limits at x equals 0 to find a equals 0.'),
      s(2, 'Step 2 (Continuity at x = 1)', 'LHL at $1$: $\\lim_{x \\to 1^-} (x^2 + a) = 1 + 0 = 1$.\nRHL at $1$: $\\lim_{x \\to 1^+} (bx + 3) = b + 3 = f(1)$.\nEquating: $b + 3 = 1 \\implies b = -2$.', 'Equate limits at x equals 1 to get b equals minus 2.'),
      s(3, 'Final Answer', 'Verify at $x = 3$: LHL $= 3b + 3 = 3(-2) + 3 = -3 = $ RHL $= f(3)$.\nHence $a = 0$ and $b = -2$.', 'Check continuity at x equals 3 as verification; both sides equal minus 3. So a is 0 and b is minus 2.'),
    ]
  ),
  'ib-9-p1': sol(
    'Find $\\frac{dy}{dx}$ if $y = \\sin(\\log x)$ ($x > 0$).',
    [
      s(1, 'Formula', 'Using the chain rule: $\\frac{d}{dx}[\\sin(u)] = \\cos(u)\\cdot\\frac{du}{dx}$ and $\\frac{d}{dx}(\\log x) = \\frac{1}{x}$.', 'Apply the chain rule to sine of log x.'),
      s(2, 'Final Answer', '$$\\frac{dy}{dx} = \\cos(\\log x) \\cdot \\frac{d}{dx}(\\log x) = \\frac{\\cos(\\log x)}{x}$$', 'Multiply cos of log x by 1 over x.'),
    ]
  ),
  'ib-9-p2': sol(
    'Find $\\frac{dy}{dx}$ if $y = \\tan^{-1}\\left(\\frac{2x}{1 - x^2}\\right)$ for $|x| < 1$.',
    [
      s(1, 'Step 1', 'Put $x = \\tan\\theta$, so $\\theta = \\tan^{-1} x$ with $-\\frac{\\pi}{4} < \\theta < \\frac{\\pi}{4}$ (since $|x| < 1$).\n$$y = \\tan^{-1}\\left(\\frac{2\\tan\\theta}{1 - \\tan^2\\theta}\\right) = \\tan^{-1}(\\tan 2\\theta) = 2\\theta = 2\\tan^{-1} x$$', 'Substitute x equals tan theta to simplify y to 2 tan inverse x.'),
      s(2, 'Final Answer', '$$\\frac{dy}{dx} = 2 \\cdot \\frac{1}{1 + x^2} = \\frac{2}{1 + x^2}$$', 'Differentiate 2 tan inverse x to get 2 over 1 plus x square.'),
    ]
  ),
  'ib-9-p3': sol(
    'Find the derivative of $\\sin 2x$ from the first principle.',
    [
      s(1, 'Formula', 'Let $f(x) = \\sin 2x$. By first principle:\n$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}$$', 'Write the first-principle limit definition of derivative.'),
      s(2, 'Step 1', '$$f\'(x) = \\lim_{h \\to 0} \\frac{\\sin 2(x + h) - \\sin 2x}{h} = \\lim_{h \\to 0} \\frac{2\\cos(2x + h)\\sin h}{h}$$', 'Use sin C minus sin D equals 2 cos C+D by 2 times sin C-D by 2.'),
      s(3, 'Final Answer', '$$f\'(x) = 2 \\left(\\lim_{h \\to 0} \\cos(2x + h)\\right) \\left(\\lim_{h \\to 0} \\frac{\\sin h}{h}\\right) = 2\\cos(2x)\\cdot 1 = 2\\cos 2x$$', 'Apply the standard limit sin h by h tends to 1 to obtain 2 cos 2x.'),
    ]
  ),
  'ib-9-p4': sol(
    'Find $\\frac{dy}{dx}$ for the function $y = x^{\\tan x} + (\\sin x)^{\\cos x}$.',
    [
      s(1, 'Step 1', 'Let $u = x^{\\tan x}$ and $v = (\\sin x)^{\\cos x}$, so $y = u + v \\implies \\frac{dy}{dx} = \\frac{du}{dx} + \\frac{dv}{dx}$.', 'Split into u and v before taking logarithms; never take log directly of a sum.', 'Never write log(u + v) = log u + log v! Always differentiate u and v separately.'),
      s(2, 'Step 2 (Find du/dx)', '$$\\log u = \\tan x \\log x$$\nDifferentiating: $\\frac{1}{u}\\frac{du}{dx} = \\tan x \\cdot \\frac{1}{x} + \\sec^2 x \\log x$\n$$\\frac{du}{dx} = x^{\\tan x}\\left(\\frac{\\tan x}{x} + \\sec^2 x \\log x\\right)$$', 'Take log of u, apply the product rule, and multiply by u.'),
      s(3, 'Step 3 (Find dv/dx)', '$$\\log v = \\cos x \\log(\\sin x)$$\nDifferentiating: $\\frac{1}{v}\\frac{dv}{dx} = \\cos x \\cdot \\frac{\\cos x}{\\sin x} - \\sin x \\log(\\sin x)$\n$$\\frac{dv}{dx} = (\\sin x)^{\\cos x}\\left(\\cos x \\cot x - \\sin x \\log(\\sin x)\\right)$$', 'Do the same for v.'),
      s(4, 'Final Answer', '$$\\frac{dy}{dx} = x^{\\tan x}\\left(\\frac{\\tan x}{x} + \\sec^2 x \\log x\\right) + (\\sin x)^{\\cos x}\\left(\\cos x \\cot x - \\sin x \\log(\\sin x)\\right)$$', 'Add du by dx and dv by dx for the final derivative.'),
    ]
  ),
  'ib-9-p5': sol(
    'If $\\sqrt{1 - x^2} + \\sqrt{1 - y^2} = a(x - y)$, prove that $\\frac{dy}{dx} = \\sqrt{\\frac{1 - y^2}{1 - x^2}}$.',
    [
      s(1, 'Step 1', 'Put $x = \\sin\\alpha$ and $y = \\sin\\beta$, so $\\alpha = \\sin^{-1} x$ and $\\beta = \\sin^{-1} y$.\n$$\\cos\\alpha + \\cos\\beta = a(\\sin\\alpha - \\sin\\beta)$$', 'Substitute x equals sin alpha and y equals sin beta to simplify the square roots.'),
      s(2, 'Step 2', 'Apply sum-to-product identities:\n$$2\\cos\\left(\\frac{\\alpha + \\beta}{2}\\right)\\cos\\left(\\frac{\\alpha - \\beta}{2}\\right) = 2a\\cos\\left(\\frac{\\alpha + \\beta}{2}\\right)\\sin\\left(\\frac{\\alpha - \\beta}{2}\\right)$$\n$$\\cot\\left(\\frac{\\alpha - \\beta}{2}\\right) = a \\implies \\alpha - \\beta = 2\\cot^{-1}(a)$$', 'Cancel 2 cos of alpha plus beta by 2, showing alpha minus beta is a constant.'),
      s(3, 'Final Answer', '$$\\sin^{-1} x - \\sin^{-1} y = 2\\cot^{-1}(a)$$\nDifferentiating both sides with respect to $x$:\n$$\\frac{1}{\\sqrt{1 - x^2}} - \\frac{1}{\\sqrt{1 - y^2}}\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = \\sqrt{\\frac{1 - y^2}{1 - x^2}}$$', 'Differentiate with respect to x; the constant right side becomes zero, proving the identity.'),
    ]
  ),
  'ib-10-p1': sol(
    'Find $\\Delta y$ and $dy$ for the function $y = x^2 + 3x + 6$ when $x = 10$ and $\\Delta x = 0.01$.',
    [
      s(1, 'Formula', '$\\Delta y = f(x + \\Delta x) - f(x)$ and $dy = f\'(x)\\Delta x$.', 'Recall the definitions of delta y and differential dy.'),
      s(2, 'Step 1 (Find dy)', '$$f\'(x) = 2x + 3$$\nAt $x = 10,\\ \\Delta x = 0.01$: $dy = (2(10) + 3)(0.01) = 23(0.01) = 0.23$.', 'Compute dy as f prime of 10 times 0.01, which is 0.23.'),
      s(3, 'Final Answer (Find Δy)', '$$\\Delta y = [(10.01)^2 + 3(10.01) + 6] - [10^2 + 3(10) + 6]$$\n$$= [100.2001 + 30.03 + 6] - 136 = 0.2301$$\nThus $dy = 0.23$ and $\\Delta y = 0.2301$.', 'Evaluate f of 10.01 minus f of 10 to get delta y equals 0.2301.'),
    ]
  ),
  'ib-10-p2': sol(
    'Find the equations of the tangent and normal to the curve $y = x^4 - 6x^3 + 13x^2 - 10x + 5$ at $(0, 5)$.',
    [
      s(1, 'Step 1 (Slope)', '$$\\frac{dy}{dx} = 4x^3 - 18x^2 + 26x - 10$$\nAt $(0, 5)$, slope of tangent $m = -10$.', 'Differentiate y and plug in x equals 0 to get tangent slope m equals minus 10.'),
      s(2, 'Step 2 (Tangent)', 'Equation of tangent at $(0, 5)$:\n$$y - 5 = -10(x - 0) \\implies 10x + y - 5 = 0$$', 'Use point-slope form for the tangent.'),
      s(3, 'Final Answer (Normal)', 'Slope of normal $= -\\frac{1}{m} = \\frac{1}{10}$.\nEquation of normal: $y - 5 = \\frac{1}{10}(x - 0) \\implies x - 10y + 50 = 0$.', 'Use negative reciprocal slope 1 by 10 for the normal line.'),
    ]
  ),
  'ib-10-p3': sol(
    'The radius of a circle is increasing at the rate of $0.7\\text{ cm/s}$. What is the rate of increase of its circumference and area when $r = 10\\text{ cm}$?',
    [
      s(1, 'Given', 'Given $\\frac{dr}{dt} = 0.7\\text{ cm/s}$ and $r = 10\\text{ cm}$.\nCircumference $C = 2\\pi r$, Area $A = \\pi r^2$.', 'Write the formulas for circumference and area.'),
      s(2, 'Step 1 (Circumference)', '$$\\frac{dC}{dt} = 2\\pi \\frac{dr}{dt} = 2\\pi(0.7) = 1.4\\pi\\text{ cm/s} \\approx 4.4\\text{ cm/s}$$', 'Differentiate C with respect to t.'),
      s(3, 'Final Answer (Area)', '$$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = 2\\pi(10)(0.7) = 14\\pi\\text{ cm}^2\\text{/s} \\approx 44\\text{ cm}^2\\text{/s}$$', 'Differentiate A with respect to t and substitute r equals 10.'),
    ]
  ),
  'ib-10-p4': sol(
    'Find the angle of intersection of the curves $y^2 = 4x$ and $x^2 + y^2 = 5$.',
    [
      s(1, 'Step 1 (Points of Intersection)', 'Substitute $y^2 = 4x$ into $x^2 + y^2 = 5$:\n$$x^2 + 4x - 5 = 0 \\implies (x + 5)(x - 1) = 0$$\nSince $y^2 = 4x \\ge 0$, $x = 1 \\implies y = \\pm 2$.\nPoints of intersection: $(1, 2)$ and $(1, -2)$.', 'Solve the two equations simultaneously to find 1, 2 and 1, minus 2.'),
      s(2, 'Step 2 (Slopes at (1, 2))', 'For $y^2 = 4x$: $2y\\frac{dy}{dx} = 4 \\implies m_1 = \\frac{2}{y} = \\frac{2}{2} = 1$.\nFor $x^2 + y^2 = 5$: $2x + 2y\\frac{dy}{dx} = 0 \\implies m_2 = -\\frac{x}{y} = -\\frac{1}{2}$.', 'Differentiate both curves implicitly and evaluate slopes at 1, 2.'),
      s(3, 'Final Answer', '$$\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\left|\\frac{1 - (-1/2)}{1 + 1(-1/2)}\\right| = \\frac{3/2}{1/2} = 3$$\nBy symmetry at $(1, -2)$ as well, the angle of intersection is $\\theta = \\tan^{-1}(3)$.', 'Compute tan theta equals 3, so the angle of intersection is tan inverse 3.'),
    ]
  ),
  'ib-10-p5': sol(
    'From a rectangular sheet of dimensions $30\\text{ cm} \\times 80\\text{ cm}$, four equal squares of side $x$ cm are removed at the corners and the sides are then turned up to form an open rectangular box. Find the value of $x$ so that the volume of the box is the greatest.',
    [
      s(1, 'Step 1 (Volume Function)', 'Dimensions of the box: length $= 80 - 2x$, breadth $= 30 - 2x$, height $= x$ ($0 < x < 15$).\n$$V(x) = x(80 - 2x)(30 - 2x) = 4x^3 - 220x^2 + 2400x$$', 'Express volume V as a function of x.'),
      s(2, 'Step 2 (Critical Points)', '$$V\'(x) = 12x^2 - 440x + 2400$$\nSet $V\'(x) = 0$: $3x^2 - 110x + 600 = 0$\n$$(3x - 20)(x - 30) = 0 \\implies x = \\frac{20}{3}\\text{ or } x = 30$$\nSince $x < 15$, only $x = \\frac{20}{3}\\text{ cm}$ is valid.', 'Differentiate V, set V prime to zero, and discard x equals 30.'),
      s(3, 'Final Answer', 'Second derivative check:\n$$V\'\'(x) = 24x - 440 \\implies V\'\'\\left(\\frac{20}{3}\\right) = 160 - 440 = -280 < 0$$\nTherefore, the volume is greatest when $x = \\frac{20}{3}\\text{ cm}$.', 'Since V double prime is negative, volume is maximum at x equals 20 by 3 cm.'),
    ]
  ),
};
