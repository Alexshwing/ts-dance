type UnionToIntersection<T> = (T extends T ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>;
// {a: string} & {b: string} & {c: string}
export {};
