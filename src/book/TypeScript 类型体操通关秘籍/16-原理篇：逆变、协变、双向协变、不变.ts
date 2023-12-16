// ts 通过给 js 添加了静态类型系统来保证了类型安全，大多数情况下不同类型之间是不能赋值的，但是为了增加类型系统灵活性，设计了父子类型的概念。
// 父子类型之间自然应该能赋值，也就是会发生型变（variant）。
// 这种“型变”分为两种，一种是子类型可以赋值给父类型，叫做协变（covariant），一种是父类型可以赋值给子类型，叫做逆变（contravariant）。

// 一、协变(covariant): 子类型可以赋值给父类型
// 为什么支持协变: 类型系统支持父子类型, 那如果子类型还不能赋值给父类型, 还叫父子类型么
interface Person {
  name: string;
  age: number;
}
interface Alex {
  name: string;
  age: number;
  hobbies: string[];
}
let p: Person = {
  name: '',
  age: 20,
};
let alex: Alex = {
  name: 'alex',
  age: 20,
  hobbies: ['play', 'cat'],
};

p = alex;

// 二、逆变(contravariant): 逆变主要是函数赋值的时候函数参数的性质，参数的父类型可以赋值给子类型，这是因为按照子类型来声明的参数，访问父类型的属性和方法自然没问题，依然是类型安全的。
let printHobbies: (alex: Alex) => void = (alex) => {
  console.log(alex.hobbies);
};

let printName: (person: Person) => void = (person) => {
  console.log(person.name);
};

printHobbies = printName;
// 为什么不报错? 因为这个函数调用时是按照 Alex 来约束的类型, 但实际上函数只用到父类型 Person 的属性和方法, 当然不会有问题, 依然类型安全
// 这就是逆变，函数的参数有逆变的性质（而返回值是协变的，也就是子类型可以赋值给父类型）

// printName = printHobbies;
// 为什么报错? 因为函数在声明时按照 Person 来约束类型, 但是调用的时候按照 Alex 的类型来访问的属性和方法, 那自然不类型安全, 所以就会报错

// 应用
// 我们通过构造了多个函数类型，然后模式提取参数类型的方式，来实现了联合转交叉，这里就是因为函数参数是逆变的，会返回联合类型的几个类型的子类型，也就是更具体的交叉类型。
type UnionToIntersection<T> = (
  T extends T ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type T7 = UnionToIntersection<{ a: 1 } | { b: 2 }>;

// 逆变和协变都是型变，是针对父子类型而言的，非父子类型自然就不会型变，也就是不变：
// 三、不变(invariant)
// 非父子类型之间不会发生型变，只要类型不一样就会报错
interface Tom {
  name: string;
  age: number;
}

let tom: Tom = {
  name: 'tom',
  age: 20,
};

// alex = tom; // 报错

// 四、类型父子关系的判断
// Java 类型通过 extends 继承, 如果 A extends B, 那 A 就是 B 的子类型, 这种叫做名义类型系统
// ts 不看这个, 只要结构上一致, 那么就可以确定父子关系, 这种叫做结构类型系统

// 上述 Person 和 Alex 就是父子关系
// 通过结构, "更具体"的就是子类型
// 这里 Alex 有 Person 的所有属性, 并且多一些属性, 所以 Alex 是 Person 的子类型
// 注意这里是"更具体"而不是"更多"
// 判断联合类型父子关系的时候， 'a' | 'b' 和 'a' | 'b' | 'c' 哪个更具体？
// 'a' | 'b' 更具体，所以 'a' | 'b' 是 'a' | 'b' | 'c' 的子类型。
type res = 'a' | 'b' extends 'a' | 'b' | 'c' ? true : false; // true
