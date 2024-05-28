type ReverseTuple<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseTuple<Rest>, First]
  : [];
