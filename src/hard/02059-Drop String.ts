// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>
  >,
]

// ============= Your Code Here =============

type Includes<
  T extends string,
  P extends string,
> = P extends `${infer First}${infer Rest}`
  ? Equal<First, T> extends true
    ? true
    : Includes<T, Rest>
  : false

type T1 = Includes<'a', 'abc'>
type T2 = Includes<'b', 'abc'>
type T3 = Includes<'c', 'abc'>

type DropString<
  S extends string,
  R extends string,
  Res extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? Includes<First, R> extends true
    ? DropString<Rest, R, Res>
    : DropString<Rest, R, `${Res}${First}`>
  : Res

type T = DropString<'butter fly!', 'but'>
