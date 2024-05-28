type Repeat<
  T,
  C extends number,
  Count extends any[] = [],
> = Count['length'] extends C ? [] : [T, ...Repeat<T, C, [...Count, unknown]>];
