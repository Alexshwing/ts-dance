/*
请完成一个class name生成函数 并满足以下要求
仅使用字母: a - z , A - Z
调用一次返回一个类名
返回的类名序列需要满足: 先短后长，相同长度按照字母排序（小写字母优先）
同时提供一个reset函数
*/

function decimalToBase52(decimal) {
  let base52 = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while (decimal >= 0) {
    let remainder = decimal % 52;
    base52 = characters[remainder] + base52;
    decimal = Math.floor(decimal / 52) - 1;
  }

  return base52;
}

let idx = 0;
function getUniqueClassName(): string {
  const ans = decimalToBase52(idx);
  idx += 1;
  return ans;
}

getUniqueClassName.reset = function () {
  idx = 0;
};
