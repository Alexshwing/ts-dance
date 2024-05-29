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

type Multiply<
  A extends number,
  B extends number,
  Res extends any[] = [],
> = B extends 0
  ? Res['length']
  : Multiply<A, Subtract<B, 1>, [...Res, ...BuildArr<A>]>;

export {};
