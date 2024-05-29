type ReplaceAll<
  S extends string,
  F extends string,
  T extends string,
> = F extends ''
  ? S
  : S extends `${infer Left}${F}${infer Right}`
  ? `${Left}${T}${ReplaceAll<Right, F, T>}`
  : S;
