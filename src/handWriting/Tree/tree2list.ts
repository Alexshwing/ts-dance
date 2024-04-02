type TreeNode = {
  id: number;
  name: string;
  children?: TreeNode[];
};

function tree2list(tree: Array<TreeNode>) {
  const ans = [];
  function dfs(arr: Array<TreeNode>, depth: number) {
    for (const cur of arr) {
      ans.push({ ...cur, depth });
      if (cur.children && cur.children.length > 0) {
        dfs(cur.children, depth + 1);
      }
    }
  }

  dfs(tree, 0);
  return ans;
}

console.log(
  tree2list([
    {
      id: 1,
      name: 'node-1',
      children: [
        {
          id: 2,
          name: 'node-1-1',
          children: [
            {
              id: 3,
              name: 'node-1-1-1',
              children: [],
            },
            {
              id: 4,
              name: 'node-1-1-2',
            },
          ],
        },
      ],
    },
  ])
);
