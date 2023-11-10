// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null]

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>]

// ============= Your Code Here =============
type ObjectFromEntries<T extends any[]> = {
  [Key in T as Key extends any[] ? Key[0] : never]: Key[1]
}
