type TupleToString<T extends string[]> = T extends [
  infer First,
  ...infer Rest extends string[],
]
  ? `${First & string}${TupleToString<Rest>}`
  : '';
