// 给定两个完全一样的DOM Tree A和B，以及A中的元素a，请找到B中对应的元素b。

// 补充说明

// 这个问题可以出在一般的树结构上，DOM Tree只是一个特例。

// 你能否既通过递归也能通过迭代来解决该问题。

// 既然是DOM Tree，能否提供一个利用到DOM tree特性的解法？

// 你的解法的时空复杂度是多少？

/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const _findCorrespondingNode = (rootA, rootB, target) => {
  if (rootA === target) {
    return rootB;
  }

  for (let i = 0; i < rootA.children.length; i += 1) {
    const res = _findCorrespondingNode(
      rootA.children[i],
      rootB.children[i],
      target
    );
    if (res) {
      return res;
    }
  }
  return null;
};

// ! 利用 DOM tree 特性
//@see https://developer.mozilla.org/zh-CN/docs/Web/API/TreeWalker
const findCorrespondingNode = (rootA, rootB, target) => {
  const rootAWalk = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const rootBWalk = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  let res = [rootAWalk.currentNode, rootBWalk.currentNode];

  while (res[0] !== target) {
    res = [rootAWalk.nextNode(), rootBWalk.nextNode()];
  }
  return res[1];
};
