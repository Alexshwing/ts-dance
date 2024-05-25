/**
给定一个只含有如下括号的字符串

小括号: ( or )
方括号: [ or ]
花括号: { or }
请完成一个方法来检测其是否有效。

“有效”意味着其括号必须成对匹配，并且是有效的顺序。


validate('{}[]()') 
// true

validate('{[()]}') 
// true

validate('{[}]') 
// false, they are not in the right order

validate('{}}') 
// false, last `}` is not paired with `{`
 */
function validate(s) {
  const mp = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  const stk = [];
  for (const ch of s) {
    if (ch in mp) {
      if (!stk || stk[stk.length - 1] !== mp[ch]) {
        return false;
      }
      stk.pop();
    } else {
      stk.push(ch);
    }
  }
  return stk.length === 0;
}
