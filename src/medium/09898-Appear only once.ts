// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]

// ============= Your Code Here =============

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest,
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false

type FindEles<
  T extends any[],
  Old extends unknown[] = [], // 当前位置前数据
  Res extends unknown[] = [],
> = T extends [infer First, ...infer Rest]
  ? Includes<Old, First> extends false
    ? Includes<Rest, First> extends false
      ? FindEles<Rest, [...Old, First], [...Res, First]>
      : FindEles<Rest, [...Old, First], Res>
    : FindEles<Rest, [...Old, First], Res>
  : Res
