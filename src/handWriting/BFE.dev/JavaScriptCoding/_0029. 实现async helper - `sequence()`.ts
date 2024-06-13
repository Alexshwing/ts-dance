/*
该题目和11. 什么是Composition?实现pipe()有些类似。

请实现一个async helper - sequence()。sequence()像pipe() 那样将异步函数串联在一起。

本题目中的所有异步函数是如下interface。

type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void
你的sequence()需要能接受一个AsyncFunc 数组，并且通过callback将之串联在一起。

假设我们有一个异步函数把数字乘以2

const asyncTimes2 = (callback, num) => {
   setTimeout(() => callback(null, num * 2), 100)
}
sequence() 需要使以下成为可能

const asyncTimes4 = sequence(
  [
    asyncTimes2,
    asyncTimes2
  ]
)

asyncTimes4((error, data) => {
   console.log(data) // 4
}, 1)
当Error发生的时候，需要直接触发最后的callback，未执行的异步函数需要保持未被调用的状态。

再问问

能否使用Promise完成题目？能否不使用Promise完成该题目？

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
