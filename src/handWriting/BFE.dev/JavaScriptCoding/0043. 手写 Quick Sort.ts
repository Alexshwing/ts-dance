function quickSort(A: number[]) {
  const n = A.length;

  function dfs(l: number, r: number) {
    if (l >= r) {
      return;
    }
    let i = l - 1,
      j = r + 1,
      x = A[Math.floor((l + r) / 2)];
    while (i < j) {
      do {
        i += 1;
      } while (A[i] < x);
      do {
        j -= 1;
      } while (A[j] > x);
      if (i < j) {
        let tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
      }
    }
    dfs(l, j);
    dfs(j + 1, r);
  }

  dfs(0, n - 1);
  return A;
}

console.log(quickSort([4, 2, 100, 99, 10000, -1, 99, 2]));
