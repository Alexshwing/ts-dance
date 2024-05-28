type Flat<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flat<First>, ...Flat<Rest>]
    : [First, ...Flat<Rest>]
  : [];
