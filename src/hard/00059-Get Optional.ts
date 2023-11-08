// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<
    Equal<GetOptional<{ foo: undefined; bar?: undefined }>, { bar?: undefined }>
  >,
]

// ============= Your Code Here =============
type MyPick<T extends Record<string, any>, K extends keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]: T[Key]
}

type GetOptional<T extends Record<string, any>> = {
  [Key in keyof T as {} extends MyPick<T, Key> ? Key : never]: T[Key]
}
