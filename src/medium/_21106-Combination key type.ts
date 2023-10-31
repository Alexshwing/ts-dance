// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type CaseTypeOne =
  | 'cmd ctrl'
  | 'cmd opt'
  | 'cmd fn'
  | 'ctrl opt'
  | 'ctrl fn'
  | 'opt fn'

// type cases = [Expect<Equal<Combs, CaseTypeOne>>]

// ============= Your Code Here =============
type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

// 实现 Combs
type Combs = any
