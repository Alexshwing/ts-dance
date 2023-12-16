// 一. isEqual 为什么要这样写
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

type T1 = IsEqual<true, any>;

// 如果是两个条件类型 `T1 extends A ? X1 : Y1` 和 `T2 extends B ? X2 : Y2` 相关的话, 那 T1 和 T2 相关、X1 和 X2 相关、Y1 和 Y2 相关, 而 A 和 B 相等
// 注意, 这里 A 和 B 是相等的, 不是相关
// 如果是判断相关性的话，任意类型 extends any 都是 true，但通过构造两个条件类型判断相关性，就可以利用 extends 右边部分相等的性质来判断两个类型是否 equal。
// 这就是为什么我们要这样判断两个类型相等，就是利用了两个条件类型判断相关性的时候会判断右边部分是否相等的这个性质，算是一种 hack 的写法。答案要从源码找。

// 二. 为什么我调整了下 extends 左右类型的位置，就报错了 (类型参数默认推导出的是类型约束的类型)
type BuildArr<
  Length extends number,
  Ele = unknown,
  Res extends unknown[] = [],
> =
  // = Length extends Res['length'] ? Res : BuildArr<Length, Ele, [...Res, Ele]>; // 类型实例化过深，且可能无限(❌)
  Res['length'] extends Length ? Res : BuildArr<Length, Ele, [...Res, Ele]>;

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length'];

type T2 = Add<32, 25>;

declare function func<T>(param: T): Promise<T>;
type res = Parameters<typeof func>; // type res = [param: unknown]
// 类型编程中如果需要取类型参数做一些计算的时候，默认推导出的是约束的类型，如果没有类型约束，那就是 unknown。

declare function func2<T extends number>(param: T): Promise<T>;
type res2 = Parameters<typeof func2>; // type res = [param: number]

// 所以上面 Add 那个类型里取 A 和 B 传入 BuildArray 做计算的话，其实传入的是 number
// number extends 某个具体的数字自然永远不成立，永远是 false，所以就无限递归了。反过来写就不会有这个问题。

// 三、几个条件类型的特殊情况
// 1. 联合类型有分布式条件类型的特性，会分发传入
type Test1<T> = T extends number ? 1 : 2;
type r1 = Test1<1 | 'a'>; // 1 | 2

// 2. 因为 boolean 也是联合类型，是 true | false，所以也会触发分布式条件类型
type Test2<T> = T extends true ? 1 : 2;
type r2 = Test2<boolean>; // 1 | 2

// 3. any 会直接返回 trueType 和 falseType 的联合类型
type r3 = Test2<any>; // 1 | 2

// 4. never 会直接返回 never，严格来说这个也是分布式条件类型的一种情况
type r4 = Test2<never>; // never

export {};
