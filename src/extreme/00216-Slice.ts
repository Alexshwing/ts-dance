// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,
  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,
  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,
  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

// ============= Your Code Here =============
import { _Sub } from 'utils/operation'

type ToPositive<
  T extends number,
  Len extends number,
> = `${T}` extends `-${infer Rest extends number}` ? _Sub<Len, Rest> : T

type T1 = ToPositive<-1, 2>
type T2 = ToPositive<1, 2>

type GetArr<
  End extends number,
  Arr extends number[],
  Count extends unknown[] = [],
> = Count['length'] extends End
  ? []
  : Arr extends [infer First extends number, ...infer Rest extends number[]]
  ? [First, ...GetArr<End, Rest, [...Count, unknown]>]
  : []

type Slice<
  Arr extends number[],
  Start extends number = 0,
  End extends number = Arr['length'],
  Len extends number = Arr['length'],
  Start_Positived extends number = ToPositive<Start, Len>,
  End_Positived extends number = ToPositive<End, Len>,
> = GetArr<End_Positived, Arr> extends [
  ...GetArr<Start_Positived, Arr>,
  ...infer Rest extends number[],
]
  ? Rest
  : []
