// 以下是spyOn需要完成的内容。
// spy被调用的时候，原来的method也需要被调用。
// spy需要又一个calls数组，数组中含有所有调用的参数

function spyOn(obj, methodName) {
  // your code here
}

const obj = {
  data: 1,
  increment(num) {
    this.data += num;
  },
};

const spy = spyOn(obj, 'increment');

obj.increment(1);

console.log(obj.data); // 2

obj.increment(2);

console.log(obj.data); // 4

console.log(spy.calls);
// [ [1], [2] ]

export {};
