// 你是否遇到过一些有分页的API，然后需要按顺序进行调用的情况？

// 假设我们又一个 /list API，这个API返回 items数组。

// // fetchList 已经提供给你了，直接可用
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>
// 第一个request，直接调用fetchList，从response中取得最后一个item的id - lastItemId
// 2.调用fetchList(lastItemId)获取下一个response 3.重复上述过程

// /list API 一次只返回5个item，加上一些过滤，实际的返回值中可能比5更少。如果一个都没有返回的话，就意味着服务器已经没有可以返回的了，我们需要停止调用。

// 请实现一个函数用来获取任意数量的item

// const fetchListWithAmount = (amount: number = 5) { }
// 注意

// 你可以通过常规的循环来解决这个问题，也可以使用更高级的async iterators or async generators，请尽量都尝试下。

// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

// you can change this to generator function if you want
const fetchListWithAmount = async (amount = 5) => {
  // your code here
};
