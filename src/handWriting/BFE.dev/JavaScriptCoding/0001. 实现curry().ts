type Curry = (fn: (...args: any[]) => any) => (...args: any[]) => any;

const curry: Curry = (fn) => {
  return function curryFn(...args: any[]) {
    return args.length >= fn.length
      ? fn(...args)
      : (...args2: any[]) => curryFn(...args, ...args2);
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
