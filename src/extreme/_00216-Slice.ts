// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  // Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  // Expect<Equal<Slice<Arr, 0, 0>, []>>,
  // Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,
  // // optional args
  // Expect<Equal<Slice<[]>, []>>,
  // Expect<Equal<Slice<Arr>, Arr>>,
  // Expect<Equal<Slice<Arr, 0>, Arr>>,
  // Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,
  // // negative index
  // Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  // Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,
  // // invalid
  // Expect<Equal<Slice<Arr, 10>, []>>,
  // Expect<Equal<Slice<Arr, 1, 0>, []>>,
  // Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

// ============= Your Code Here =============

type ArrLength<T extends unknown[]> = T['length']

type BuildArr<
  T extends number,
  Res extends unknown[] = [],
> = Res['length'] extends T ? Res : BuildArr<T, [...Res, unknown]>

type Add<A extends number, B extends number> = ArrLength<
  [...BuildArr<A>, ...BuildArr<B>]
>

type T1 = Add<1, 2>
type T2 = Add<12, 2>

type TSlice<
  Arr extends number[],
  Start extends number = 0,
  End extends number = 0,
  Count extends unknown[] = [],
  flag extends boolean = false,
  Res extends unknown[] = [],
> = Arr extends [infer First, ...infer Rest extends number[]]
  ? Count['length'] extends End
    ? Res
    : Count['length'] extends Start
    ? TSlice<Rest, Start, End, [...Count, unknown], true, [...Res, First]>
    : flag extends true
    ? TSlice<Rest, Start, End, [...Count, unknown], true, [...Res, First]>
    : TSlice<Rest, Start, End, [...Count, unknown], false, Res>
  : Res

type Slice<
  Arr extends number[],
  Start extends number = 0,
  End extends number = 0,
  Len extends number = ArrLength<Arr>,
> = TSlice<Arr, Start, End>
