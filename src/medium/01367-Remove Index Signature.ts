// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

// ============= Your Code Here =============
type RemoveIndexSignature<T> = {
  [Key in keyof T as number extends Key
    ? never
    : string extends Key
    ? never
    : symbol extends Key
    ? never
    : Key]: T[Key]
}

// ============= note =============
// 要区分索引签名和确定的key 要用'类型 extends k'确定