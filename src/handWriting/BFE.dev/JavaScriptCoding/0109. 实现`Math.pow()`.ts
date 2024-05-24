function pow(base, power) {
  if (power < 0) {
    return 1 / pow(base, -power);
  }
  let ans = 1;
  while (power) {
    if (power & 1) {
      ans *= base;
    }
    base *= base;
    power = Math.floor(power / 2);
  }
  return ans;
}

console.log(pow(1, 2));
// 1

console.log(pow(2, 10));
// 1024

console.log(pow(4, -1));
// 0.25
