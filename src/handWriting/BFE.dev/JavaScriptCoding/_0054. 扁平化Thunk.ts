/*
假设我们有这样的Callback

type Callback = 
  (error: Error, result: any | Thunk) => void
Thunk是接受Callback为参数的函数。

type Thunk = (callback: Callback) => void
比如如下的3个thunk

const func1 = (cb) => {
  setTimeout(() => cb(null, 'ok'), 10)
}

const func2 = (cb) => {
  setTimeout(() => cb(null, func1), 10)
}

const func3 = (cb) => {
  setTimeout(() => cb(null, func2), 10)
}
在上述的代码中，3个函数在某种意义上被串在了一起， func3 → func2 → func1，不过暂时还无法工作，我们需要额外的“胶水”。

好了，现在请你实现flattenThunk()提供“胶水”让其工作。

flattenThunk(func3)((error, data) => {
   console.log(data) // 'ok'
})
注意

当Error发生时，尚未被调用的函数需要被跳过。

*/

function flattenThunk(thunk) {}
