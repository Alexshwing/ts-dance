type SmallerThan<
  A extends number,
  B extends number,
  Count extends any[] = [],
> = Count['length'] extends A
  ? Count['length'] extends B
    ? false
    : true
  : Count['length'] extends B
  ? false
  : SmallerThan<A, B, [...Count, unknown]>;
