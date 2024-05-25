/*

lodash的实现囊括了多种数据类型，简单起见，该题目中你只需要支持：

基础数据类型 及其wrapper object。
简单Object（仅需处理可枚举属性）
数组Array
*/

function cloneDeep(target, mp = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  if (mp.has(target)) {
    return mp.get(target);
  }

  const res = Array.isArray(target) ? [] : {};
  mp.set(target, res);

  for (const key of [
    ...Object.keys(target),
    ...Object.getOwnPropertySymbols(target),
  ]) {
    res[key] = cloneDeep(target[key], mp);
  }

  return res;
}

console.log(cloneDeep({ a: 1 }));
console.log(cloneDeep([1, 2]));
