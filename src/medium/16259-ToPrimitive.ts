// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>]

// ============= Your Code Here =============
type ToPrimitive<T extends Record<string, any>> = T extends Record<string, any>
  ? {
      [P in keyof T]: T[P] extends Function ? Function : ToPrimitive<T[P]>
    }
  : T extends { valueOf: () => infer P }
  ? P
  : never

// ============= note =============
type O = {
  name: 'alex'
  age: 20
}
type Trans<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key] extends { valueOf: () => infer P } ? P : never
}
type T = Trans<O>

// T extends { valueOf: () => infer P } ? P : never 获取值类型
