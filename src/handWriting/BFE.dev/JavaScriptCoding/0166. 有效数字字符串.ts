/*
请实现一个函数判定字符串是否为有效数字

「有效」是指下面的三种格式之一。

整数，比如'0'、''。
小数， 比如''、''。
科学记数法，比如 
BigInt、 Infinity、NaN　以及10进制意外的表示等等情况不需要考虑。同时请注意符号+和-。

说明
BFE.dev中的测试用例并不以包含所有可能为目标。这个问题并不是为了测试你对JavaScript的spec的理解。

请和面试官确认问题的scope，并给出合适的算法解。

你能否不使用isNaN()来解决该问题？
*/

/*
按 e/E 划分
左边可以是整数或小数, 右边必须是小数
判断整数或小数: +/- 在头部, .最多出现一次, 数字出现至少一次
*/

function validateNumberString(s: string): boolean {
  const n = s.length;
  let idx = -1;
  for (let i = 0; i < n; i += 1) {
    if (s[i] === 'e' || s[i] === 'E') {
      if (idx === -1) {
        idx = i;
      } else {
        return false;
      }
    }
  }

  function check(l: number, r: number, mustInt: boolean): boolean {
    if (l > r) {
      return false;
    }
    if (s[l] === '+' || s[l] === '-') {
      l += 1;
    }
    let hasDot = false,
      hasNum = false;
    for (let i = l; i <= r; i += 1) {
      if (s[i] === '.') {
        if (hasDot || mustInt) {
          return false;
        }
        hasDot = true;
      } else if (
        0 <= s[i].charCodeAt(0) - '0'.charCodeAt(0) &&
        s[i].charCodeAt(0) - '0'.charCodeAt(0) <= 9
      ) {
        hasNum = true;
      } else {
        return false;
      }
    }
    return hasNum;
  }

  let ans = true;
  if (idx !== -1) {
    ans = ans && check(0, idx - 1, false) && check(idx + 1, n - 1, true);
  } else {
    ans = ans && check(0, n - 1, false);
  }

  return ans;
}

['0', '-1', '1.0', '-2.335', '-12.3e45', '99e2.5'].map((item) => {
  console.log(validateNumberString(item));
});
