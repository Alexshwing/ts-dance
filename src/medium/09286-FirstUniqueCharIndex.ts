// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  Index extends string[] = [], // 计数(如果该元素存在重复元素丢进去)
> = T extends `${infer First}${infer Rest}`
  ? First extends Index[number]
    ? FirstUniqueCharIndex<Rest, [...Index, First]>
    : Rest extends `${string}${First}${string}` // First 在 Rest 中
    ? FirstUniqueCharIndex<Rest, [...Index, First]>
    : Index['length']
  : -1
