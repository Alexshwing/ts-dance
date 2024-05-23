function topK(A: number[], k: number): number[] {
  const n = A.length;
  function dfs(l: number, r: number, k: number) {
    if (l >= r) {
      return;
    }
    let i = l - 1,
      j = r + 1,
      x = A[Math.floor((l + r) / 2)];
    while (i < j) {
      do {
        i += 1;
      } while (A[i] > x);
      do {
        j -= 1;
      } while (A[j] < x);
      if (i < j) {
        let tmp = A[i];
        A[i] = A[j];
        A[j] = tmp;
      }
    }
    let len = j - l + 1;
    if (k <= len) {
      dfs(l, j, k);
    } else {
      dfs(j + 1, r, k - len);
    }
  }

  dfs(0, n - 1, k);
  return A.slice(0, k);
}
