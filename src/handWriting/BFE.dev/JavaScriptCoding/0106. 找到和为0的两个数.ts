function findTwo(arr) {
  const mp = new Map();
  const n = arr.length;
  for (let i = 0; i < n; i += 1) {
    if (mp.has(-arr[i])) {
      return [mp.get(-arr[i]), i];
    }
    mp.set(arr[i], i);
  }
  return null;
}
