/**
 * 本题目中你需要实现一个增强的debounce()，使其支持第三个参数option: {leading: boolean, trailing: boolean}
 * leading: 是否立即执行
 * trailing: 是否在冷却后执行
 */

function debounce<T extends (...args: any[]) => any>(
  this: any,
  func: T,
  wait: number,
  option: { leading: boolean; trailing: boolean } = {
    leading: false,
    trailing: true,
  }
): T {
  let timer: any = null;
  return ((...args: any[]) => {
    let isInvoked = false;
    // 首次调用
    if (timer === null && option.leading) {
      func.apply(this, args);
      isInvoked = true;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      // 需要函数未被调用过
      if (option.trailing && !isInvoked) {
        func.apply(this, args);
      }
      timer = null;
    }, wait);
  }) as T;
}
