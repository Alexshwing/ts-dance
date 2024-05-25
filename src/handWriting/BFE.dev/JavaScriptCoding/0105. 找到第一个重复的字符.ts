/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicate(s) {
  let mask = 0;
  for (const ch of s) {
    const v = ch.charCodeAt(0) - '0'.charCodeAt(0);
    if ((mask >> v) & 1) {
      return ch;
    }
    mask |= 1 << v;
  }

  return null;
}
