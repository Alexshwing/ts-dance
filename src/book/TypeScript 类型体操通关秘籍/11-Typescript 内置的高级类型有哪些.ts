// 1. `Parameters` 提取函数类型的参数类型
type _Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type T1 = _Parameters<(a: number, b: string, c: boolean) => {}>;

// 2. `ReturnType` 提取函数类型的返回值类型
type _ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

type T2 = _ReturnType<() => number>;

// 3. `ConstructorParameters` 提取构造器参数类型
type _ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;

interface PersonConstructor {
  new (name: string): Person;
}
type T3 = _ConstructorParameters<PersonConstructor>;

// 4. `InstanceType` 提取构造器返回值类型
type _InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;

type T4 = _InstanceType<PersonConstructor>;

// 5. `ThisParameterType` 提取函数 this
type Person = {
  name: 'alexshwing';
};
function hello(this: Person, age: number) {
  console.log(this.name);
}

type _ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : never;

type T5 = _ThisParameterType<typeof hello>;

// 6. `OmitThisParameter` 删除 this 类型
type _OmitThisParameter<T> = unknown extends _ThisParameterType<T>
  ? T
  : T extends (...args: infer P) => infer R
  ? (...args: P) => R
  : T;

type T6 = _OmitThisParameter<typeof hello>;

// 7. `Partial` 索引变可选
type _Partial<T> = {
  [P in keyof T]?: T[P];
};

type T7 = _Partial<{ name: string }>;

// 8. `Requried` 索引变必选
type _Required<T> = {
  [P in keyof T]-?: T[P];
};

type T8 = _Required<{ name?: string }>;

// 9. `Readonly`
type _Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type T9 = _Readonly<{ name: string }>;

// 10. `Pick` 映射类型的语法用于构造新的索引类型，在构造的过程中可以对索引和值做一些修改或过滤。
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type T10 = _Pick<{ name: string; age: number; msg: string }, 'name' | 'age'>;

// 11. `Record` 创建索引类型, 传入键和值
type _Record<K extends keyof any, V> = {
  [P in K]: V;
};

type T11 = _Record<'name' | 'msg', string>;
type T12 = _Record<number, string>; // { [x: number]: string; }
// 传入 string | number | symbol, 那么创建的就是有可索引签名的索引类型

// 12. `Exclude` 联合类型去除一部分类型
type _Exclede<T, U> = T extends U ? never : T;
type T13 = _Exclede<'a' | 'b', 'a'>;

// 13. `Extract` 联合类型保留一部分类型
type _Extract<T, U> = T extends U ? T : never;
type T14 = _Extract<'a' | 'b', 'b'>;

// 14. `Omit` 去掉这部分索引构造成新的索引类型
type _Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type T15 = _Omit<{ name: string; age: number }, 'age'>;

// 15. `Awaited`
type _Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? _Awaited<V>
    : never
  : T;

type T16 = _Awaited<Promise<Promise<Promise<number>>>>;

// 16. `NonNullable` 判断是否为非空类型(不是 null 或 undefined)
type _NonNullable<T> = T extends null | undefined ? never : T;

type T17 = _NonNullable<null>;
type T18 = _NonNullable<undefined>;
type T19 = _NonNullable<number>;

// 17. Uppercase、Lowercase、Capitalize、Uncapitalize
// 这四个类型是分别实现大写、小写、首字母大写、去掉首字母大写的。
{
  type T1 = Uppercase<'aaa'>;
  type T2 = Lowercase<'AAA'>;
  type T3 = Capitalize<'aaa'>;
  type T4 = Uncapitalize<'AAA'>;
}
// 源码是这样子的
type Uppercase<S extends string> = intrinsic;

type Lowercase<S extends string> = intrinsic;

type Capitalize<S extends string> = intrinsic;

type Uncapitalize<S extends string> = intrinsic;
// intrinsic 这部分类型不是在 ts 里实现的，而是编译过程中由 js 实现的。

export {};
