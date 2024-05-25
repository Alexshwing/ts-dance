/*
罗马数字(Roman numerals) 由如下7种记号排列而成。

Symbol	I	V X	  L	   C	D	  M
Value	 1	5	10	50	100	500	1000
Standard form表示中，subtractive notation 将发生作用，意味着4 是IV 而不是IIII，9 是IX而不是VIIII，该规则适用于40(XL)和 900(CM)等等。

简单来说，罗马数字遵从如下规则。

记号从左往右，值从大到小进行排列。
从左往右，如果下一个记号的值更大，则代表减法，否则是加法。
请实现romanToInteger()，传入的罗马数字字符串均为有效。

 */
function romanToInteger(s) {
  const mp = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let ans = 0;
  const n = s.length;
  for (let i = 0; i < n; i += 1) {
    const isNeg = i + 1 < n && mp[s[i]] < mp[s[i + 1]] ? -1 : 1;
    ans += isNeg * mp[s[i]];
  }
  return ans;
}

console.log(romanToInteger('CXXIII')); // 123
console.log(romanToInteger('MCMXCIX')); // 1999
console.log(romanToInteger('MMMCDXX')); // 3420
