function trim(s) {
  s = s.split('');
  let i = 0;
  while (i < s.length && s[i] === ' ') {
    s.shift();
  }
  while (s.length > 0 && s[s.length - 1] === ' ') {
    s.pop();
  }
  return s.join('');
}
