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

type LargerThan<
  A extends number,
  B extends number,
  Count extends any[] = [],
> = Count['length'] extends A
  ? false
  : Count['length'] extends B
  ? true
  : LargerThan<A, B, [...Count, unknown]>;

type Between<T extends number, L extends number, R extends number> = LargerThan<
  L,
  T
> extends true
  ? false
  : LargerThan<T, Subtract<R, 1>> extends true
  ? false
  : true;

type Slice<
  A extends any[],
  S extends number = 0,
  E extends number = A['length'],
  Count extends unknown[] = [],
  Res extends any[] = [],
> = A extends [infer First, ...infer Rest]
  ? Between<Count['length'], S, E> extends true
    ? Slice<Rest, S, E, [...Count, unknown], [...Res, First]>
    : Slice<Rest, S, E, [...Count, unknown], Res>
  : Res;

type A = Slice<[1, 2, 3, 4], 0, 2>; // [1, 2]
type B = Slice<[1, 2, 3, 4], 2>; // [3, 4]
type C = Slice<[number, boolean, bigint], 2, 5>; // [bigint]
type D = Slice<[string, boolean], 0, 1>; // [string]
type E = Slice<[number, boolean, bigint], 5, 6>; // []
export {};
