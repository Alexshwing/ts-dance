// 假如你在写一些CSS，需要决定颜色码。你可以选择16进制表示的#fff 或者 函数格式rgba(255,255,255,1)。

// 请完成一个函数，将16进制格式的颜色转换为函数格式。

// hexToRgb('#fff')
// 'rgba(255,255,255,1)'
// Alpha 通道的小数部分请限制在最多2位，需要的话请round up。
// 别忘了做参数有效性检测

function hexToRgba(hex: string): string {
  const validChars = /^#[a-fA-F\d]+$/.test(hex);
  const validLength = [4, 5, 7, 9].includes(hex.length);

  if (!validLength || !validChars) {
    throw new Error('Invalid HEX');
  }

  const [r, g, b, a = 255] = hex
    .toLowerCase()
    .split('')
    .slice(1)
    .reduce((a, c) => `${a}${hex.length < 7 ? c.repeat(2) : c}`, '')
    .match(/(..)/g)
    .map((hex) => parseInt(hex, 16));

  return `rgba(${r},${g},${b},${Math.round((a / 255) * 100) / 100})`;
}
