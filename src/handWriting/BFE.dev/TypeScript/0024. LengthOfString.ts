type LengthOfString<
  T extends string,
  Res extends any[] = [],
> = T extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [...Res, First]>
  : Res['length'];
