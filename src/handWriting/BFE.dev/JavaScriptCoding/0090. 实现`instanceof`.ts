function myInstanceOf(obj, target) {
  if (obj == null || typeof obj != 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(obj);
  return proto === target.prototype ? true : myInstanceOf(proto, target);
}

class A {}
class B extends A {}

const b = new B();
myInstanceOf(b, B); // true
myInstanceOf(b, A); // true
myInstanceOf(b, Object); // true

function C() {}
myInstanceOf(b, C); // false
C.prototype = B.prototype;
myInstanceOf(b, C); // true
C.prototype = {};
myInstanceOf(b, C); // false
