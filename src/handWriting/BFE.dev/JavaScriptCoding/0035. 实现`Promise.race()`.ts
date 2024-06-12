/*
该问题有些类似 31. 实现async helper - race()，只不过处理的是Promise。

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。source: MDN

你能实现自己的Promise.race()吗？
*/

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((reason) => reject(reason));
    });
  });
}
