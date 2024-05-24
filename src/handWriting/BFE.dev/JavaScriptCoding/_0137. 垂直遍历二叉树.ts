// function traverse(root) {
//   // Base case
//   if (!root) return [];

//   let nodes = {};
//   let minimum = 0,
//     maximum = 0; // Keep track of min, max x coordinate

//   // DFS so we explore the leftmost side to ensure sorted
//   function dfs(node, x, y, parent) {
//     if (!nodes.hasOwnProperty(x)) {
//       nodes[x] = [[node.value, y, parent]];
//     } else {
//       nodes[x].push([node.value, y, parent]);
//     }

//     minimum = Math.min(minimum, x);
//     maximum = Math.max(maximum, x);

//     if (node.left) {
//       dfs(node.left, x - 1, y + 1, x);
//     }
//     if (node.right) {
//       dfs(node.right, x + 1, y + 1, x);
//     }
//   }
//   dfs(root, 0, 0);

//   let res = [];
//   for (let i = minimum; i <= maximum; i++) {
//     // Sort by y-value first, then parents' position
//     nodes[i].sort((n1, n2) => {
//       return n1[1] - n2[1] || n1[2] - n2[2];
//     });
//     res = res.concat(nodes[i].map((e) => e[0]));
//   }
//   return res;
// }

function traverse(root) {
  const A = [];
  function dfs(root, x, y) {
    if (!root) {
      return;
    }
    A.push([root.value, x, y]);
    if (root.left) {
      dfs(root.left, x - 1, y + 1);
    }
    if (root.right) {
      dfs(root.right, x + 1, y + 1);
    }
  }

  dfs(root, 0, 0);

  return A.sort((a, b) => a[1] - b[1] || a[2] - b[2] || a[0] - b[0]).map(
    (item) => item[0]
  );
}

/*
[2,6,10,1,4,5,8,9,3,7,11] but got 
[2,6,10,1,4,5,9,8,3,7,11]
*/
