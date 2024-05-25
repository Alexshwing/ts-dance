/*
罗马数字(Roman numerals) 由如下7种记号排列而成。

Symbol	I	V	 X	L  	C	   D	 M
Value	  1	5	10	50	100	500	1000
Standard form表示中，subtractive notation 将发生作用，意味着4 是IV 而不是IIII，9 是IX而不是VIIII，该规则适用于40(XL)和 900(CM)等等。

简单来说，罗马数字遵从如下规则。

记号从左往右，值从大到小进行排列。
从左往右，如果下一个记号的值更大，则代表减法，否则是加法。
请实现integerToRoman()，传入的整数都在有效范围内。


integerToRoman(123)
// 'CXXIII'

integerToRoman(1999)
// 'MCMXCIX'

integerToRoman(3420)
// 'MMMCDXX'
*/

function integerToRoman(num: number): string {
  const V = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const C = [
    'M',
    'CM',
    'D',
    'CD',
    'C',
    'XC',
    'L',
    'XL',
    'X',
    'IX',
    'V',
    'IV',
    'I',
  ];

  const ans = [];
  const n = C.length;
  for (let i = 0; i < n; i += 1) {
    while (num >= V[i]) {
      num -= V[i];
      ans.push(C[i]);
    }
  }
  return ans.join('');
}
