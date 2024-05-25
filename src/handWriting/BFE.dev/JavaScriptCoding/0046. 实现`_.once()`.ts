// @ts-nocheck
function once(func) {
  let called = false,
    result = null;
  return function (...args) {
    if (!called) {
      result = func.apply(this, args);
      called = true;
    }
    return result;
  };
}
