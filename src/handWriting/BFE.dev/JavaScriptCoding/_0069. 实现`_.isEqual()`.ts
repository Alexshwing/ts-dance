function isObj(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(a, b) {}

// _.isEqual可以用来深度比较复杂的数据类型。

// 你能实现一个自己的isEqual吗?

// lodash 的实现支持了很多种数据类型。在该问题中，你只需要支持

// 基础数据类型
// 简单 objects (object literals)
// 数组
// Objects在比较时只需要考虑可枚举属性，且不用考虑prototype中的属性。

// const a = {a: 'bfe'}
// const b = {a: 'bfe'}

// isEqual(a, b) // true
// a === b // false

// const c = [1, a, '4']
// const d = [1, b, '4']

// isEqual(c, d) // true
// c === d // false
// Lodash 版本有些奇怪的行为 (github issue)，比如如下的代码。

// const a = {}
// a.self = a
// const b = {self: a}
// const c = {}
// c.self = c
// const d = {self: {self: a}}
// const e = {self: {self: b}}
// lodash.isEqual 返回了如下结果。注意到有一个false的case。

// // result from lodash implementation
// _.isEqual(a, b) // true
// _.isEqual(a, c) // true
// _.isEqual(a, d) // true
// _.isEqual(a, e) // true
// _.isEqual(b, c) // true
// _.isEqual(b, d) // true
// _.isEqual(b, e) // false
// _.isEqual(c, d) // true
// _.isEqual(c, e) // true
// _.isEqual(d, e) // true
// 先不考虑lodash所提到的性能问题，你的代码不能有上述问题，也就是说上述例子需要全部返回true，并且不能产生maximum call stack size exceeded的error。

export {};
