type BuildArr<
  N extends number,
  Count extends any[] = [],
> = Count['length'] extends N ? Count : BuildArr<N, [...Count, unknown]>;

type Add<A extends number, B extends number> = [
  ...BuildArr<A>,
  ...BuildArr<B>,
]['length'];
