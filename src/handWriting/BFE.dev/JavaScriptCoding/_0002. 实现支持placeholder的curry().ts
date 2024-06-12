interface Curry {
  (fn: (...args: any[]) => any): (...args: any[]) => any;
  placeholder: Symbol;
}

/*
function curry(func) {
  return function curried(...args) {
    const complete =
      args.length >= func.length &&
      !args.slice(0, func.length).includes(curry.placeholder);
    if (complete) return func.apply(this, args);
    return function (...newArgs) {
      // replace placeholders in args with values from newArgs
      const res = args.map((arg) =>
        arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg
      );
      return curried(...res, ...newArgs);
    };
  };
}
*/

const curry: Curry = (fn) => {};

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
