function intersect(A, B) {
  const n = A.length,
    m = B.length;
  let i = 0,
    j = 0;

  const ans: Array<number> = [];
  while (i < n && j < m) {
    if (A[i] > B[j]) {
      j += 1;
    } else if (A[i] === B[j]) {
      ans.push(A[i]);
      i += 1;
      j += 1;
    } else {
      i += 1;
    }
  }
  return ans;
}

console.log(intersect([1, 2, 2, 3, 4, 4], [2, 2, 4, 5, 5, 6, 2000]));
// [2,2,4])
