type LargerThan<
  A extends number,
  B extends number,
  Count extends any[] = [],
> = Count['length'] extends A
  ? false
  : Count['length'] extends B
  ? true
  : LargerThan<A, B, [...Count, unknown]>;

type Merge<
  T extends number[],
  Limit extends number,
  Lower extends number[] = [],
  Higher extends number[] = [],
> = T extends [infer First extends number, ...infer Rest extends number[]]
  ? LargerThan<First, Limit> extends true
    ? Merge<Rest, Limit, Lower, [...Higher, First]>
    : Merge<Rest, Limit, [...Lower, First], Higher>
  : [Lower, Higher];

type Sort<T extends number[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? Merge<Rest, First> extends [
      infer Lower extends number[],
      infer Higher extends number[],
    ]
    ? [...Sort<Lower>, First, ...Sort<Higher>]
    : never
  : T;

type A = Sort<[100, 9, 0, 0, 55]>;
// [0, 0, 9, 55, 100]
export {};
