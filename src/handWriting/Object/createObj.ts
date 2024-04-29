interface Person {
  name: string;
  getName: () => void;
}
// 1. 工厂模式
// ! 缺点: 对象无法识别, 因为所有的实例都指向一个原型

{
  function createPerson(name: string) {
    const obj = new Object() as Person;
    obj.name = name;
    obj.getName = function () {
      console.log(this.name);
    };
    return obj;
  }

  const p1 = createPerson('alex');
  console.log(p1);
  p1.getName();
}

// 2. 构造函数模式
// 优点: 实例可以识别为一个特定类型
// 缺点: 每次创建实例时, 每个方法都要被创建一次
{
  function Person(this: Person, name: string) {
    this.name = name;
    this.getName = function () {
      console.log(this.name);
    };
  }
  console.log('-------------------');
  const p1 = new Person('alex');
  console.log(p1);
}

// 3.1 原型模式
// 优点: 方法不会重新创建
// 缺点: 1. 所有属性和方法都共享 2. 不能初始化参数
{
  function Person2(this: Person) {}

  Person2.prototype.name = 'alex';
  Person2.prototype.getName = function () {
    console.log(this.name);
  };
  console.log('-------------------');
  const p2 = new Person2();
  p2.getName();
}

// 3.2 原型模式优化
// 改善: 实例可以通过 constructor 属性找到所属构造函数
{
  function Person3(this: Person) {}

  Person3.prototype = {
    constructor: Person3,
    name: 'alex',
    getName: function () {
      console.log(this.name);
    },
  };
  console.log('-------------------');
  const p3 = new Person3();
  p3.getName();
}

// 4. 组合模式(构造函数模式 + 原型模式)
// 优点: 该共享的共享, 该私有的私有
// 缺点: 封装性不足
{
  function Person4(this: Person, name: string) {
    this.name = name;
  }
  Person4.prototype = {
    constructor: Person4,
    getName: function () {
      console.log(this.name);
    },
  };
  const p4 = new Person4('alex');
  console.log('-------------------');
  console.log(p4);
  p4.getName();
}

// 5. 寄生构造函数
{
  function Person5(name: string) {
    const obj = new Object() as Person;
    obj.name = name;
    obj.getName = function () {
      console.log(this.name);
    };
    return obj;
  }

  const p1 = Person5('alex');
  console.log('-------------------');
  console.log(p1 instanceof Person5); // false
  console.log(p1 instanceof Object); // true
}

export {};
