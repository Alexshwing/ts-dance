/**

Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 
。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），
就返回一个失败的 promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和Promise.all()是相反的。

你能实现自己的Promise.any()吗?

注意

AggregateError 暂时还没有被Chrome支持。但是你仍然可以使用它因为我们在judge你的code时候添加了AggregateError。

你可以这样：

new AggregateError(
  'No Promise in Promise.any was resolved', 
  errors
)
 */

function any(promises) {
  return new Promise((resolve, reject) => {
    const n = promises.length;
    const errors = new Array(n).fill(0);
    let cnt = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => resolve(res))
        .catch((error) => {
          errors[index] = error;
          cnt += 1;
        })
        .finally(() => {
          if (cnt === n) {
            reject(
              // @ts-ignore
              new AggregateError(
                'No Promise in Promise.any was resolved',
                errors
              )
            );
          }
        });
    });
  });
}
export {};
