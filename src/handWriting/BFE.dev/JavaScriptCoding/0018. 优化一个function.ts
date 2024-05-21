// items是一个array
// 包含的元素有 >=3 个属性

let items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'blue', type: 'book', age: 17 },
];

// 一个由key和value组成的array
const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
];

// 上述excludeItems方法是什么用途?
// 上述方法是否和设想的一样在运作?
// 上述方法的时间复杂度是?
// 你能否优化以下?

function excludeItems(items, excludes) {
  const mp = new Map();
  for (const { k, v } of excludes) {
    if (!mp.has(k)) {
      mp.set(k, new Set());
    }
    mp.get(k).add(v);
  }

  return items.filter((item) => {
    return Object.keys(item).every(
      (key) => !mp.has(key) || !mp.get(key).has(item[key])
    );
  });
}

console.log(excludeItems(items, excludes));
