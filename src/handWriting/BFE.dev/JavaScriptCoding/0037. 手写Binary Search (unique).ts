// 请实现一个二分查找，对象是不重复，升序整数数组。
function binarySearch(arr, target) {
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
  return arr[left] === target ? left : -1;
}
