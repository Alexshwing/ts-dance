// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<
    Equal<
      CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
      'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
    >
  >,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

// 实现CapitalizeWords<T>，它将字符串的每个单词的第一个字母转换为大写，其余部分保持原样。
// ============= Your Code Here =============

type IsAlpha<Ch extends string> = Uppercase<Ch> extends Lowercase<Ch>
  ? false
  : true

type CapitalizeWords<
  T extends string,
  Res extends string = '',
> = T extends `${infer First}${infer Rest}`
  ? IsAlpha<First> extends true
    ? CapitalizeWords<Rest, `${Res}${First}`>
    : `${Capitalize<`${Res}${First}`>}${CapitalizeWords<Rest>}`
  : Capitalize<Res>

type T = CapitalizeWords<'foobar'>
