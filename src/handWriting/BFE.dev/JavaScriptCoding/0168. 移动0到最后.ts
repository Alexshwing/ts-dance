// This is a JavaScript coding problem from BFE.dev

function moveZeros(A: Array<any>): void {
  const n = A.length;
  let i = 0;
  for (let j = 0; j < n; j += 1) {
    if (A[j]) {
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
      i += 1;
    }
  }
}

console.log(moveZeros([1, 0, 0, 2, 3])); // [1,2,3,0,0]
