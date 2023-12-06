// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  Expect<Equal<Subtract<1000, 999>, 1>>,
];

// ============= Your Code Here =============
import { _Sub } from 'utils/operation';

type Subtract<A extends number, B extends number> = _Sub<A, B>;
