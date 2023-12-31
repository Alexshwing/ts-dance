// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
  Expect<Equal<TwoSum<[3, 2, 0], 4>, false>>,
];

// ============= Your Code Here =============
import { _BuildArr } from 'utils/operation';

type TwoSum<T extends number[], U extends number> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? _BuildArr<U> extends [..._BuildArr<First>, ...infer R]
    ? R['length'] extends Rest[number]
      ? true
      : TwoSum<Rest, U>
    : 0 extends Rest[number]
    ? true
    : false
  : false;
