// 给定只含有a、b 和 c的字符串，请去掉其中的b 和 ac。
function removeChars(s: string): string {
  const stk: string[] = [];
  const n = s.length;
  for (let i = 0; i < n; i += 1) {
    if (s[i] == 'b') {
      continue;
    } else if (s[i] == 'c' && stk && stk[stk.length - 1] == 'a') {
      stk.pop();
    } else {
      stk.push(s[i]);
    }
  }

  return stk.join('');
}
