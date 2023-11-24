// ============= Test Cases =============
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

// 将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。
// ============= Your Code Here =============
type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never
}
