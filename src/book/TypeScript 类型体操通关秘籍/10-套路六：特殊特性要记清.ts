/*
`特殊特性要记清`
*/

import type { NotEqual } from '../../test-utils';
// 1. any 类型与任何类型的交叉都是 any
type IsAny<T> = 0 extends 1 & T ? true : false;

// 2. 如果条件类型左边是类型参数, 并且是 never 直接返回 never
type Test<T> = T extends number ? 1 : 2;
type T1 = Test<never>; // never

type IsNever<T> = [T] extends [never] ? true : false;

// 3. any 在条件类型也很特殊, 如果类型参数是 any, 会将 trueType 和 falseType 合并
type T2 = Test<any>; // 1 | 2

// 4. 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number
type T3 = [1, 2, 3]['length']; // 3
type T4 = number[]['length']; // number

type IsTuple<T> = T extends readonly [...params: infer R]
  ? NotEqual<R['length'], number>
  : false;

type T5 = IsTuple<[1, 2, 3]>; // true
type T6 = IsTuple<number[]>; // false

// 5. 类型是有父子关系的, 更具体的那个是子类型
// (A & B) 是 (A | B) 子类型
// 逆变: 允许父类型赋值给子类型
// 协变: 允许子类型赋值给父类型
// 在 TypeScript 中有函数参数是有逆变的性质的，也就是如果参数可能是多个类型，参数类型会变成它们的交叉类型。

type UnionToIntersection<T> = (
  T extends T ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type T7 = UnionToIntersection<{ a: 1 } | { b: 2 }>;

// 6. 提取索引类型可选属性
// 利用可选属性特点: 可选索引的值为 undefined 和值类型的联合类型
type GetOptional<T extends Record<string, any>> = {
  [P in keyof T as {} extends Pick<T, P> ? P : never]: T[P];
};
type T8 = GetOptional<{
  a: number;
  b?: string;
}>;

// 因为 b 可能为 undefined，也就是索引类型可能是 {}，所以 {} extends Pick<T, P> 就能过滤出可选索引。（可选的意思就是有或者没有，没有的时候就是空的索引类型）

// 7. 过滤索引签名
// 利用索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以
type RemoveIndexSignature<T extends Record<string, any>> = {
  [P in keyof T as P extends `${infer Str}` ? Str : never]: T[P];
};

type T9 = RemoveIndexSignature<{
  [key: string]: any; // 可索引签名
  a: number; // 具体索引
}>;

// 8. 过滤出 public 属性
// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略
class Person {
  public name: string;
  private age: number;
  protected msg: string;
}

type ClassPublicProps<T extends Record<string, any>> = {
  [P in keyof T]: T[P];
};
type T10 = ClassPublicProps<Person>;

export {};
