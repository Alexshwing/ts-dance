type CamelCase<S extends string> = S extends `${infer L}_${infer R}`
  ? CamelCase<`${Capitalize<L>}${Capitalize<R>}`>
  : Capitalize<S>;
