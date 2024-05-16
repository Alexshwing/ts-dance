const count = (() => {
  let cnt = 0;
  const fn = () => ++cnt;
  fn.reset = () => (cnt = 0);
  return fn;
})();

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3

count.reset();

console.log(count()); // 1
console.log(count()); // 2
console.log(count()); // 3
