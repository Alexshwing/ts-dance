// 一、变量命名规范
// 常用的变量命名规范有两种，一种是 KebabCase，也就是 aaa-bbb-ccc 这种中划线分割的风格，另一种是 CamelCase， 也就是 aaaBbbCcc 这种除第一个单词外首字母大写的风格
type KebabCaseToCamelCase<T extends string> =
  T extends `${infer First}-${infer Rest}`
    ? `${First}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : T;

type T1 = KebabCaseToCamelCase<'aaa-bbb-ccc'>;

type CamelCaseToKebabCase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}`
      : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : T;

type T2 = CamelCaseToKebabCase<'aaaBbbCcc'>;

// 二、Chunk
type Chunk<
  T extends unknown[],
  Limit extends number,
  Cur extends unknown[] = [],
  Res extends unknown[] = [],
> = T extends [infer First, ...infer Rest]
  ? Cur['length'] extends Limit
    ? Chunk<Rest, Limit, [First], [...Res, Cur]>
    : Chunk<Rest, Limit, [...Cur, First], Res>
  : [...Res, Cur];

type T3 = Chunk<[1, 2, 3, 4, 5], 2>;

// 三、TupleToNestedObject
type TupleToNestedObject<T extends unknown[], V> = T extends [
  infer First,
  ...infer Rest,
]
  ? {
      [P in First as P extends keyof any ? P : never]: Rest extends unknown[]
        ? TupleToNestedObject<Rest, V>
        : V;
    }
  : V;

type T4 = TupleToNestedObject<['a', 'b', 'c'], 1>;
type T5 = TupleToNestedObject<['a', 'b', number, 'c'], 1>;
type T6 = TupleToNestedObject<['a', 'b', undefined, 'c'], 1>;

// 为什么后面还有个 as P extends keyof any ? P : never 的重映射呢？
// 因为比如 null、undefined 等类型是不能作为索引类型的 key 的，就需要做下过滤，如果是这些类型，就返回 never，否则返回当前 Key。

// 四、PartialObjectPropByKeys
// 把一个索引类型的某些 Key 转为 可选的，其余的 Key 不变
type PartialObjectPropByKeys<
  T extends Record<string, any>,
  P extends keyof any,
> = Omit<Partial<Pick<T, Extract<keyof T, P>>> & Omit<T, P>, never>;

type T7 = PartialObjectPropByKeys<
  {
    a: number;
    b: number;
  },
  'a'
>;

export {};
