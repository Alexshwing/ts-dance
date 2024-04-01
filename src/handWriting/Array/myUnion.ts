const arr9 = [1, 1, '1', '1', NaN, NaN, {}, {}];

// 1. set
// [ 1, '1', NaN, {}, {} ]
// 可以去重 NaN, 不能去重空对象
console.log('1. set');
console.log(Array.from(new Set(arr9)));

// 2. indexof
// [ 1, '1', NaN, NaN, {}, {} ]
// 不能去重 NaN, 空对象
const ans1 = [];
for (const x of arr9) {
  if (ans1.indexOf(x) === -1) {
    ans1.push(x);
  }
}
console.log('2. indexof');
console.log(ans1);

// 3. includes
// [ 1, '1', NaN, {}, {} ]
// 可以去重 NaN, 不能去重空对象
const ans2 = [];
for (const x of arr9) {
  if (!ans2.includes(x)) {
    ans2.push(x);
  }
}
console.log('3. includes');
console.log(ans2);

// 4. filter + 空对象
// [ 1, '1', NaN, {} ]
const obj = {};
// typeof item + item 解决 '1' 和 1 无法去重问题
const ans3 = arr9.filter((item) =>
  obj.hasOwnProperty(typeof item + item)
    ? false
    : (obj[typeof item + item] = true)
);
console.log('4. filter + 空对象');
console.log(ans3);
