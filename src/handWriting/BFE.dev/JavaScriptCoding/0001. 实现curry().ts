// This is a JavaScript coding problem from BFE.dev
type Curry = (fn: (...args: any[]) => any) => (...args: any[]) => any;

const curry: Curry = (fn) => {
  return function curryInner(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...args2: any[]) => curryInner(...args, ...args2);
    }
  };
};

// test
const join = (a: any, b: any, c: any) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2, 3)); // '1_2_3'
console.log(curriedJoin(1, 2)(3)); // '1_2_3'

export {};
