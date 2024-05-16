declare global {
  interface Function {
    mycall(context: any, ...args: any[]): any;
  }
}

Function.prototype.mycall = function (context, ...args) {
  context = Object(context || window);
  context.fn = this;
  var arr = [];
  var len = args.length;
  for (let i = 0; i < len; i += 1) {
    arr.push('args[' + i + ']');
  }
  var res = eval('context.fn(' + arr + ')');
  delete context.fn;
  return res;
};

// const target = {};

// let targetCopied = {};
// let modifiedProp = null;
// const proxy = new Proxy(target, {
//   set(target, prop, val) {
//     if (typeof prop === 'string' || typeof prop === 'number') {
//       // copy
//       target[prop] = 'bfe';
//       targetCopied[prop] = 'bfe';
//     }
//     target[prop] = val;
//   },
// });

// const returnThis = function (this) {
//   return this;
// };

// returnThis.mycall(proxy);

export {};
