// 假定有n (n > 0) 颗石子。

// 玩家A和B轮流取石子，一次可以取1个或两个，A先取。

// 谁取到最后一颗石子即为输。

// 请问 A或者B是否有必赢策略? 如果有请返回能必赢的玩家名。没有则返回null。

function canWinStonePicking(n: number): 'A' | 'B' | null {
  // your code here
}

console.log(canWinStonePicking(1)); // 'B'
console.log(canWinStonePicking(2)); // 'A'
console.log(canWinStonePicking(3)); // 'A'
console.log(canWinStonePicking(4)); // 'B'
