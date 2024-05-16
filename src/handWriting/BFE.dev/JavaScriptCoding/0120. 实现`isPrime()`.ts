function isPrime(x) {
  if (x <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.floor(x / i); i += 1) {
    if (x % i == 0) {
      return false;
    }
  }
  return true;
}
