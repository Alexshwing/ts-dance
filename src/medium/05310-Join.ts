// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
]

// ============= Your Code Here =============
type Join<T extends unknown[], U extends number | string> = T extends [
  infer First,
  ...infer Rest,
]
  ? Rest['length'] extends 0
    ? `${First & string}`
    : `${First & string}${U}${Join<Rest, U>}`
  : never

// ============= note =============
// 使用 `${First & string}`: 约束 First 为字符串

type Test = number | bigint | string | symbol

// string
type Test2 = Test & string
