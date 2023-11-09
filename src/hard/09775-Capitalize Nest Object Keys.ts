// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [
    {
      Foo: string
    },
  ]
}

type cases = [Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>]

// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T extends Record<string, any> | any[]> =
  T extends any[]
    ? T extends [infer First, ...infer Rest]
      ? [CapitalizeNestObjectKeys<First>, ...CapitalizeNestObjectKeys<Rest>]
      : []
    : T extends Record<string, any>
    ? {
        [Key in keyof T as Capitalize<Key & string>]: T[Key] extends any[]
          ? CapitalizeNestObjectKeys<T[Key]>
          : T[Key]
      }
    : T
