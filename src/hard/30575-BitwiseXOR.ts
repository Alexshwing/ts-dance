// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
];

// ============= Your Code Here =============

type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : '';

type _BitwiseXOR<
  A extends string,
  B extends string,
> = A extends `${infer FA}${infer RA}`
  ? B extends `${infer FB}${infer RB}`
    ? `${FA extends FB ? '0' : '1'}${_BitwiseXOR<RA, RB>}`
    : `${1}${_BitwiseXOR<RA, ''>}`
  : B extends `${string}${infer RB}`
  ? `${1}${_BitwiseXOR<'', RB>}`
  : ``;

type BitwiseXOR<S1 extends string, S2 extends string> = ReverseString<
  _BitwiseXOR<ReverseString<S1>, ReverseString<S2>>
>;
