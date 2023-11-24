// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

// ============= Your Code Here =============

type Diff<A extends Record<string, any>, B extends Record<string, any>> = {
  [P in Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>]: (A & B)[P]
}
