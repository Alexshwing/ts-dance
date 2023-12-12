// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
];

// Given a number N, find the Nth triangular number, i.e. 1 + 2 + 3 + ... + N
// ============= Your Code Here =============
type Triangular<
  N extends number,
  Count extends number[] = [],
  Res extends number[] = [],
> = Count['length'] extends N
  ? [...Res, ...Count]['length']
  : Triangular<N, [...Count, 1], [...Res, ...Count]>;
