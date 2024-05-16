// 如果我们要从query中提取数据的话，可以使用 URLSearchParams ，非常方便。

// 你能否自己实现一个和URLSearchParams基本一样的MyURLSearchParams？

// const params = new MyURLSearchParams('?a=1&a=2&b=2')
// params.get('a') // '1'
// params.getAll('a') // ['1', '2']
// params.get('b') // '2'
// params.getAll('b') // ['2']

// params.append('a', 3)
// params.set('b', '3')
// params.toString() // 'a=1&a=2&b=3&a=3'

class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {}

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {}

  /**
   * @params {string} name
   */
  delete(name) {}

  /**
   * @returns {Iterator}
   */
  entries() {}

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {}

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {}

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {}

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {}

  /**
   * @return {Iterator}
   */
  keys() {}

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {}

  // sor all key/value pairs based on the keys
  sort() {}

  /**
   * @return {string}
   */
  toString() {}

  /**
   * @return {Iterator} values
   */
  values() {}
}
