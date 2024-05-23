function findKThLargest(A, k) {
  const n = A.length;
  function dfs(l, r, k) {
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
  return A[k - 1];
}

console.log(findKThLargest([4, 4, 1, 3, 4, 4, 2, 5], 3));
