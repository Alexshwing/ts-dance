function getRandomNumberbyRange(l: number, r: number) {
  return Math.floor(Math.random() * (r - l + 1) + l);
}

function shuffle(arr: any[]): void {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let j = getRandomNumberbyRange(i, n - 1);
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}
