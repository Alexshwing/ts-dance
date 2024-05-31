// @ts-nocheck
/*
Promise 在现在的web app开发中已经是无处不在来，很难想象很久以前我们是如何处理Callback Hell 的。

你能否实现一个类似Promise的MyPromise ？

至少需要满足以下要求

新建promise: new MyPromise((resolve, reject) => {})
链式调用 : MyPromise.prototype.then() then handlers 需要是异步调用
rejection处理 MyPromise.prototype.catch()
静态方法: MyPromise.resolve()， MyPromise.reject()
这是个略有挑战的问题，建议先仔细掌握Promise的方方面面。
*/

class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(func) {
    this.PromiseState = MyPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult);
              } else {
                const x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.PromiseResult);
              } else {
                const x = onRejected(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      } else if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult);
            } else {
              const x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.PromiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult);
            } else {
              const x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    // your code here
    return this.then(undefined, onRejected);
  }

  resolve(value) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.FULFILLED;
      this.PromiseResult = value;
      this.onFulfilledCallbacks.forEach((callback) => {
        callback(value);
      });
    }
  }

  reject(value) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.REJECTED;
      this.PromiseResult = value;
      this.onRejectedCallbacks.forEach((callback) => {
        callback(value);
      });
    }
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

/**
 * @param {*} promise2: promise1.then 方法返回新的 promise 对象
 * @param {*} x: promise1 中的 onfulfilled 或 onRejected 返回值
 * @param {*} resolve: promise2 的 resolve 方法
 * @param {*} reject: promise2 的 reject 方法
 * @return {*}
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    throw new TypeError('type error');
  }

  if (x instanceof MyPromise) {
    x.then((y) => resolvePromise(promise2, y, resolve, reject), reject);
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then;
    } catch (error) {
      return reject(error);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        if (called) {
          return;
        }
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}
