/*
Promise.all(iterable) 方法返回一个 Promise 实例，
此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）
如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果。
*/

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  return new Promise((resolve, reject) => {
    const ans = [];
    const n = promises.length;
    if (n === 0) {
      resolve(ans);
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then((res) => {
        ans.push(res);
        if (ans.length === n) {
          resolve(ans);
        }
      }, reject);
    });
  });
}
