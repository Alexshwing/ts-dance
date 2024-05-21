function lastIndex(arr, target) {
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
  return arr[left] === target ? left : -1;
}
