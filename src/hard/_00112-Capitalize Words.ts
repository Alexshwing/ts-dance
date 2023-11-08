// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  // Expect<
  //   Equal<
  //     CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
  //     'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
  //   >
  // >,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

// ============= Your Code Here =============

type IsAlpha<Ch extends string> = Uppercase<Ch> extends Lowercase<Ch>
  ? false
  : true

type CapitalizeWords<
  S extends string,
  Prev extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? IsAlpha<Prev> extends true
    ? `${First}${CapitalizeWords<Rest, First>}`
    : `${Capitalize<First>}${CapitalizeWords<Rest, First>}`
  : S

type T = CapitalizeWords<'🤣qq'>