type Abs<N extends number> = `${N}` extends `-${infer A extends number}`
  ? A
  : N;
