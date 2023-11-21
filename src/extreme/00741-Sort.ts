// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<
    Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>
  >,
]

// ============= Your Code Here =============

import { _Compare, Comparison } from './00274-Integers Comparator'

type Sort<T extends number[], isDesc extends boolean = false> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? Merge<Rest, First> extends [
      infer Lower extends number[],
      infer Higher extends number[],
    ]
    ? isDesc extends true
      ? [...Sort<Higher, isDesc>, First, ...Sort<Lower, isDesc>]
      : [...Sort<Lower, isDesc>, First, ...Sort<Higher, isDesc>]
    : never
  : T

type Merge<
  T extends number[],
  Limit extends number,
  Lower extends number[] = [],
  Higher extends number[] = [],
> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? _Compare<First, Limit> extends Comparison.Lower
    ? Merge<Rest, Limit, [...Lower, First], Higher>
    : Merge<Rest, Limit, Lower, [...Higher, First]>
  : [Lower, Higher]
