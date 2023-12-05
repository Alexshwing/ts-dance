// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
];

// ============= Your Code Here =============
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ToString<T extends number> = `${T}`;
type StringDigit = ToString<Digit>;
type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type GenerateStr<Len extends number, S extends string> = Len extends 0 | 1
  ? S
  : `${Len}${S}`;

type GenerateRepeatStr<
  S extends string,
  Len extends number,
  Count extends unknown[] = [],
> = Count['length'] extends Len
  ? ''
  : `${S}${GenerateRepeatStr<S, Len, [...Count, unknown]>}`;

namespace RLE {
  export type Encode<
    S extends string,
    Pre extends string = '',
    Count extends unknown[] = [],
  > = S extends `${infer First}${infer Rest}`
    ? First extends Pre
      ? Encode<Rest, Pre, [...Count, unknown]>
      : `${GenerateStr<Count['length'], Pre>}${Encode<Rest, First, [unknown]>}`
    : GenerateStr<Count['length'], Pre>;

  export type Decode<
    S extends string,
    Pre extends string = '',
  > = S extends `${infer First}${infer Rest}`
    ? First extends StringDigit
      ? Decode<Rest, First>
      : Pre extends StringDigit
      ? `${GenerateRepeatStr<First, ToNumber<Pre>>}${Decode<Rest, First>}`
      : `${GenerateRepeatStr<First, 1>}${Decode<Rest, First>}`
    : GenerateRepeatStr<S, 1>;
}
