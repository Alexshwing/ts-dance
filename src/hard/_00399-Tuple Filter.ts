// // ============= Test Cases =============
// import type { Equal, Expect } from '../test-utils'

// type cases = [
//   Expect<Equal<FilterOut<[], never>, []>>,
//   Expect<Equal<FilterOut<[never], never>, []>>,
//   Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
//   Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
//   Expect<
//     Equal<
//       FilterOut<
//         [never, 1, 'a', undefined, false, null],
//         never | null | undefined
//       >,
//       [1, 'a', false]
//     >
//   >,
//   Expect<
//     Equal<
//       FilterOut<[number | null | undefined, never], never | null | undefined>,
//       [number | null | undefined]
//     >
//   >,
// ]

// // ============= Your Code Here =============
// type IsSave<T extends any, F extends any[] | any> = F extends [
//   infer First,
//   ...infer Rest,
// ]
//   ? Equal<First, T> extends true
//     ? false
//     : IsSave<T, Rest>
//   : Equal<F, T> extends true
//   ? false
//   : true

// type FilterOut<T extends any[], F extends any | any[]> = T extends [
//   infer First,
//   ...infer Rest,
// ]
//   ? IsSave<First, F> extends true
//     ? [First, ...FilterOut<Rest, F>]
//     : [...FilterOut<Rest, F>]
//   : T

// type T = FilterOut<['a', never], never>
