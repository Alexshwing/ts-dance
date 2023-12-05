// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<
    Equal<
      UnionToIntersection<(() => 'foo') | ((i: 42) => true)>,
      (() => 'foo') & ((i: 42) => true)
    >
  >,
];

// ============= Your Code Here =============
type ToUnionFn<T> = T extends any ? (x: T) => any : never;

type UnionToIntersection<T> = ToUnionFn<T> extends (x: infer R) => any
  ? R
  : never;

// ts 中函数参数有逆变的性质, 也就是如果参数可能是多个类型, 参数类型会变成它们的交叉类型
