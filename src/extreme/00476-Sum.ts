// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]

// ============= Your Code Here =============

type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : []

type StringToArr<T extends string> = T extends `${infer First extends
  number}${infer Rest}`
  ? [First, ...StringToArr<Rest>]
  : []

type ArrToString<T extends unknown[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? `${First}${ArrToString<Rest>}`
  : ''

type IsNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type BuildArr<
  T extends number,
  Res extends unknown[] = [],
> = Res['length'] extends T ? Res : BuildArr<T, [...Res, unknown]>

type TwoNumAdd<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length']

type ThreeNumAdd<
  A extends number,
  B extends number,
  Carry extends number,
> = TwoNumAdd<A, B> extends number
  ? TwoNumAdd<TwoNumAdd<A, B>, Carry> extends infer Result
    ? Result extends number
      ? Result
      : never
    : never
  : never

// 超过 10 的数减 10
type Sub<A extends number> = BuildArr<A> extends [
  ...BuildArr<10>,
  ...infer Rest,
]
  ? Rest['length']
  : 0

// 进位处理
// 9 返回 9
// 10 返回 [0, 1] (mod 10, carry)
// 14 返回 [4, 1]
type CarryProcessing<T extends number> = T extends IsNumber ? T : [Sub<T>, 1]

type Add<
  A extends number,
  B extends number,
  Carry extends number,
> = CarryProcessing<ThreeNumAdd<A, B, Carry>>

// 模拟竖式加法(未考虑进位)
// [1, 1, 1] + [2, 2, 2] = [3, 3, 3]
// [1, 1, 1] + [1, 2] = [2, 3, 1]
// [1, 2] + [1, 1, 1] = [2, 3, 1]
type VerticalAdd<
  A extends number[],
  B extends number[],
  Carry extends number = 0, // 进位
  Res extends number[] = [],
> = A extends [infer AF extends number, ...infer AR extends number[]]
  ? B extends [infer BF extends number, ...infer BR extends number[]]
    ? Add<AF, BF, Carry> extends [infer Num extends number, infer _Carry]
      ? VerticalAdd<AR, BR, 1, [...Res, Num]>
      : Add<AF, BF, Carry> extends number
      ? VerticalAdd<AR, BR, 0, [...Res, Add<AF, BF, Carry>]>
      : never
    : Add<AF, 0, Carry> extends [infer Num extends number, infer _Carry]
    ? VerticalAdd<AR, [], 1, [...Res, Num]>
    : Add<AF, 0, Carry> extends number
    ? VerticalAdd<AR, [], 0, [...Res, Add<AF, 0, Carry>]>
    : never
  : B extends [infer BF extends number, ...infer BR extends number[]]
  ? Add<0, BF, Carry> extends [infer Num extends number, infer _Carry]
    ? VerticalAdd<[], BR, 1, [...Res, Num]>
    : Add<0, BF, Carry> extends number
    ? VerticalAdd<[], BR, 0, [...Res, Add<0, BF, Carry>]>
    : never
  : Carry extends 0
  ? Res
  : [...Res, 1]

type BigNumberAdd<A extends string, B extends string> = ArrToString<
  ReverseArr<
    VerticalAdd<ReverseArr<StringToArr<A>>, ReverseArr<StringToArr<B>>>
  >
>

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = BigNumberAdd<`${A}`, `${B}`>
