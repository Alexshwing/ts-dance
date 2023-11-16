// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

// ============= Your Code Here =============
type ControlsMap = {
  s: string
  d: number
}
type Format<
  T extends string,
  Prev extends string = '',
> = T extends `${infer First}${infer Rest}`
  ? Prev extends '%'
    ? First extends keyof ControlsMap
      ? (arg: ControlsMap[First]) => Format<Rest, First>
      : Format<Rest, ''>
    : Format<Rest, First>
  : string
