// 请在不利用Map的条件下实现一个Node Store，支持DOM element作为key。
// 你可以实现一个通用的Map polyfill。或者利用以下DOM元素的特性来做文章？

class NodeStore {
  mp: any;
  constructor() {
    this.mp = {};
  }
  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    node.__nodeStoreKey__ = Symbol();
    this.mp[node.__nodeStoreKey__] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.mp[node.__nodeStoreKey__];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return !!this.mp[node.__nodeStoreKey__];
  }
}
