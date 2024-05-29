type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type FindIndex<
  T extends any[],
  E extends any,
  A extends any[] = [],
> = T extends [infer U, ...infer R]
  ? Equal<U, E> extends true
    ? A['length']
    : FindIndex<R, E, [...A, any]>
  : never;
