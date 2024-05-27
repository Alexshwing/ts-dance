type MyPartial<T> = {
  [Key in keyof T]?: T[Key];
};
