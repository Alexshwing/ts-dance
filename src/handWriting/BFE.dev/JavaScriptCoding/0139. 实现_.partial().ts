/*

_.partial()类似于Function.prototype.bind() 但是不会固定this 。

请实现partial()。

const func = (...args) => args

const func123 = partial(func, 1,2,3)

func123(4)
// [1,2,3,4]
同时需要支持placeholder。

const _ = partial.placeholder
const func1_3 = partial(func, 1, _, 3)

func1_3(2,4)
// [1,2,3,4]
*/

/**
 * @param {Function} func
 * @param {any[]} args
 * @returns {Function}
 */
function partial(func, ...args) {
  return function (this: any, ...args2) {
    const copyArgs = args.map((arg) =>
      arg === partial.placeholder ? args2.shift() : arg
    );
    return func.call(this, ...copyArgs, ...args2);
  };
}

partial.placeholder = Symbol(); // 任意占位符
