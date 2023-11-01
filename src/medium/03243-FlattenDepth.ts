// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >,
]

// ============= Your Code Here =============

type FlattenDepth<
  T,
  Depth extends number = 1,
  Count extends unknown[] = [],
> = Count['length'] extends Depth
  ? T
  : T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [
        ...FlattenDepth<First, Depth, [...Count, unknown]>,
        ...FlattenDepth<Rest, Depth, Count>,
      ]
    : [First, ...FlattenDepth<Rest, Depth, Count>]
  : T
