function count(str: string): string | string[] {
  const mp = new Map<string, number>();
  let mx = 0;
  for (const ch of str) {
    mp.set(ch, (mp.get(ch) || 0) + 1);
    mx = Math.max(mx, mp.get(ch));
  }

  let ans = [];
  for (const [k, v] of mp) {
    if (v === mx) {
      ans.push(k);
    }
  }
  return ans.length > 1 ? ans : ans[0];
}

console.log(count('abbccc'));

console.log(count('abbcccddd'));

export {};
