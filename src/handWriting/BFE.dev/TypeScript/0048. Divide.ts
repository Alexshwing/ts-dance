type BuildArr<
  N extends number,
  Count extends any[] = [],
> = Count['length'] extends N ? Count : BuildArr<N, [...Count, unknown]>;

type Subtract<A extends number, B extends number> = BuildArr<A> extends [
  ...BuildArr<B>,
  ...infer Rest,
]
  ? Rest['length']
  : never;

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

type Divide<
  A extends number,
  B extends number,
  Res extends any[] = [],
> = B extends 0
  ? never
  : SmallerThan<A, B> extends true
  ? Res['length']
  : Divide<Subtract<A, B>, B, [...Res, unknown]>;

type A = Divide<1, 0>; // never
type B = Divide<4, 2>; // 2
type C = Divide<10, 3>; // 3
export {};
