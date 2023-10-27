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

type BuildArr<
  N extends number,
  Res extends unknown[] = [],
> = Res['length'] extends N ? Res : BuildArr<N, [...Res, unknown]>

type Chunk<T extends unknown[], U extends number> = T extends [
  ...BuildArr<U>,
  ...infer Rest,
]
  ? T extends [...infer R, ...Rest]
    ? [R, ...Chunk<Rest, U>]
    : []
  : T extends []
  ? []
  : [T]
