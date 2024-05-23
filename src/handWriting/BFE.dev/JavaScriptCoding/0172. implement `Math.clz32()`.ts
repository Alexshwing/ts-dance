// Math.clz32() 返回数字二进制表示的开头的0的个数。
function clz32(num: number): number {
  let ans = 0;
  for (let i = 31; i >= 0; i -= 1) {
    if ((num >> i) & 1) {
      break;
    }
    ans += 1;
  }
  return ans;
}

console.log(clz32(1)); // 31
console.log(clz32(10000)); // 18
console.log(clz32(25.45)); // 27
