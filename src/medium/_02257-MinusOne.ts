// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  // Expect<Equal<MinusOne<1101>, 1100>>,
  // Expect<Equal<MinusOne<0>, -1>>,
  // Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

// ============= Your Code Here =============

type BuildArr<
  T extends number,
  Res extends unknown[] = [],
> = Res['length'] extends T ? Res : BuildArr<T, [...Res, unknown]>

// 类型实例化过深，且可能无限。
type MinusOne<T extends number> = BuildArr<T> extends [unknown, ...infer Rest]
  ? Rest['length']
  : 0
