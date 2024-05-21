/**
 * @param {number} num
 */
function sum(a) {
  const fn = (b) => sum(a + b);
  fn.valueOf = () => a;
  return fn;
}
