function O(this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
}
O.prototype.score = 10;
O.prototype.say = function () {
  console.log('I am ' + this.name);
};

function objectFactory(...args: any) {
  var obj: any = new Object();
  // 取出构造函数
  var constructor = [].shift.call(arguments);
  // obj 原型指向构造函数, 这样 obj 可以访问构造函数原型中的属性
  obj.__proto__ = constructor.prototype;
  // 改变构造函数 this 指向, obj 就可以访问构造函数中的属性
  var res = constructor.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}

var p1 = new O('alex', 20);
console.log(p1);
p1.say();

var p2 = objectFactory(O, 'alex', 20);
console.log(p2);
p2.say();

export {};
