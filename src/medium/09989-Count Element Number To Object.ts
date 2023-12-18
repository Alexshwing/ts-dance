// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >,
];

// 通过实现一个CountElementNumberToObject方法，统计数组中相同元素的个数
// ============= Your Code Here =============
import { _Add } from 'utils/operation';

type Incremented<T extends Record<keyof any, number>, K extends keyof any> = {
  [P in keyof T | K]: P extends keyof T
    ? P extends K
      ? _Add<T[P], 1>
      : T[P]
    : P extends K
    ? 1
    : never;
};

type Merge<
  T extends Record<keyof any, number>,
  U extends Record<keyof any, number>,
> = {
  [P in keyof T | keyof U]: P extends keyof T
    ? P extends keyof U
      ? _Add<T[P], U[P]>
      : T[P]
    : P extends keyof U
    ? U[P]
    : 0;
} extends infer R
  ? R extends Record<keyof any, number>
    ? R
    : never
  : never;

type CountElementNumberToObject<
  T extends any[],
  Res extends Record<keyof any, number> = {},
> = T extends [never]
  ? Res
  : T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? CountElementNumberToObject<
        Rest,
        Merge<Res, CountElementNumberToObject<First>>
      >
    : First extends keyof any
    ? CountElementNumberToObject<Rest, Incremented<Res, First>>
    : never
  : Res;
