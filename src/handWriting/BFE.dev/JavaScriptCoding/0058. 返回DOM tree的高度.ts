// Tree的高度是指从根结点开始到叶节点最大的层数。空根结点的高度是0。

// 给定一个DOM tree，能否返回它的高度？

// 比如如下的DOM tree的高度是4。

// <div>
//   <div>
//     <p>
//       <button>Hello</button>
//     </p>
//   </div>
//   <p>
//     <span>World!</span>
//   </p>
// </div>
// 你能否用递归，也能不用递归解决该问题？

function getHeight(tree: any) {
  if (!tree) {
    return 0;
  }
  let ans = 0;
  for (const child of tree.children) {
    ans = Math.max(getHeight(child), ans);
  }
  return ans + 1;
}
