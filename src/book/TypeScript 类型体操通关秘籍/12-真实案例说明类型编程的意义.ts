/*
类型编程的意义：类型和类型之间有关联，需要动态生成类型的场景，必然要用类型编程做一些运算。有的场景下可以不用类型编程，但是用了能够有更精准的类型提示和检查
*/
// 一、ParseQueryString
import { ParseQueryString } from './10-类型体操顺口溜';
function parseQueryString<T extends string>(queryStr: T): ParseQueryString<T> {
  if (!queryStr || !queryStr.length) {
    return {} as any;
  }
  const queryObj = {};
  const items = queryStr.split('&');
  items.forEach((item) => {
    const [key, value] = item.split('=');
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj as any;
}

const res = parseQueryString('a=1&a=2&b=3&c=4');
res.a; // 具有类型提示

// 二、Promise.all
interface PromiseConstructor {
  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;
}

// 因为 Promise.all 是等所有 promise 执行完一起返回，Promise.race 是有一个执行完就返回。返回的类型都需要用到参数 Promise 的 value 类型：
const r1 = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]); // Promise<[number, number, number]>
const r2 = Promise.race([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]); // Promise<number>

// 三、Curry
type CurriedFunc<T, R> = T extends [infer First, ...infer Rest]
  ? (args: First) => CurriedFunc<Rest, R>
  : never;

declare function currying<T>(
  fn: T
): T extends (...args: infer P) => infer R ? CurriedFunc<P, R> : never;

const func = (a: string, b: number, c: boolean) => {};
const curriedFunc = currying(func); // (arg: string) => (arg: number) => (arg: boolean) => never
