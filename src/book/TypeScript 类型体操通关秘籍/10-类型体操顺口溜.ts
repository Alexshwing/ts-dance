// ParseQueryString

type MergeParams<
  T extends Record<string, any>,
  U extends Record<string, any>,
> = {
  [P in keyof T | keyof U]: P extends keyof T
    ? P extends keyof U
      ? MergeValues<T[P], U[P]>
      : T[P]
    : P extends keyof U
    ? U[P]
    : never;
};

type MergeValues<T, U> = T extends U
  ? T
  : U extends unknown[]
  ? [T, ...U]
  : [T, U];

type ParseParam<T extends string> = T extends `${infer Key}=${infer Value}`
  ? {
      [P in Key]: Value;
    }
  : Record<string, any>;

export type ParseQueryString<T extends string> =
  T extends `${infer First}&${infer Rest}`
    ? MergeParams<ParseParam<First>, ParseQueryString<Rest>>
    : ParseParam<T>;

type T = ParseQueryString<'a=1&a=2&c=3&d=4'>;

export {};
