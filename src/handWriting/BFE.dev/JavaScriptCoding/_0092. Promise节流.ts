/*

假设你需要调用100个API获取数据，并且需要越快越好。

如果使用Promise.all()，100个请求会同时到达你的服务器，如果你的服务器性能很低的话，这就会是个负担。

请 节流API请求，使得任何时刻最多只有5个请求正在进行中。

你需要实现一个throttlePromises() 函数来达到目的。这个函数接受一个promise生成函数的数组，和一个同一时刻进行中的API请求最大数量。


throttleAsync(callApis, 5).then((data) => {
  // 数据和使用`Promise.all`得到的 一样
}).catch((err) => {
  // 发生错误的时候，也和`Promise.all`的行为一样
})
执行上述代码过后，因为任何时候都不会超过5个API请求在进行，性能低下的服务器得救了。

*/

// /**
//  * @param {() => Promise<any>} func
//  * @param {number} max
//  * @return {Promise}
//  */
// function throttlePromises(funcs, max) {
//   const results = [];
//   async function doWork(iterator) {
//     for (let [index, item] of iterator) {
//       const result = await item();
//       results[index] = result;
//     }
//   }
//   const iterator = Array.from(funcs).entries();
//   const workers = Array(max).fill(iterator).map(doWork); // maps over asynchronous fn doWork, which returns array of results for each promise
//   return Promise.all(workers).then(() => results);
// }

async function throttlePromises(funcs, max) {
  const ans = [];
  async function doWork(iterator) {
    for (const [index, item] of iterator) {
      const res = await item();
      ans[index] = res;
    }
  }
  const iterator = Array.from(funcs).entries();
  const workers = Array(max).fill(iterator).map(doWork);
  return Promise.all(workers).then(() => ans);
}
