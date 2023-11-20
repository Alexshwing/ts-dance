// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
  >,
  Expect<
    Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
  >,
  Expect<
    Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
  >,
  Expect<
    Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
  >,
]

// ============= Your Code Here =============
import { _NumberToString, _StringToArr } from 'utils/transformation'

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type StringLength<
  T extends string,
  Res extends unknown[] = [],
> = T extends `${infer _}${infer Rest}`
  ? StringLength<Rest, [...Res, unknown]>
  : Res['length']

// 答案反转
type ReverseResult<T, IsReverse extends boolean> = IsReverse extends false
  ? T
  : T extends Comparison.Greater
  ? Comparison.Lower
  : T extends Comparison.Lower
  ? Comparison.Greater
  : T

// 判断是否为正数
type IsPositiveNumber<T extends number> = `${T}` extends `-${infer _}`
  ? false
  : true

// 单位数字比大小
type CompareSingleDigit<
  A extends string,
  B extends string,
> = '0123456789' extends `${string}${A}${string}${B}${string}` ? true : false

// 数位比较(长度相同)
type CompareDigit<A extends string[], B extends string[]> = A extends [
  infer FA extends string,
  ...infer RA extends string[],
]
  ? B extends [infer FB extends string, ...infer RB extends string[]]
    ? FA extends FB
      ? CompareDigit<RA, RB>
      : CompareSingleDigit<FA, FB> extends true
      ? Comparison.Lower
      : Comparison.Greater
    : Comparison.Greater
  : B extends []
  ? Comparison.Equal
  : Comparison.Lower

// 正负号比较
type CompareSign<
  A extends number,
  B extends number,
> = IsPositiveNumber<A> extends true
  ? IsPositiveNumber<B> extends true
    ? Comparison.Equal
    : Comparison.Greater
  : IsPositiveNumber<B> extends true
  ? Comparison.Lower
  : Comparison.Equal

// 长度比较
type CompareLength<
  A extends number,
  B extends number,
  STR_A extends string = `${A}`,
  STR_B extends string = `${B}`,
> = CompareDigit<
  _StringToArr<_NumberToString<StringLength<STR_A>>>,
  _StringToArr<_NumberToString<StringLength<STR_B>>>
>

type Comparator<A extends number, B extends number> = CompareSign<
  A,
  B
> extends infer R1
  ? R1 extends Comparison.Equal
    ? CompareLength<A, B> extends infer R2
      ? R2 extends Comparison.Equal
        ? ReverseResult<
            CompareDigit<
              _StringToArr<_NumberToString<A>>,
              _StringToArr<_NumberToString<B>>
            >,
            IsPositiveNumber<A> extends false ? true : false
          >
        : ReverseResult<R2, IsPositiveNumber<A> extends false ? true : false>
      : never
    : R1
  : never
