type MyRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
