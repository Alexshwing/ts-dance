interface Person {
  name?: string;
  age?: number;
  list?: string[];
  getName?: () => void;
}

// 1. 原型链继承
// 缺点:
// 1. 引用类型的属性被所有实例共享
// 2. 创建子实例时, 不能向父实例传参
{
  function Parent(this: Person) {
    this.list = ['a'];
  }

  function Child() {}
  Child.prototype = new Parent();
  const c1 = new Child();
  const c2 = new Child();

  console.log(c1.list); // [ 'a' ]
  console.log(c2.list); // [ 'a' ]
  c1.list.push('b');
  console.log(c1.list); // [ 'a', 'b' ]
  console.log(c2.list); //  [ 'a', 'b' ]
}

// 2. 构造函数(经典继承)
// 优点:
// 1. 避免引用类型的属性被所有实例共享
// 2. 可以在 Child 中向 Parent 传参
// 缺点:
// 方法都在构造函数中定义, 每次创建实例都会创建一遍方法
{
  function Parent(this: Person, name: string) {
    this.name = name;
    this.list = ['a'];
  }

  function Child(this: Person, name: string) {
    Parent.call(this, name);
  }
  const c1 = new Child('alex');
  const c2 = new Child('tom');

  console.log('-------------');
  console.log(c1.name); // alex
  console.log(c2.name); // tom
  console.log(c1.list); // [ 'a' ]
  console.log(c2.list); // [ 'a' ]
  c1.list.push('b');
  console.log(c1.list); // [ 'a', 'b' ]
  console.log(c2.list); // [ 'a' ]
}

// 3. 组合继承(原型链和经典继承双剑合璧)
{
  function Parent(this: Person, name?: string) {
    this.name = name;
    this.list = ['red', 'blue', 'green'];
  }

  function Child(this: Person, name: string, age: number) {
    Parent.call(this, name);
    this.age = age;
  }

  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  console.log('---------------------');
  const c1 = new Child('alex', 10);
  c1.list.push('black');
  console.log(c1.name); // alex
  console.log(c1.age); // 10
  console.log(c1.list); // [ 'red', 'blue', 'green', 'black' ]

  const c2 = new Child('tom', 20);
  console.log(c2.name); // tom
  console.log(c2.age); // 20
  console.log(c2.list); // [ 'red', 'blue', 'green' ]
}

// 4. 原型式继承
// ES5 Object 模拟实现, 将传入对象作为创建对象原型
// 和原型链继承一样, 引用类型的属性值始终都会共享相应的值
{
  function createObj(o: Person) {
    function F() {}
    F.prototype = o;
    return new F();
  }
  const p: Person = {
    name: 'alex',
    list: ['a'],
  };
  console.log('---------------------');
  const c1 = createObj(p);
  c1.list.push('b');
  console.log(c1.list); // [ 'a', 'b' ]
  const c2 = createObj(p);
  console.log(c2.list); // [ 'a', 'b' ]
}

// 5. 寄生式继承
// 创建一个仅用于封装继承过程的函数, 该函数内部以某种形式来做增强对象, 最后返回对象
{
  function createObj(o: Person) {
    const clone = Object.create(o);
    clone.sayName = function () {
      console.log('hi');
    };
    return clone;
  }
  createObj({ name: 'alex', list: [] });
}

// 6.寄生组合式继承
// 如果我们不使用 Child.prototype = new Parent()
// 而是间接的让 Child.prototype 访问到 Parent.prototype
{
  console.log('---------------------');
  function Parent(this: Person, name: string) {
    this.name = name;
    this.list = ['r', 'b', 'g'];
  }

  function Child(this: Person, name: string, age: number) {
    Parent.call(this, name);
    this.age = age;
  }

  // 关键三步
  var F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();

  const c1 = new Child('alex', 10);
  console.log(c1); // Parent { name: 'alex', list: [ 'r', 'b', 'g' ], age: 10 }
}
// 封装处理
{
  console.log('---------------------');
  function Parent(this: Person, name: string) {
    this.name = name;
    this.list = ['r', 'b', 'g'];
  }

  function Child(this: Person, name: string, age: number) {
    Parent.call(this, name);
    this.age = age;
  }

  // 关键三步
  function object(o: Person) {
    var F = function () {};
    F.prototype = o;
    return new F();
  }
  function prototype(child: any, parent: any) {
    const prototype = object(parent.prototype);
    prototype.constructor = Child;
    child.prototype = prototype;
  }
  prototype(Child, Parent);
  const c1 = new Child('alex', 10);
  console.log(c1); // Child { name: 'alex', list: [ 'r', 'b', 'g' ], age: 10 }
}
/*
引用《JavaScript高级程序设计》中对寄生组合式继承的夸赞就是：

这种方式的高效率体现它只调用了一次 Parent 构造函数，
并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

*/

export {};
