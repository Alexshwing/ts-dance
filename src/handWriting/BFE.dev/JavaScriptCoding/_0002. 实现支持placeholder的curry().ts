// This is a JavaScript coding problem from BFE.dev

interface Curry {
  (fn: (...args: any[]) => any): (...args: any[]) => any;
  placeholder: Symbol;
}

const curry: Curry = (fn) => {
  // your code here
};

curry.placeholder = Symbol();

// test
const join = (a: any, b: any, c: any) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
const _ = curry.placeholder;

curriedJoin(1, 2, 3); // '1_2_3'

curriedJoin(_, 2)(1, 3); // '1_2_3'

curriedJoin(_, _, _)(1)(_, 3)(2); // '1_2_3'
