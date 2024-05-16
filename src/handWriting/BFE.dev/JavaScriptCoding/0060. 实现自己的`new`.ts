const myNew = (constructor: any, ...args: any[]) => {
  const obj = Object.create({});
  obj.__proto__ = constructor.prototype;
  var res = constructor.apply(obj, args);
  return typeof res === 'object' ? res : obj;
};
