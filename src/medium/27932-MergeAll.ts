// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<
    Equal<
      MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>,
      { a: 1 | 2; b: 2; c: 3 }
    >
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
];

// ============= Your Code Here =============
type Merge<T extends Record<string, any>, U extends Record<string, any>> = {
  [P in keyof T | keyof U]: P extends keyof T
    ? P extends keyof U
      ? T[P] | U[P]
      : T[P]
    : P extends keyof U
    ? U[P]
    : never;
};

type MergeAll<
  T extends unknown[],
  Res extends Record<string, any> = {},
> = T extends [infer First, ...infer Rest]
  ? MergeAll<Rest, Merge<First, Res>>
  : Res;
