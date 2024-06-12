/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  return new Promise((resolve) => {
    const ans = new Array(promises.length);
    const n = promises.length;
    if (n === 0) {
      resolve(ans);
    }
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((value) => {
          ans.push({
            status: 'fulfilled',
            value,
          });
        })
        .catch((reason) => {
          ans.push({
            status: 'rejected',
            reason,
          });
        })
        .finally(() => {
          if (ans.length === n) {
            resolve(ans);
          }
        });
    });
  });
}
