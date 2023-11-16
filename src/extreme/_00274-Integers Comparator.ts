// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

// type cases = [
//   Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
//   Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
//   Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
//   Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
//   Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
//   Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
//   Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
//   Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
//   Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
//   Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
//   Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
//   Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
//   Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

//   Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
//   Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
//   Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
//   Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
//   Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

//   // Extra tests if you like to challenge yourself!
//   Expect<
//     Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>
//   >,
//   Expect<
//     Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>
//   >,
//   Expect<
//     Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>
//   >,
//   Expect<
//     Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>
//   >,
//   Expect<
//     Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>
//   >,
//   Expect<
//     Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>
//   >,
// ]

// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}

type NumberToString<T extends number> = `${T}`

type StringLength<
  T extends string,
  Res extends unknown[] = [],
> = T extends `${infer First}${infer Rest}`
  ? StringLength<Rest, [...Res, unknown]>
  : Res['length']

type IsPositiveNumber<T extends number> = `${T}` extends `-${infer R extends
  number}`
  ? false
  : true

// 一位数字比大小
// type SingleDigitComparator<A extends number, B extends number> = true

// A > B true, A < B false
type CompareNumber<
  A extends number,
  B extends number,
> = IsPositiveNumber<A> extends true
  ? IsPositiveNumber<B> extends true
    ? CompareNumber<
        StringLength<NumberToString<A>>,
        StringLength<NumberToString<B>>
      > extends true
      ? true
      : false
    : true
  : IsPositiveNumber<B> extends true
  ? false
  : true

type Comparator<A extends number, B extends number> = A extends B
  ? Comparison.Equal
  : CompareNumber<A, B> extends true
  ? Comparison.Greater
  : Comparison.Lower
