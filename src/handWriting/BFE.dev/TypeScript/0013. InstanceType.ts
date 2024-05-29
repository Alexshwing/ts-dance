type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer InstanceType
  ? InstanceType
  : never;
