// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn'

type cases = [Expect<Equal<Combs, CaseTypeOne>>]

// 把多个修饰键两两组合，但不可以出现相同的修饰键组合。
// 提供的 ModifierKeys 中，前面的值比后面的值高，即 cmd ctrl 是可以的，但 ctrl cmd 是不允许的。
// ============= Your Code Here =============
type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

// 实现 Combs
type Combs<T extends string[] = ModifierKeys> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? `${First} ${Rest[number]}` | Combs<Rest>
  : never
