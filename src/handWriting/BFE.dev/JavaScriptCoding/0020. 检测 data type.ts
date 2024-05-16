// 这是个简单的问题。
// 对于JavaScript中的所有基础数据类型，请实现一个方法进行检测。
// 除了基础数据类型之外，你的方法需要额外支持常见的类型包括Array、ArrayBuffer、Map、 Set、Date 和 Function。
// 该题目的目标并不是想要你列举出所有数据类型，而是想要你证明你能解决该类型的问题。

function detectType(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

detectType(1); // 'number'
detectType(new Map()); // 'map'
detectType([]); // 'array'
detectType(null); // 'null'
