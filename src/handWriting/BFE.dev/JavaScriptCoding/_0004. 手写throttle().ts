// This is a JavaScript coding problem from BFE.dev
function throttle<T extends (...args: any[]) => any>(
  this: any,
  func: T,
  wait: number
): T {
  let timer = null;
  return ((...args: any) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
      timer = null;
    }, wait);
  }) as T;
}

export {};
