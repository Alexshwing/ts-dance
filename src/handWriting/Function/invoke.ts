/**
 * @see https://github.com/mqyqingfeng/Blog/issues/12
 */

declare global {
  interface Function {
    myApply(context: any, argsArray: any[]): any;
    myCall(context: any, ...args: any[]): any;
    myBind(context: any, ...args: any[]): any;
  }
}

// 1. Function.prototype.call
Function.prototype.myCall = function (context: any) {
  var context = context || global;
  context.fn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i += 1) {
    args.push('arguments[' + i + ']');
  }
  var res = eval('context.fn(' + args + ')');
  delete context.fn;
  return res;
};

var foo = {
  value: 1,
};

global.value = 2;
function bar(this: any, name: string, age: number) {
  console.log(this.value);
  console.log(name);
  console.log(age);
  return {
    value: this.value,
    name,
    age,
  };
}

bar.myCall(null);
console.log(bar.myCall(foo, 'alex', 20));
console.log('-------------------------------------');

// 2. Function.prototype.apply
Function.prototype.myApply = function (context: any, arr: any[]) {
  var context = context || global;
  context.fn = this;
  var res = null;
  if (!arr) {
    res = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i += 1) {
      args.push('arr[' + i + ']');
    }
    res = eval('context.fn(' + args + ')');
  }
  delete context.fn;
  return res;
};

function fn2(this: any, ...arr: any[]) {
  console.log(this.value);
  console.log(arr);
}
fn2.myApply(foo, [1, 2, 3]);
console.log('-------------------------------------');

// 3. Function.prototype.bind
// bind 特点: 一个绑定函数也能使用 new 操作符创建对象; 这种行为就像把原函数当成构造器。
// 提供的 this 值被忽略, 同时调用时的参数被提供给模拟函数
Function.prototype.myBind = function (context: any) {
  var self = this;
  // 获取 bind 函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  // 防止在修改 fBound 的 prototype 时也修改绑定函数的 prototype
  // 用空函数中转
  var fNOP = function () {};

  var fBound = function (this: any) {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时, this 指向实例; 当作为普通函数时, this 指向 context
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

var bindFoo = bar.myBind(foo, 'alex');
bindFoo(20);

var bindFoo2 = new bindFoo(20);
console.log(bindFoo2);

export {};
