function compare(v1: string, v2: string): 0 | 1 | -1 {
  const A = v1.split('.').map(Number);
  const B = v2.split('.').map(Number);

  const n = A.length;
  let i = 0;
  while (i < n) {
    if (A[i] > B[i]) {
      return 1;
    }
    if (A[i] < B[i]) {
      return -1;
    }
    i += 1;
  }
  return 0;
}
console.log(compare('12.1.0', '12.0.9'));
// 1

console.log(compare('12.1.0', '12.1.2'));
// -1

console.log(compare('5.0.1', '5.0.1'));
// 0

export {};
