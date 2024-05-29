type SnakeCase<
  S extends string,
  T extends string = '',
> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? SnakeCase<
        Rest,
        T extends '' ? `${Lowercase<First>}` : `${T}_${Lowercase<First>}`
      >
    : SnakeCase<Rest, `${T}${First}`>
  : Lowercase<T>;
