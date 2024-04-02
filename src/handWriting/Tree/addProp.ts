type TreeNode = {
  name: string;
  idx?: number;
  children?: TreeNode[];
};

function addProp(tree: Array<TreeNode>, PropName: string, index: number = 0) {
  return tree.map((item) => ({
    ...item,
    [PropName]: index++,
    children: item.children ? addProp(item.children, PropName, index) : [],
  }));
}

console.log(
  addProp(
    [
      {
        name: 'node-1',
        children: [
          {
            name: 'node-2',
            children: [{ name: 'node-3' }],
          },
          {
            name: 'node-4',
          },
        ],
      },
    ],
    'idx'
  )
);

export {};
