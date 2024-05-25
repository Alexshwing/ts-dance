function smallestUniqueSubstr(s) {
  const mp = new Map();
  for (const ch of s) {
    mp.set(ch, (mp.get(ch) || 0) + 1);
  }

  const ans = [];
  const st = new Set();
  for (const ch of s) {
    mp.set(ch, mp.get(ch) - 1);
    if (st.has(ch)) {
      continue;
    }
    while (
      ans.length > 0 &&
      ch.charCodeAt(0) <= ans[ans.length - 1].charCodeAt(0) &&
      mp.get(ans[ans.length - 1]) > 0
    ) {
      st.delete(ans.pop());
    }
    ans.push(ch);
    st.add(ch);
  }
  return ans.join('');
}

console.log(smallestUniqueSubstr('bab'));
