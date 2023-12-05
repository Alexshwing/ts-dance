// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
];

// ============= Your Code Here =============
type IsPalindrome<
  T extends string | number,
  K = `${T}`,
> = K extends `${infer L}${infer R}`
  ? R extends ''
    ? true
    : K extends `${L}${infer Rest}${L}`
    ? IsPalindrome<Rest>
    : false
  : true;
