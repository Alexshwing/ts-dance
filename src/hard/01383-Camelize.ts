// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string
        prop: { another_prop: string }
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string },
        ]
      }>,
      {
        someProp: string
        prop: { anotherProp: string }
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string },
        ]
      }
    >
  >,
]

// 实现 Camelize 类型: 将对象属性名从 蛇形命名(下划线命名) 转换为 小驼峰命名
// ============= Your Code Here =============
// 蛇形转驼峰
type FormatToHump<T extends string> = T extends `${infer First}_${infer Rest}`
  ? `${First}${FormatToHump<Capitalize<Rest>>}`
  : T

type Camelize<T extends Record<string, any> | unknown[]> = T extends unknown[]
  ? T extends [infer First, ...infer Rest]
    ? First extends Record<string, any>
      ? [Camelize<First>, ...Camelize<Rest>]
      : [First, ...Camelize<Rest>]
    : T
  : T extends Record<string, any>
  ? {
      [P in keyof T as P extends string ? FormatToHump<P> : never]: Camelize<
        T[P]
      >
    }
  : T
