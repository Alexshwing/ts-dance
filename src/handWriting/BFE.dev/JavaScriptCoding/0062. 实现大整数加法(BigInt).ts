function add(num1: string, num2: string): string {
  const ans = [];
  let i = num1.length - 1,
    j = num2.length - 1,
    carry = 0;
  while (i >= 0 || j >= 0 || carry > 0) {
    if (i >= 0) {
      carry += num1[i].charCodeAt(0) - '0'.charCodeAt(0);
      i -= 1;
    }
    if (j >= 0) {
      carry += num2[j].charCodeAt(0) - '0'.charCodeAt(0);
      j -= 1;
    }
    ans.push(carry % 10);
    carry = Math.floor(carry / 10);
  }
  return ans.reverse().join('');
}

console.log(add('999999999999999999', '1') === '1000000000000000000');
// '1000000000000000000'
