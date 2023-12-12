// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<PublicType<{ a: number }>, { a: number }>>,
  Expect<Equal<PublicType<{ _b: string | bigint }>, {}>>,
  Expect<Equal<PublicType<{ readonly c?: number }>, { readonly c?: number }>>,
  Expect<Equal<PublicType<{ d: string; _e: string }>, { d: string }>>,
  Expect<Equal<PublicType<{ _f: () => bigint[] }>, {}>>,
  Expect<Equal<PublicType<{ g: '_g' }>, { g: '_g' }>>,
  Expect<Equal<PublicType<{ __h: number; i: unknown }>, { i: unknown }>>,
];

// Remove the key starting with _ from given type T.
// ============= Your Code Here =============
type StartWith<
  T extends string,
  Pre extends string,
> = T extends `${Pre}${string}` ? true : false;

type PublicType<T extends Record<string, any>> = {
  [P in keyof T as StartWith<P & string, '_'> extends true ? never : P]: T[P];
};
