type MyThisParameterType<T> = T extends (this: infer R, ...args: any) => any
  ? R
  : never;
