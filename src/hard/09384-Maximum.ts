// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'
import { GreaterThan } from '../medium/04425-Greater Than'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]

// ============= Your Code Here =============
type Max<A extends number, B extends number> = GreaterThan<A, B> extends true
  ? A
  : B

type Maximum<T extends unknown[]> = T extends [
  infer First extends number,
  ...infer Rest,
]
  ? Rest['length'] extends 0
    ? First
    : Max<First, Maximum<Rest>>
  : never
