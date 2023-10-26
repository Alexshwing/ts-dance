// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

// ============= Your Code Here =============
type Merge<T> = {
  [Key in keyof T]: T[Key]
}

type PartialByKeys<T, K extends keyof T = keyof T> = Merge<
  Partial<Pick<T, K & keyof T>> & Omit<T, K & keyof T>
>

// ============= note =============

// @see: https://github.com/type-challenges/type-challenges/issues/5395#issuecomment-1125668258
// 需要包裹一层 Merge 的原因是 ts 不会推断复杂类型, 除非它被使用过
