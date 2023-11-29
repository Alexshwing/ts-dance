// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

// ============= Your Code Here =============
type Chunk<
  T extends unknown[],
  U extends number = 1,
  Res extends unknown[] = [],
> = T extends [infer First, ...infer Rest]
  ? Res['length'] extends U
    ? [Res, ...Chunk<T, U>]
    : Chunk<Rest, U, [...Res, First]>
  : Res['length'] extends 0
  ? Res
  : [Res]
