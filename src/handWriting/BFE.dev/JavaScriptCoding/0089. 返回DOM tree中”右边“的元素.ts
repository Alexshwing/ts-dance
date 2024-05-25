function nextRightSibling(root, target) {
  let dq = [root];
  while (dq) {
    const tmp = [];
    const n = dq.length;
    for (let i = 0; i < n; i += 1) {
      let p = dq[i];
      if (p === target) {
        return dq[i + 1] || null;
      }

      for (const ch of p.children) {
        tmp.push(ch);
      }
    }
    dq = tmp;
  }
  return null;
}
