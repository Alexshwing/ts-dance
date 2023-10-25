// ============= Test Cases =============
// 将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。
import type { Equal, Expect } from '../test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number
        b: number
        c: boolean
      }
    >
  >,
]

// ============= Your Code Here =============
type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [Key in keyof F | keyof S]: Key extends keyof S
    ? S[Key]
    : Key extends keyof F
    ? F[Key]
    : never
}
