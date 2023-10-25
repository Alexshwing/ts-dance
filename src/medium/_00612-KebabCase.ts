// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  // Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  // Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  // Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  // Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  // Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  // Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  // Expect<Equal<KebabCase<'-'>, '-'>>,
  // Expect<Equal<KebabCase<''>, ''>>,
  // Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

// ============= Your Code Here =============
type KebabCase<S> = any

// type KebabCase<S> =
//   S extends `${infer R}${infer U}`
//   ? U extends Uncapitalize<U>
//     ? `${Uncapitalize<R>}${KebabCase<U>}`
//     : `${Uncapitalize<R>}-${KebabCase<U>}`
//   : S
