type ObjectPaths<O extends Record<string, any>> = O;

type Obj = {
  a: {
    b: {
      c: 1;
      d: 2;
    };
    e: 1;
  };
  f: 3;
};

type A = ObjectPaths<Obj>;
// 'a.b.c' | 'a.b.d' | 'a.e' | 'f'

export {};
