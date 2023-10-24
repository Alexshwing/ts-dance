// ============= Test Cases =============
import type { Alike, Expect } from '../test-utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a.option('name', 'another name').option('name', 123).get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

// ============= Your Code Here =============
// type Chainable = {
//   option(key: string, value: any): any
//   get(): any
// }

type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T ? (V extends T[K] ? never : K) : K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>
  get(): T
}

/*
1. T = {} 用于 全局记录
2. option 是一个函数接收两个值：K 和 V，
为了约束 key 不可重复必须范型传入，value 是任意类型范型不做约束直接透传
3. 只有相同 key 且 value 类型相同才返回 never (案例3) 
4. Omit 去掉前一个类型中相同的 key
*/
