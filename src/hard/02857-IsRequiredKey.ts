// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]

// ============= Your Code Here =============

type IsRequiredKey<T, K extends keyof T> = keyof {
  [Key in keyof T as Equal<Pick<T, Key>, Required<Pick<T, Key>>> extends true
    ? never
    : Key]: T[Key]
} extends K
  ? false
  : true
