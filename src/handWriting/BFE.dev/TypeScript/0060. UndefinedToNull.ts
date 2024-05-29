type UndefinedToNull<T> = T extends undefined
  ? null
  : T extends object
  ? { [Key in keyof T]: UndefinedToNull<T[Key]> }
  : T;

type A = UndefinedToNull<string>; // string
type B = UndefinedToNull<undefined>; // null
type C = UndefinedToNull<[undefined, null]>; // [null, null]
type D = UndefinedToNull<{
  a: undefined;
  b: [1, undefined];
}>; // {a: null, b: [1, null]}

export {};
