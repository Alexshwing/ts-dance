// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>,
      { k1: ['v1', 'v2']; k2: 'v1' }
    >
  >,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
      { k1: ['v1', 'v2', 'v3']; k2: 'v2' }
    >
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]

// ============= Your Code Here =============
type SplitByAndChar<T extends string> = T extends `${infer L}&${infer R}`
  ? [L, ...SplitByAndChar<R>]
  : [T]

type Merge<
  T extends string[],
  Res extends Record<string, any> = {},
> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? First extends `${infer K}=${infer V}`
    ? Merge<Rest, SetProperty<Res, K, V>>
    : First extends `${infer K}`
    ? Merge<Rest, SetProperty<Res, K>>
    : never
  : Res

type SetProperty<
  T extends Record<string, any>,
  K extends string,
  V extends any = true,
> = {
  [P in keyof T | K]: P extends K
    ? P extends keyof T
      ? T[P] extends V
        ? T[P]
        : T[P] extends any[]
        ? V extends T[P][number]
          ? T[P]
          : [...T[P], V]
        : [T[P], V]
      : V
    : P extends keyof T
    ? T[P]
    : never
}

type ParseQueryString<T extends string> = T extends ''
  ? {}
  : Merge<SplitByAndChar<T>>
