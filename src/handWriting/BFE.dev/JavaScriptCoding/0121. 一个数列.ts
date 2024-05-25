/**
按照以下规则可以生成一个数列。

'1'，第一个是1
'11'，前一个数包含1个1
'21'，前一个数包含2个1
'1211'，前一个数包含1个2，1个1
'111221'，前一个数包含1个1，1个2和2个1
'312211'，前一个数包含3个1，2个2和1个1
....
也就是说通过计数前面的数字可以得到下一个数。

请实现getNthNum(n)来返回该数列中的第n个数，n从1开始。
 */
function getNthNum(n) {
  let ans = '1';
  while (--n) {
    let tmp = '';
    const m = ans.length;
    for (let i = 0; i < m; i += 1) {
      let j = i;
      while (j < m && ans[j] === ans[i]) {
        j += 1;
      }
      tmp += String(j - i) + ans[i];
      i = j - 1;
    }
    ans = tmp;
  }
  return ans;
}

console.log(getNthNum(1));
console.log(getNthNum(2));
console.log(getNthNum(3));
console.log(getNthNum(4));
console.log(getNthNum(5));
console.log(getNthNum(6));
