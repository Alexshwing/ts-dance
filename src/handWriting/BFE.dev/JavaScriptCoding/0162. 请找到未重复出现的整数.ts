function findSingle(A: number[]): number {
  return A.reduce((prev, cur) => prev ^ cur, 0);
}
