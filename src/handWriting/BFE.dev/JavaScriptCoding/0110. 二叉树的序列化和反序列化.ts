class Node {
  value: number;
  left: null | Node;
  right: null | Node;
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

function serialize(root) {
  const ans = [];
  function dfs(root) {
    if (!root) {
      ans.push('#');
      ans.push(',');
    } else {
      ans.push(root.val + '');
      ans.push(',');
      dfs(root.left);
      dfs(root.right);
    }
  }

  dfs(root);
  return ans.join('');
}

function deserialize(s) {
  const n = s.length;
  let u = 0;

  function dfs() {
    if (s[u] === '#') {
      u += 2;
      return null;
    }
    let k = u + 1;
    while (k < n && s[k] !== ',') {
      k += 1;
    }
    let root = new Node(Number(s.slice(u, k)));
    u = k + 1;
    root.left = dfs();
    root.right = dfs();
    return root;
  }

  return dfs();
}
export {};
