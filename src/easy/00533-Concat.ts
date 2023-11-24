// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >,
  Expect<Equal<Concat<readonly [], []>, []>>,
]

// ============= Your Code Here =============
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U,
]
