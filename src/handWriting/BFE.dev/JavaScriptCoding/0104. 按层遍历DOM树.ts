function flatten(root) {
  if (!root) {
    return [];
  }
  let dq = [root];
  const ans = [];
  while (dq.length) {
    const p = dq.shift();
    ans.push(p);
    for (const ch of p.children) {
      dq.push(ch);
    }
  }
  return ans;
}

/*
function flatten(root) {
  const result = [];
  if (!root) {
    return result;
  }
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const child of node.children) {
      queue.push(child);
    }
  }
  return result;
}

*/
