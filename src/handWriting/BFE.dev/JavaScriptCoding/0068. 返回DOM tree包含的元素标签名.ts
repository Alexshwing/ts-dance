// 给定一个DOM tree，返回其中包含的所有的标签名。
// 你的代码需要返回一个不含重复内容的小写字符数组，顺序不影响判定。

function getTags(tree) {
  const ans = new Set();
  function dfs(root) {
    if (!root) {
      return;
    }
    ans.add(root.tagName.toLowerCase());
    for (const child of root.children) {
      dfs(child);
    }
  }

  dfs(tree);
  return Array.from(ans);
}
