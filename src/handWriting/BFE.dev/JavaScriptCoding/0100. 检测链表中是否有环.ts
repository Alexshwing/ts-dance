/**
 * @param {Node} head
 * @return {boolean}
 */
function hasCircle(head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }

  return false;
}
