function compress(s) {
  let ans = '';
  const n = s.length;
  for (let i = 0; i < n; i += 1) {
    let j = i;
    while (j < n && s[j] === s[i]) {
      j += 1;
    }
    ans += s[i] + (j - i === 1 ? '' : String(j - i));
    i = j - 1;
  }

  return ans;
}

console.log(compress('a')); // 'a'
console.log(compress('aa')); // 'a2'
console.log(compress('aaa')); // 'a3'
console.log(compress('aaab')); // 'a3b'
console.log(compress('aaabb')); // 'a3b2'
console.log(compress('aaabba')); // 'a3b2a'
