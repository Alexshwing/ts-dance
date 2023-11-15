// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  // Expect<Equal<ValidDate<'0102'>, true>>,
  // Expect<Equal<ValidDate<'0131'>, true>>,
  // Expect<Equal<ValidDate<'1231'>, true>>,
  // Expect<Equal<ValidDate<'0229'>, false>>,
  // Expect<Equal<ValidDate<'0100'>, false>>,
  // Expect<Equal<ValidDate<'0132'>, false>>,
  // Expect<Equal<ValidDate<'1301'>, false>>,
  // Expect<Equal<ValidDate<'0123'>, true>>,
  // Expect<Equal<ValidDate<'01234'>, false>>,
  // Expect<Equal<ValidDate<''>, false>>,
]

// ============= Your Code Here =============
type Num = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

type ValidDate<T extends string> = T extends `01${Num}${Num}` ? true : false
