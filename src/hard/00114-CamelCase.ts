// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

// 实现 CamelCase<T> ，将 snake_case 类型的表示的字符串转换为 camelCase 的表示方式
// ============= Your Code Here =============
type IsLetter<Ch extends string> = Uppercase<Ch> extends Lowercase<Ch>
  ? false
  : true

type CamelCase<
  S extends string,
  Res extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? CamelCase<
      Rest,
      IsLetter<First> extends true
        ? Res extends `${infer F}_`
          ? `${F}${Uppercase<First>}`
          : `${Res}${Lowercase<First>}`
        : `${Res}${First}`
    >
  : Res
