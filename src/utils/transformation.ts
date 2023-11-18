// [1, 2, 3] -> [3, 2, 1]
export type _ReverseArr<T extends unknown[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? [..._ReverseArr<Rest>, First]
  : []

// `123` -> [1, 2, 3]
export type _StringToNumberArr<T extends string> =
  T extends `${infer First extends number}${infer Rest}`
    ? [First, ..._StringToNumberArr<Rest>]
    : []

// [1, 2, 3] -> `123`
export type _NumberArrToStr<T extends number[]> = T extends [
  infer First extends number,
  ...infer Rest extends number[],
]
  ? `${First}${_NumberArrToStr<Rest>}`
  : ``

// `12` -> 12
export type _StringToNumber<S extends string> = S extends `${infer N extends
  number}`
  ? N
  : never
