// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);
const curried3 = Currying(() => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>,
];

// ============= Your Code Here =============
declare function Currying<T>(fn: T): Curried<T>;
type Curried<T> = T extends (...args: infer A) => infer R
  ? A extends [infer First, ...infer Rest]
    ? (
        args: First
      ) => Rest['length'] extends 0 ? R : Curried<(...args: Rest) => R>
    : () => R
  : never;

// ============= note =============
//@see: https://github.com/type-challenges/type-challenges/issues/1404
// 3种读取函数的返回值的测试代码：
declare function f1(a: string): true; // 函数声明
declare var f2: (a: string) => true; // 匿名函数表达式

// 第一种，通过泛型在参数中定义。
declare function test1<R>(fn: (...args: any[]) => R): R;
test1(f1); // true ✅
test1(f2); // true ✅
test1((a: string) => true); // boolean ❌

// 第二种，通过泛型约束上去定义。
declare function test2<F extends (...args: any[]) => any>(fn: F): ReturnType<F>;
test2(f1); // true ✅
test2(f2); // true ✅
test2((a: string) => true); // boolean ❌

// 第三种，在泛型最终应用结果处再做判定。可以看出只有这种方法的效果最好，也是符合测试case的要求
declare function test3<F>(
  fn: F
): F extends (...args: any[]) => any ? ReturnType<F> : never;
test3(f1); // true ✅
test3(f2); // true ✅
test3((a: string) => true); // true ✅
