// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>,
]
// true if N is negative
// false if N is positive
// false if N is 0,
// never if N is number
// never if N is a union
// ============= Your Code Here =============

type IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never

type IsNegativeNumber<T extends number> = IsUnion<T> extends true
  ? never
  : number extends T
  ? never
  : `${T}` extends `-${infer Rest}`
  ? true
  : false
