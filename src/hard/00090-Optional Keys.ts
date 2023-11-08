// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<
    Equal<
      OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>,
      'b' | 'c' | 'd'
    >
  >,
  Expect<Equal<OptionalKeys<{}>, never>>,
]

// ============= Your Code Here =============
type MyPick<T extends Record<string, any>, K extends keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]: T[Key]
}

type GetOptional<T extends Record<string, any>> = {
  [Key in keyof T as {} extends MyPick<T, Key> ? Key : never]: T[Key]
}

type OptionalKeys<T extends Record<string, any>> = keyof GetOptional<T>
