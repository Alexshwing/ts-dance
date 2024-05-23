function getIntersection(A: any[], B: any[]): any[] {
  const s = new Set(A);
  const ans = [];
  for (const x of B) {
    if (s.has(x)) {
      ans.push(x);
      s.delete(x);
    }
  }
  return ans;
}
