/*
`递归复用做循环`
TypeScript 类型系统不支持循环，但支持递归。当处理数量（个数、长度、层数）不固定的类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。
*/

// 一、Promise 递归复用
type DeepPromiseValueType<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType<ValueType>
  : T;

type T1 = DeepPromiseValueType<Promise<Promise<Promise<number>>>>;

// 二、数组
type BuildArr<
  Length extends number,
  Ele = unknown,
  Res extends unknown[] = [],
> = Res['length'] extends Length ? Res : BuildArr<Length, Ele, [...Res, Ele]>;

type T2 = BuildArr<5>;

// 三、字符串
type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;

type T3 = StringToUnion<'alexshwing'>;

// 四、对象
type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong';
        d: {
          e: {
            alex: string;
          };
        };
      };
    };
  };
};

type DeepReadonly<T extends Record<string, any>> = T extends any
  ? {
      readonly [P in keyof T]: T[P] extends Record<string, any>
        ? T[P] extends Function
          ? T[P]
          : DeepReadonly<T[P]>
        : T[P];
    }
  : never;

type T4 = DeepReadonly<obj>;

// ts 类型只有被用到才会做类型计算, 所以需要包一层 `T extends any ? ... : never` 触发计算

export {};
