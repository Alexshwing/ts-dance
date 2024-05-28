type LargerThan<
  A extends number,
  B extends number,
  Count extends any[] = [],
> = Count['length'] extends A
  ? false
  : Count['length'] extends B
  ? true
  : LargerThan<A, B, [...Count, unknown]>;
