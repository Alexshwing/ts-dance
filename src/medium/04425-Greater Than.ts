// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
];

// ============= Your Code Here =============
import { _Compare, Comparison } from '../extreme/00274-Integers Comparator';
export type GreaterThan<A extends number, B extends number> = _Compare<
  A,
  B
> extends Comparison.Greater
  ? true
  : false;
