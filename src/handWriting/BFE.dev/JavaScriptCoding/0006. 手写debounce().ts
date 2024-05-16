function debounce<T extends (...args: any[]) => any>(
  this: any,
  func: T,
  wait: number
): T {
  let timer = null;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), wait);
  }) as T;
}

export {};
