type Includes<T extends any[], P extends any> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends P
    ? true
    : Includes<Rest, P>
  : false;

type Unique<T extends any[], Res extends any[] = []> = T extends [
  infer First,
  ...infer Rest,
]
  ? Unique<Rest, Includes<Res, First> extends false ? [...Res, First] : Res>
  : Res;

type A = Unique<['A', 'A', 'A', 'B', 'B', 'C']>;
// ['A', 'B', 'C']
export {};
