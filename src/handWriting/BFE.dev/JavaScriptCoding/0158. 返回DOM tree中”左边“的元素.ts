function previousLeftSibling(root: Element, target: Element): Element | null {
  if (root === target) {
    return null;
  }
  let dq = [root];
  while (dq) {
    const tmp = [];
    const n = dq.length;
    for (let i = 0; i < n; i += 1) {
      let p = dq[i];
      for (const ch of p.children) {
        if (ch === target) {
          return tmp[tmp.length - 1] || null;
        }
        tmp.push(ch);
      }
    }
    dq = tmp;
  }
  return null;
}
