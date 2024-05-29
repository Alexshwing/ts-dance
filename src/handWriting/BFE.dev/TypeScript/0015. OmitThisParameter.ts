type MyOmitThisParameter<T> = T extends (this: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
