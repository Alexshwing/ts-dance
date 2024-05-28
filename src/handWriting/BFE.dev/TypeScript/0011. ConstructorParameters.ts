type MyConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer R) => any ? R : never;
