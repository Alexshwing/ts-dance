type Filter<T extends any[], A> = T extends [infer First, ...infer Rest]
  ? [First] extends [A]
    ? [First, ...Filter<Rest, A>]
    : Filter<Rest, A>
  : [];
