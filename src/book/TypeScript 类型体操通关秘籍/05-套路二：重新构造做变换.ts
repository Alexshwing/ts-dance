/*
`重新构造做变换`
想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换
数组、字符串、函数、索引类型等都可以用这种方式对原类型做变换产生新的类型。其中索引类型有专门的语法叫做映射类型，对索引做修改的 as 叫做重映射
*/

// 一、数组
type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest,
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : [];

type T1 = Zip<[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']>;

// 二、字符串
type CamelCase<T extends string> =
  T extends `${infer L}_${infer R}${infer Rest}`
    ? `${L}${Uppercase<R>}${CamelCase<Rest>}`
    : T;

type T2 = CamelCase<'aaa_bbb_ccc'>;

// 三、函数
type AppendArgument<Fn extends Function, Arg> = Fn extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

type T3 = AppendArgument<
  (a: string, b: boolean, c: number) => boolean,
  string[]
>;

// 四、索引类型
type _Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type ToReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ToPartial<T> = {
  [P in keyof T]?: T[P];
};

type ToMutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ToRequired<T> = {
  [P in keyof T]-?: T[P];
};

type FilterByValueType<T extends Record<string, any>, ValueType> = {
  [P in keyof T as ValueType extends T[P] ? P : never]: T[P];
};

type T4 = FilterByValueType<
  { a: number; b: string; c: boolean },
  boolean | number
>;

export {};
