/**
 * class Node {
 *  new(val: number, next: Node);
 *    val: number
 *    next: Node
 * }
 */

/**
 * @param {Node} list
 * @return {Node}
 */
// const _reverseLinkedList = (cur) => {
//   let pre = null;
//   while (cur) {
//     let ne = cur.next;
//     cur.next = pre;
//     pre = cur;
//     cur = ne;
//   }
//   return pre;
// };

const reverseLinkedList = (cur) => {
  if (!cur || !cur.next) {
    return cur;
  }
  const res = reverseLinkedList(cur.next);
  cur.next.next = cur;
  cur.next = null;
  return res;
};
