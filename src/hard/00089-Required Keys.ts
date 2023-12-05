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
  [P in keyof T as {} extends Pick<T, P> ? never : P]: T[P]
}

type RequiredKeys<T extends Record<string, any>> = keyof GetRequired<T>
