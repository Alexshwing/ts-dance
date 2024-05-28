type RepeatString<
  T extends string,
  C extends number,
  Count extends any[] = [],
> = Count['length'] extends C
  ? ''
  : `${T}${RepeatString<T, C, [...Count, unknown]>}`;
