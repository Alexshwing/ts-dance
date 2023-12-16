/*
`联合分散可简化`
联合类型中的每个类型都是相互独立的，TypeScript 对它做了特殊处理，也就是遇到字符串类型、条件类型的时候会把每个类型单独传入做计算，最后把每个类型的计算结果合并成联合类型
条件类型左边是联合类型的时候就会触法这种处理，叫做分布式条件类型
有两点特别要注意：
A extends A 意义是取出联合类型中的单个类型放入 A
A extends A 才是分布式条件类型， [A] extends [A] 就不是了，只有左边是单独的类型参数才可以。
*/

type Union = 'a' | 'b' | 'c';
type ToUppercase<T extends string> = T extends string ? Uppercase<T> : never;
type T1 = ToUppercase<Union>; // "A" | "B" | "C"

// 判断联合类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type T2 = IsUnion<'a' | 'b'>;
type T3 = IsUnion<'ab'>;

// `A extends A` 触发分布式
// `[B] extends [A]` B 是整个联合类型, A 是单个类型, 自然不成立

// BEM
// bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式
type ArrToUnion = ['a' | 'b' | 'c'][number];

// 字符串类型中遇到联合类型的时候，会每个元素单独传入计算
type BEM<
  Block extends string,
  Element extends string[],
  Modifier extends string[],
> = `${Block}__${Element[number]}--${Modifier[number]}`;

type T4 = BEM<'aaa', ['bb', 'cc', 'dd'], ['111', '222']>;

// AllCombinations
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

//  'A' | 'B' | 'c'，就是 A 和 B、C 组合，B 和 A、C 组合，C 和 A、B 组合。然后组合出来的字符串再和其他字符串组合。
type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;

type T5 = AllCombinations<'a' | 'b' | 'c'>;

export {};
