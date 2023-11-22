// ! T 最大值 999
// export type _BuildArr<
//   T extends number,
//   Res extends number[] = [],
// > = Res['length'] extends T ? Res : _BuildArr<T, [...Res, 0]>

// @see https://github.com/type-challenges/type-challenges/issues/11216
export type _BuildArr<T extends number, Res extends number[] = []> = 0 extends 1
  ? never
  : Res['length'] extends T
  ? Res
  : _BuildArr<T, [...Res, 0]>

export type _Add<A extends number, B extends number> = [
  ..._BuildArr<A>,
  ..._BuildArr<B>,
]['length'] &
  number

export type _Sub<A extends number, B extends number> = [
  ..._BuildArr<A>,
] extends [..._BuildArr<B>, ...infer R]
  ? R['length'] & number
  : never

export type _Mul<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = B extends 0
  ? Res['length'] & number
  : _Mul<A, _Sub<B, 1>, [...Res, ..._BuildArr<A>]>

export type _Div<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = A extends 0
  ? Res['length'] & number
  : _Div<_Sub<A, B>, B, [...Res, unknown]>
