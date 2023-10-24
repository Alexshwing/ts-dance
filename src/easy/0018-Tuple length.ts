// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils'

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

// ============= Your Code Here =============
type Length<T> = T extends { length: infer L } ? L : never
