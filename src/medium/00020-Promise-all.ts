// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]

/*
键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)

*/
// ============= Your Code Here =============
declare function PromiseAll<T extends readonly any[]>(
  values: readonly [...T]
): Promise<{ [P in keyof T]: Awaited<T[P]> }>

// ============= note =============

// ! WA in 3
// declare function PromiseAll<T extends readonly any[]>(
//   values: T
// ): Promise<{ -readonly [Key in keyof T]: Awaited<T[Key]> }>

// 这里需要将 values 推断为元组, 否则会推断为`(number | Promise<number>)[]`
// 采用`[...T]` 显式将参数类型推断为 tuple

// 标准库实现
// declare function PromiseAll<T extends readonly unknown[] | []>(
//   values: T
// ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>

// @see https://blog.csdn.net/qq_16181837/article/details/128377136
// @see https://stackoverflow.com/questions/74848194/how-does-the-type-defination-of-promise-all-work-well-in-this-case
