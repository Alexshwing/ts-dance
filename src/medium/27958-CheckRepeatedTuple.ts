// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
];

// 判断一个元组类型中是否有相同的成员
// ============= Your Code Here =============
type CheckRepeatedTuple<T extends unknown[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends Rest[number]
    ? true
    : CheckRepeatedTuple<Rest>
  : false;
