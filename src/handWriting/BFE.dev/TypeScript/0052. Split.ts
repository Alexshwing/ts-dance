type Split<
  S extends string,
  D extends string,
> = S extends `${infer Left}${D}${infer Right}`
  ? [Left, ...Split<Right, D>]
  : [S];
