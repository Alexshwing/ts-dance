/**
给定一个字符串，请找出其中不含重复字符的最长子字符串。

如果有多个可选子串，返回任意一个均可。


 */
function longestUniqueSubstr(s) {
  const mp = new Map();
  const n = s.length;
  let l = 0,
    mx = 0,
    ans = '';
  for (let r = 0; r < n; r += 1) {
    mp.set(s[r], (mp.get(s[r]) || 0) + 1);

    while (mp.get(s[r]) > 1) {
      mp.set(s[l], mp.get(s[l]) - 1);
      l += 1;
    }

    if (r - l + 1 > mx) {
      mx = r - l + 1;
      ans = s.slice(l, r + 1);
    }
  }
  return ans;
}

console.log(longestUniqueSubstr('aaaaa'));
// 'a'
console.log(longestUniqueSubstr('abcabc'));
// 'abc', or 'bca', or 'cab'
console.log(longestUniqueSubstr('a12#2'));
// 'a12#'
