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

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]

// ============= Your Code Here =============
type ObjectEntries<T extends Record<string, any>> = {
  [P in keyof T]: [P, T[P]]
}[keyof T]

// ============= note =============
// 对象转联合类型
type O = {
  name: string
  age: number
}

type T = O[keyof O] // string | number
type T2 = ['1', '2'][number] // '1' | '2'
