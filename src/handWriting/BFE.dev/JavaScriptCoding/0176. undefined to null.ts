function undefinedToNull(arg) {
  if (!(typeof arg === 'object' && arg !== null)) {
    return arg || null;
  }
  for (const [k, v] of Object.entries(arg)) {
    if (v === undefined) {
      arg[k] = null;
    } else {
      arg[k] = undefinedToNull(v);
    }
  }
  return arg;
}
console.log(undefinedToNull({ a: undefined, b: 'BFE.dev' }));
// {a: null, b: 'BFE.dev'}

console.log(undefinedToNull({ a: ['BFE.dev', undefined, 'bigfrontend.dev'] }));
// {a: ['BFE.dev', null, 'bigfrontend.dev']}

console.log(
  undefinedToNull({
    a: undefined,
    b: {
      c: {
        d: undefined,
        e: ['BFE.dev', undefined],
      },
    },
  }).b.c.e
);
