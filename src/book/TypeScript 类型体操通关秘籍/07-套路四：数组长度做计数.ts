/*
`数组长度做计数`
TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。
*/

// 一、四则运算
type BuildArr<
  Length extends number,
  Ele = unknown,
  Res extends unknown[] = [],
> = Res['length'] extends Length ? Res : BuildArr<Length, Ele, [...Res, Ele]>;

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length'];

type T1 = Add<9, 1>;

type Sub<A extends number, B extends number> = BuildArr<A> extends [
  ...BuildArr<B>,
  ...infer R,
]
  ? R['length']
  : never;

type T2 = Sub<10, 1>;

type Mul<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = B extends 0 ? Res['length'] : Mul<A, Sub<B, 1>, [...Res, ...BuildArr<A>]>;

type T3 = Mul<3, 4>;

type Div<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = A extends 0 ? Res['length'] : Div<Sub<A, B>, B, [...Res, unknown]>;

type T4 = Div<9, 3>;

// 二、数组长度实现计数
// Fibonacci
// 1 1 2 3 5 8 13 21 34
// f(0) = 1, f(1) = 1, f(2) = 2, f(n) = f(n-1) + f(n-2) (n >= 2)

// 类型参数 PrevArr 是代表之前的累加值的数组。类型参数 CurrentArr 是代表当前数值的数组。

// 类型参数 IndexArr 用于记录 index，每次递归加一，默认值是 []，代表从 0 开始。

// 类型参数 Num 代表求数列的第几个数。

type Fibonacci<
  T extends number, // 答案位置
  Pre extends unknown[] = [1], // 上一个值
  Cur extends unknown[] = [], // 当前值
  Index extends unknown[] = [], // 计数
> = Index['length'] extends T
  ? Cur['length']
  : Fibonacci<T, Cur, [...Pre, ...Cur], [...Index, unknown]>;

type T5 = Fibonacci<6>;

export {};
