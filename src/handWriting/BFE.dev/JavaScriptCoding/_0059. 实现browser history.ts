// 当前你访问 BFE.dev 所使用的浏览器，想必你一定很熟悉。

// 浏览器中关于history的常见操作有

// new BrowserHistory() - 打开一个新的tab的时候，会有一个新的空history
// goBack() - 回到上一个地址，注意当前地址会被保留，使得forward()可以帮助我们返回
// forward() - 前往之前访问过的地址
// visit() - 当你输入一个新的地址，或者点击一个链接的时候，会添加一个新的记录不过可以forward()前往的地址会被消除
// 假设我们打开一个新tab，这是一个空的history。

// [ ]
// 按顺序访问A, B, C

// [ A, B, C]
//         ↑
// 当前我们正在C，可以goBack() 回到 B，然后继续 goBack()到A

// [ A, B, C]
//   ↑
// forward()过后，我们前进到B

// [ A, B, C]
//      ↑
// 这个时候如果访问一个新的url D，因为我们在B，所以C被消除。

// [ A, B, D]
//         ↑
// 请你实现一个BrowserHistory来模拟上述逻辑。

class BrowserHistory {
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {}
  /**
   * @param { string } url
   */
  visit(url) {}

  /**
   * @return {string} current url
   */
  get current() {}

  // go to previous entry
  goBack() {}

  // go to next visited url
  forward() {}
}
