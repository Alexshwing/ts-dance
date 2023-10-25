// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>,
      [{ foo: 'bar'; 2: 10 }, 'foobar']
    >
  >,
]

// ============= Your Code Here =============
type Flatten<T extends unknown[], Res extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends unknown[]
    ? Flatten<Rest, [...Res, ...Flatten<First>]>
    : Flatten<Rest, [...Res, First]>
  : Res
