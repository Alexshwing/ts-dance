function nextRightSibling(root, target) {
  let dq = [root];
  while (dq) {
    const tmp = [];
    const n = dq.length;
    for (let i = 0; i < n; i += 1) {
      let p = dq[i];
      for (const ch of p.children) {
        if (tmp.length > 0 && tmp[tmp.length - 1] === target) {
          return ch;
        }
        tmp.push(ch);
      }
    }
    dq = tmp;
  }
  return null;
}
