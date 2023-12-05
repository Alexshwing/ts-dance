// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
];

// ============= Your Code Here =============

type GetRequired<T extends Record<string, any>> = {
  [P in keyof T as {} extends Pick<T, P> ? never : P]: T[P];
};

type RequiredKeys<T extends Record<string, any>> = keyof GetRequired<T>;

type IsRequiredKey<T extends Record<string, any>, K extends keyof T> = Equal<
  RequiredKeys<T>,
  K
>;
