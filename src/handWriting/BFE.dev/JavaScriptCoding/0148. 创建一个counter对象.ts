// 请创建一个含有属性count的object。count 的初始值为0，每次取值的时候自增1。
function createCounter(): { count: number } {
  return new Proxy(
    { count: 0 },
    {
      get: (obj, prop) => obj[prop]++,
      set: () => false,
    }
  );
}

const counter = createCounter();
console.log(counter.count); // 0
console.log(counter.count); // 1
console.log(counter.count); // 2
counter.count = 100; // 変更はできない
console.log(counter.count); // 3
