// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
]

// 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。
// ============= Your Code Here =============
type Length<T extends readonly unknown[]> = T extends { length: infer L }
  ? L
  : never
