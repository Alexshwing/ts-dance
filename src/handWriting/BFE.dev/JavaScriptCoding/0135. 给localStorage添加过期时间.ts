/*
localStorage是简单方便的client-side storage，但是因为其是synchronous，所以localStorage尽量不要使用。

同时，Safari的 ITP 的影响下，如果safari7天以上被使用但是你的网页并没有被交互，那么client-side script-writable storage 将会被删除，localStorage当然也是对象。

和Cookie不同，localStorage并没有过期的概念。

本题中，请实现使localStorage支持过期的wrapper。

myLocalStorage.setItem('bfe', 'dev', 1000)
myLocalStorage.getItem('bfe')
// 'dev'
1秒过后:

myLocalStorage.getItem('bfe')
// null
FYI

为了避免security error，本题中的localStorage被替换为了BFE的实现版本。不过因为interface一致，所以你其实并不需要在意。笑
*/

window.myLocalStorage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },

  setItem(key, value, maxAge) {
    if (maxAge) {
      return;
    }
    window.localStorage.setItem(key, value);
    if (maxAge > 0) {
      setTimeout(() => this.removeItem(key), maxAge);
    }
  },

  removeItem(key) {
    window.localStorage.removeItem(key);
  },

  clear() {
    window.localStorage.clear();
  },
};
