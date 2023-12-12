// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  // Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  // Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  // Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  // Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  // Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
];

// ============= Your Code Here =============
type BitwiseXOR<S1 extends string, S2 extends string> = any;
