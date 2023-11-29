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

// 实现一个通用的PartialByKeys<T, K>，它接收两个类型参数T和K
// K指定应设置为可选的T的属性集。当没有提供K时，它就和普通的Partial<T>一样使所有属性都是可选的。
// ============= Your Code Here =============
type PartialByKeys<
  T extends Record<string, any>,
  P extends keyof T = keyof T,
> = Omit<Partial<Pick<T, P & keyof T>> & Omit<T, P & keyof T>, never>
