// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
];

// ============= Your Code Here =============
import {
  _ReverseArr,
  _StringToNumberArr,
  _NumberArrToStr,
} from 'utils/transformation';
import { _Add, _Sub, _Mul, _Div, _BuildArr } from 'utils/operation';
import { _Digit_Str } from 'utils/type';
import { _StringToNumber } from 'utils/transformation';

type ToNumber<T> = T extends number ? T : never;

type AddToIndex<
  T extends number[],
  Index extends number,
  R extends number,
  Count extends unknown[] = [],
> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? Count['length'] extends Index
    ? [_Add<First, R>, ...AddToIndex<Rest, Index, R, [...Count, unknown]>]
    : [First, ...AddToIndex<Rest, Index, R, [...Count, unknown]>]
  : [];

// 1 * [1, 2, 3] = [1, 2, 6]
type ScalarArrayMul<
  Num extends number,
  IndexInA extends number,
  Arr extends number[],
  Res extends number[],
  IndexInB extends unknown[] = [],
> = Arr extends [infer First extends number, ...infer Rest extends number[]]
  ? ScalarArrayMul<
      Num,
      IndexInA,
      Rest,
      AddToIndex<
        Res,
        ToNumber<_Add<IndexInA, ToNumber<IndexInB['length']>>>,
        ToNumber<_Mul<Num, First>>
      >,
      [...IndexInB, unknown]
    >
  : Res;

// [1, 2, 3] * [1, 2, 3]
type ArrMul<
  A extends number[],
  B extends number[],
  Res extends number[],
  IndexInA extends unknown[] = [],
> = A extends [infer First extends number, ...infer Rest extends number[]]
  ? ArrMul<
      Rest,
      B,
      ScalarArrayMul<First, ToNumber<IndexInA['length']>, B, Res>,
      [...IndexInA, unknown]
    >
  : Res;

type T = ArrMul<[1, 2, 3], [1, 2, 3], [0, 0, 0, 0, 0, 0]>; // [1, 4, 10, 12, 9, 0]

type StrLen<
  T extends string,
  Res extends unknown[] = [],
> = T extends `${infer _}${infer Rest}`
  ? StrLen<Rest, [...Res, unknown]>
  : Res['length'];

// 去除前导零
type TrimLeadingZeros<T extends number[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? First extends 0
    ? TrimLeadingZeros<Rest>
    : T
  : T;

// `123` -> [12, 2]
// `1` -> [1]
type Split<T extends string> = T extends `${_Digit_Str}`
  ? [_StringToNumber<T>]
  : T extends `${infer L}${_Digit_Str}`
  ? T extends `${L}${infer R}`
    ? [_StringToNumber<L>, _StringToNumber<R>]
    : never
  : never;

// 处理进位
type HandleCarry<
  T extends number[],
  Carry extends number = 0,
  Res extends number[] = [],
> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? _Add<First, Carry> extends infer Sum
    ? Sum extends number
      ? Split<`${Sum}`> extends [infer L extends number, infer R extends number]
        ? HandleCarry<Rest, L, [...Res, R]>
        : Split<`${Sum}`> extends [infer L extends number]
        ? HandleCarry<Rest, 0, [...Res, L]>
        : never
      : never
    : never
  : Res;

// 思路:
// 1. 反转
// 2. A 数组每一位乘以 B 数组(统计在 Res 中 不考虑进位)
// 3. 处理进位
// 4. 处理前导零
// 5. 反转
// 好不优雅 ~
type BigNumberMul<A extends string, B extends string> = _NumberArrToStr<
  TrimLeadingZeros<
    _ReverseArr<
      HandleCarry<
        ArrMul<
          _ReverseArr<_StringToNumberArr<A>>,
          _ReverseArr<_StringToNumberArr<B>>,
          _BuildArr<ToNumber<_Add<StrLen<A>, StrLen<B>>>>
        >
      >
    >
  >
>;
export type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = BigNumberMul<`${A}`, `${B}`> extends infer R
  ? R extends ''
    ? '0'
    : R
  : never;
