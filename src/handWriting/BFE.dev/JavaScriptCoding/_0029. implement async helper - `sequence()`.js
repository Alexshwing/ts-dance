/**
 * Your sequence() should accept AsyncFunc array, and chain them up by passing new data to the next AsyncFunc through data in Callback.
 *
 * Can you solve it with and without Promise?
 */

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  // your code here
}

const asyncTimes2 = (callback, num) => {
  setTimeout(() => callback(null, num * 2), 100);
};

const asyncTimes4 = sequence([asyncTimes2, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);
