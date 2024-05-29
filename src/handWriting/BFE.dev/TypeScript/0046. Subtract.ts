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

export {};
