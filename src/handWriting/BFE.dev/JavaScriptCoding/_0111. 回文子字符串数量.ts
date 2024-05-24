function countPalindromicSubstr(s) {
  // const n = s.length;
  // const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  // for (let len = 1; len <= n; len += 1) {
  //   for (let l = 0; l + len - 1 < n; l += 1) {
  //     let r = l + len - 1;
  //     if (len === 1) {
  //       dp[l][r] = 1;
  //     } else if (len === 2) {
  //       dp[l][r] = s[l] == s[r] ? 2 : 1;
  //     } else {
  //       dp[l][r] =
  //         s[l] == s[r]
  //           ? dp[l + 1][r - 1] + 1
  //           : Math.max(dp[l + 1][r], dp[l][r - 1]);
  //     }
  //   }
  // }
  // return dp[0][n - 1];
}
