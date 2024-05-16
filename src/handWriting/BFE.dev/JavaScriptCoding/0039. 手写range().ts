function range(from: any, to: any) {
  return new Array(to - from + 1).fill(0).map((_, index) => index + from);
}

for (let num of range(1, 4)) {
  console.log(num);
}
// 1
// 2
// 3
// 4
