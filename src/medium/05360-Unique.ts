// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<
    Equal<
      Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>,
      [string, number, 1, 'a', 2, 'b']
    >
  >,
  Expect<
    Equal<
      Unique<[unknown, unknown, any, any, never, never]>,
      [unknown, any, never]
    >
  >,
]

// ============= Your Code Here =============
// 采用 indexOf
type IndexOf<T, U, Index extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest,
]
  ? Equal<First, U> extends true
    ? Index['length']
    : IndexOf<Rest, U, [...Index, unknown]>
  : -1

type Unique<T extends unknown[], Res extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest,
]
  ? IndexOf<Res, First> extends -1
    ? Unique<Rest, [...Res, First]>
    : Unique<Rest, Res>
  : Res
