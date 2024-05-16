type Func = (arg: any) => any;

const times = (y: any) => (x: any) => x * y;
const plus = (y: any) => (x: any) => x + y;
const subtract = (y: any) => (x: any) => x - y;
const divide = (y: any) => (x: any) => x / y;

function pipe(funcs: Array<Func>): Func {
  return (args: any) => funcs.reduce((prev, fn) => fn(prev), args);
}

// test
pipe([times(2), times(3)]);
// x * 2 * 3

pipe([times(2), plus(3), times(4)]);
// (x * 2 + 3) * 4

pipe([times(2), subtract(3), divide(4)]);
// (x * 2 - 3) / 4
