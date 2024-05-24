/*
我们首先来看看Error-first callback。

const callback = (error, data) => {
  if (error) {
    // 出错的时候
  } else {
    // 成功的时候
  }
}
现在考虑下以上述callback作为最后一个参数的函数。

const func = (arg1, arg2, callback) => {
  // 一些异步逻辑
  if (hasError) {
    callback(someError)
  } else {
    callback(null, someData)
  }
}
你大概已经猜到要做什么了。请实现promisify()。

const promisedFunc = promisify(func)

promisedFunc().then((data) => {
  // 成功的时候
}).catch((error) => {
  // 出错的时候
})
*/

/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
  return function (this: any, ...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}
