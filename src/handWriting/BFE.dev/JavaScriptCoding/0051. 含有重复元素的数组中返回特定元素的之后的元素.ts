function elementAfter(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2);
    if (arr[mid] <= target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }
  return arr[left] === target && left + 1 < arr.length
    ? arr[left + 1]
    : undefined;
}

console.log(elementAfter([1, 2, 3, 4, 4, 4, 4, 100, 1000, 10000], 4));
