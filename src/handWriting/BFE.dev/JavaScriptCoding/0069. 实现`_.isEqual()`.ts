function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

function isEqual(a, b, mp = new Map()) {
  if (!isObject(a) && !isObject(b)) {
    return a === b;
  } else if (!isObject(a) || !isObject(b)) {
    return false;
  }

  if (mp.has(a) && mp.get(a) === b) {
    return true;
  }
  if (mp.get(b) && mp.get(b) === a) {
    return true;
  }
  mp.set(a, b);
  mp.set(b, a);

  for (const key of [...new Set([...Object.keys(a), ...Object.keys(b)])]) {
    if (!(key in a) || !(key in b) || !isEqual(a[key], b[key], mp)) {
      return false;
    }
  }

  return true;
}

const a = [1, 2];
// @ts-ignore
a[2] = a;

const b = [1, 2];
// @ts-ignore
b[2] = b;

console.log(isEqual(a, b));

export {};
