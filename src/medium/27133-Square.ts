// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,
  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>,
];

// ============= Your Code Here =============
import { Multiply } from '../extreme/00517-Multiply';

type ToNumber<T> = T extends `${infer Number extends number}` ? Number : never;

type Square<N extends number> = `${N}` extends `-${infer R}`
  ? ToNumber<Multiply<ToNumber<R>, ToNumber<R>>>
  : ToNumber<Multiply<N, N>>;
