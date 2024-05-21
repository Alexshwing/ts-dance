// 在一个字符串的二维数组中，有一个隐藏字符串。

// I B C A L K A
// D R F C A E A
// G H O E L A D
// 可以按照如下步骤找出隐藏消息

// 1. 从左上开始，向右下前进
// 2. 无法前进的时候，向右上前进
// 3. 无法前进的时候，向右下前进
// 2和3的重复
// 无法前进的时候，经过的字符就就是隐藏信息

// 比如上面的二维数组的话，隐藏消息是IROCLED

// 注：如果没有的话，返回空字符串

function decode(A: string[][]): string {
  if (A.length === 0) {
    return '';
  }

  const n = A.length,
    m = A[0].length;

  const isValid = (x: number, y: number) => 0 <= x && x < n && 0 <= y && y < m;

  const ans: string[] = [];
  let i = 0,
    j = 0,
    di = 1;

  while (isValid(i, j)) {
    ans.push(A[i][j]);
    if (!isValid(i + di, j + 1)) {
      di *= -1;
    }
    i += di;
    j += 1;
  }

  return ans.join('');
}
