// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]

// ============= Your Code Here =============
// 所有元素只读且 length 为 字面量
type IsNever<T> = [T] extends [never] ? true : false

type IsTuple<T> = IsNever<T> extends true
  ? false
  : T extends readonly [...args: infer P]
  ? Equal<P['length'], number> extends false
    ? true
    : false
  : false

// type T = ['1', 1]['length'] // 2
