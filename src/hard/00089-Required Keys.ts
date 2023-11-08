// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      'a' | 'c' | 'd'
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>,
]

// ============= Your Code Here =============

type GetRequired<T extends Record<string, any>> = {
  [Key in keyof T as {} extends Pick<T, Key> ? never : Key]: T[Key]
}

// type RequiredKeys<
//   T extends Record<string, any>,
//   K extends keyof T = keyof T,
// > = K extends K ? ([{}] extends [Pick<T, K>] ? never : K) : never

type RequiredKeys<T extends Record<string, any>> = keyof GetRequired<T>
