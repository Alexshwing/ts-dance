function countOne(num) {
  let ans = 0;
  while (num) {
    ans += 1;
    num &= num - 1;
  }
  return ans;
}

// 给定一个整数，请返回其二进制表示下的1的数量。

console.log(countOne(1)); // 1,  "1"
console.log(countOne(257799)); // 12, "111110111100000111"
