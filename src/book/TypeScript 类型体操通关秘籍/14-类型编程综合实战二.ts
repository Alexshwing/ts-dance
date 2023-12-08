// 一、UnionToTuple
// 联合转交叉
type UnionToIntersection<T> = (
  T extends T ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type T1 = UnionToIntersection<'a' | 'b' | 'c'>;

// 我们对联合类型 T 做下处理，用 T extends any 触发分布式条件类型的特性，它会把联合类型的每个类型单独传入做计算，最后把计算结果合并成联合类型。把每个类型构造成一个函数类型传入。
type UnionToIntersectionFn<T> = UnionToIntersection<
  T extends any ? () => T : never
>;

type T2 = UnionToIntersectionFn<'a' | 'b' | 'c'>; // (() => "a") & (() => "b") & (() => "c")

// 然后再通过 ReturnType 取返回值的类型，就取到了联合类型的最后一个类型
// 取到最后一个类型后，再用 Exclude 从联合类型中把它去掉，然后再同样的方式取最后一个类型，构造成元组类型返回，这样就达到了联合转元组的目的
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : [];

type T3 = UnionToTuple<'a' | 'b' | 'c'>; // ["a", "b", "c"]

// 二、join
const res = join('-')('a', 'b', 'c');

declare function join<Delimiter extends string>(
  d: Delimiter
): <T extends string[]>(...args: T) => JoinType<T, Delimiter>;

type JoinType<
  T extends any[],
  Delimiter extends string,
  Res extends string = '',
> = T extends [infer First, ...infer Rest]
  ? JoinType<Rest, Delimiter, `${Res}${Delimiter}${First & string}`>
  : RemoveFirstDelimiter<Res>;

type RemoveFirstDelimiter<T extends string> =
  T extends `${infer _}${infer Rest}` ? Rest : T;

// 三、DeepCamelize
type DeepCamelize<T extends Record<string, any>> = T extends unknown[]
  ? T extends [infer First, ...infer Rest]
    ? [DeepCamelize<First>, ...DeepCamelize<Rest>]
    : []
  : {
      [P in keyof T as P extends `${infer First}_${infer Rest}`
        ? `${First}${Capitalize<Rest>}`
        : P]: DeepCamelize<T[P]>;
    };

type T4 = DeepCamelize<{
  aaa_bbb: string;
  bbb_ccc: [
    {
      ccc_ddd: string;
    },
    {
      ddd_eee: string;
      eee_fff: {
        fff_ggg: string;
      };
    },
  ];
}>;

// 四、Defaultize
// 实现这样一个高级类型，对 A、B 两个索引类型做合并，如果是只有 A 中有的不变，如果是 A、B 都有的就变为可选，只有 B 中有的也变为可选
type A = {
  a: '1';
  b: '2';
};
type B = {
  b: '3';
  c: '4';
};

// type Defaultize<A, B> =
//     & Pick<A, Exclude<keyof A, keyof B>>
//     & Partial<Pick<A, Extract<keyof A, keyof B>>>
//     & Partial<Pick<B, Exclude<keyof B, keyof A>>>

type Defaultize<A, B> = Omit<
  Pick<A, Exclude<keyof A, keyof B>> &
    Partial<Pick<A, Extract<keyof A, keyof B>>> &
    Partial<Pick<B, Exclude<keyof B, keyof A>>>,
  never
>;

type T5 = Defaultize<A, B>;

export {};
