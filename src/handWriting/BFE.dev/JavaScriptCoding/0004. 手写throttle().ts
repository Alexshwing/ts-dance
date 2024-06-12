function throttle<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let waiting = false,
    last = null;
  function startCooling(this: any) {
    setTimeout(() => {
      if (last) {
        func.apply(this, last);
        last = null;
        startCooling();
      } else {
        waiting = false;
      }
    }, wait);
  }

  return function (this: any, ...args: any[]) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;
      startCooling.apply(this);
    } else {
      last = args;
    }
  } as T;
}

export {};
