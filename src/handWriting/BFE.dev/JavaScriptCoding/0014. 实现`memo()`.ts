// Memoization 是应用广泛的性能优化的手段，如果你开发过React应用，你一定不会对React.memo感到陌生。
// Memoization在算法题目中也经常用到，如果你可以用递归解决某个问题，那么很多时候加上Memoization可以得到更好的解法，甚至最终引导到动态规划的解法。
// 那么，请实现你自己的memo() 函数。传入相同的参数的时候，直接返回上一次的结果而不经过计算。

// const func = (arg1, arg2) => {
//   return arg1 + arg2
// }

// const memoed = memo(func)

// memoed(1, 2)
// // 3， func 被调用

// memoed(1, 2)
// // 3，func 未被调用

// memoed(1, 3)
// // 4，新参数，func 被调用
// 参数有可能不是字符串，所以你的memo()需要能接受第三个决定缓存key的参数，有点类似于_.memoize() 。

// const memoed = memo(func, () => 'samekey')

// memoed(1, 2)
// // 3，func被调用，缓存key是 'samekey'

// memoed(1, 2)
// // 3，因为key是一样的，3被直接返回，func未调用

// memoed(1, 3)
// // 3，因为key是一样的，3被直接返回，func未调用
// 默认的key可以用Array.from(arguments).join('_')。

function memo<T extends (...args: any[]) => any>(
  func: T,
  resolver: (...args: Parameters<T>) => string
): T {
  const mp = new Map();
  return function (this: any, ...args: Parameters<T>) {
    const key = resolver ? resolver(...args) : Array.from(args).join('_');
    if (mp.has(key)) {
      return mp.get(key);
    }
    const value = func.apply(this, args);
    mp.set(key, value);
    return value;
  } as T;
}
