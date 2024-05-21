function elementBefore(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return arr[left] === target && left - 1 >= 0 ? arr[left - 1] : undefined;
}

console.log(elementBefore([1, 2, 3, 4, 4, 4, 4, 100, 1000, 10000], 4));
