type TreeNode = {
  id: number;
  name: string;
  pid: number;
};

function list2tree(arr: Array<TreeNode>) {
  const ans = [],
    mp = {};
  for (const item of arr) {
    const { id, pid } = item;
    if (!mp[id]) {
      mp[id] = { children: [] };
    }
    mp[id] = { ...item, children: mp[id].children };
    if (pid === 0) {
      ans.push(mp[id]);
    } else {
      if (!mp[pid]) {
        mp[pid] = { children: [] };
      }
      mp[pid].children.push(mp[id]);
    }
  }
  return ans;
}

console.log(
  list2tree([
    { id: 1, name: 'node-1', pid: 0 },
    { id: 2, name: 'node-2', pid: 1 },
    { id: 3, name: 'node-3', pid: 1 },
    { id: 4, name: 'node-4', pid: 3 },
    { id: 5, name: 'node-5', pid: 4 },
    { id: 6, name: 'node-6', pid: 0 },
  ])
);

export {};
