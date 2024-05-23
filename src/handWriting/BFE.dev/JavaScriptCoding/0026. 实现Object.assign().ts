function objectAssign(target, ...sources) {
  if (target == null) {
    throw new Error();
  }

  target = Object(target);

  for (const obj of sources) {
    if (obj == null) {
      continue;
    }

    for (const key of [
      ...Object.keys(obj),
      ...Object.getOwnPropertySymbols(obj),
    ]) {
      target[key] = obj[key];
      if (target[key] !== obj[key]) {
        throw new Error();
      }
    }
  }
  return target;
}

// objectAssign should only assign enumerable properties
console.log(
  objectAssign(
    {},
    Object.create(
      { a: 3 },
      {
        b: {
          value: 4,
        },
        c: {
          value: 5,
          enumerable: true,
        },
      }
    )
  )
);

// objectAssign should support Symbol
const key = Symbol('key');
const a = {
  [key]: 3,
  b: 4,
};
const target = {};
console.log(objectAssign(target, a));

// numbers in target are wrapped
const num = 3;
console.log(objectAssign(num, { a: 3 }));
console.log(Object.assign(num, { a: 3 }));

// non-string primitives in source are ignored
console.log(objectAssign({}, { a: 3 }, null, undefined, NaN, 1, true));

// exceptions interrupt the ongoing copying task
const target1 = Object.defineProperty({}, 'foo', {
  value: 1,
  writable: false,
}); // target.foo is a read-only property

console.log(
  objectAssign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 })
);
