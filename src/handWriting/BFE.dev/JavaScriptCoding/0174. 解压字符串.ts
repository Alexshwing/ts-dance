const isNumeric = (s: string) => !isNaN(parseFloat(s)) && isFinite(Number(s));

function uncompress(s: string): string {
  const stk = [];
  for (const ch of s) {
    if (ch !== ')') {
      stk.push(ch);
    } else {
      // 找字符串
      let word = '';
      while (stk.length && stk[stk.length - 1] !== '(') {
        word = stk.pop() + word;
      }
      stk.pop();
      // 找次数
      let count = '';
      while (stk.length && isNumeric(stk[stk.length - 1])) {
        count = stk.pop() + count;
      }
      stk.push(word.repeat(Number(count)));
    }
  }
  return stk.join('');
}
console.log(uncompress('3(ab)')); // 'ababab'
console.log(uncompress('3(ab2(c))')); // 'abccabccabcc'
