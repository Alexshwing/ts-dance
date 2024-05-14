var class2type = {};
![
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Object',
  'Error',
  'Null',
  'Undefined',
].map((item) => {
  class2type['[object ' + item + ']'] = item.toLowerCase();
});

function type(obj: any) {
  // null、undefined
  if (obj == null) {
    return obj + '';
  }

  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
}

console.log(type([1, 2]));
console.log(type(null));
console.log(type(undefined));

export {};
