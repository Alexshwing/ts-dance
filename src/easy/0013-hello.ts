// ============= Test Cases =============
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [Expect<NotAny<HelloWorld>>, Expect<Equal<HelloWorld, string>>]

// ============= Your Code Here =============
type HelloWorld = string // expected to be a string
