/*
`模式匹配做提取`
Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。
*/

// 一、数组
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;
type T1 = GetFirst<[1, 2, 3, 4, 5]>;

// any 和 unknown 的区别
// any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值
// 而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）
// 类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。

// 二、字符串
type StartWith<
  T extends string,
  Pre extends string,
> = T extends `${Pre}${string}` ? true : false;
type T2 = StartWith<'123', '12'>;
type T3 = StartWith<'123', '13'>;

// 三、函数
type GetParmeters<Fn extends Function> = Fn extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type T4 = GetParmeters<(a: string, b: boolean, c: number) => any>;

type GetReturnType<Fn extends Function> = Fn extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;
type T5 = GetReturnType<() => number>;
// 参数类型可以是任意类型，也就是 any[]（注意，这里不能用 unknown，因为参数类型是要赋值给别的类型的，而 unknown 只能用来接收类型，所以用 any

class Person {
  name: string;
  constructor() {
    this.name = 'alex';
  }
  say(this: Person) {
    console.log(this.name);
  }
}
const alex = new Person();
alex.say();

alex.say.call({ name: 'tom' }); // Argument of type '{ name: string; }' is not assignable to parameter of type 'Person'. Property 'say' is missing in type '{ name: string; }' but required in type 'Person'.(2345)

type GetThisParmeterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : unknown;

type T6 = GetThisParmeterType<typeof alex.say>;

// 四、构造器
// 构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new。
interface Person {
  name: string;
}
interface PersonConstructor {
  new (name: string): Person;
}

// 提取构造器实例类型
type GetInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer InstanceType
  ? InstanceType
  : any;

type T7 = GetInstanceType<PersonConstructor>;

// 五、索引类型
type GetRefProps<T> = 'ref' extends keyof T
  ? T extends { ref?: infer R | undefined }
    ? R
    : never
  : never;

type T8 = GetRefProps<{ ref?: 1 }>;
type T9 = GetRefProps<{ ref?: undefined }>;

// 通过 keyof T 取出 T 的所有索引构成的联合类型，判断下 ref 是否在其中，也就是 'ref' extends keyof T
// 在 ts3.0 里面如果没有对应的索引，Obj[Key] 返回的是 {} 而不是 never，所以这样坐下兼容处理。

export {};
