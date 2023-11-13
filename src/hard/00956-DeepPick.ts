// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >,
]

// ============= Your Code Here =============
type DeepGet<
  T extends Record<string, any>,
  K extends string,
> = K extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? { [Key in L]: DeepPick<T[L], R> }
    : never
  : K extends keyof T
  ? { [Key in K]: T[K] }
  : never

type UnionToIntersection<T> = (
  T extends T ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never

type DeepPick<
  T extends Record<string, any>,
  K extends string,
> = UnionToIntersection<DeepGet<T, K>>

type T = DeepPick<Obj, 'a' | ''>

// TODO: 为什么不能是 unknown
// type DeepGet<
//   T extends Record<string, any>,
//   K extends string,
// > = K extends `${infer L}.${infer R}`
//   ? L extends keyof T
//     ? { [Key in L]: DeepPick<T[L], R> }
//     : unknown
//   : K extends keyof T
//   ? { [Key in K]: T[K] }
//   : unknown
