type ObjectPaths<T extends Record<string, any>> = {
  [Key in keyof T]: Key extends string
    ? T[Key] extends Record<string, any>
      ? `${Key}.${ObjectPaths<T[Key]>}`
      : `${Key}`
    : never;
}[keyof T];

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
