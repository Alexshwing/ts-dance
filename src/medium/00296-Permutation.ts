// type perm = Permutation<'A' | 'B' | 'C'> // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

// // ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<
    Equal<
      Permutation<'A' | 'B' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<
    Equal<
      Permutation<'B' | 'A' | 'C'>,
      | ['A', 'B', 'C']
      | ['A', 'C', 'B']
      | ['B', 'A', 'C']
      | ['B', 'C', 'A']
      | ['C', 'A', 'B']
      | ['C', 'B', 'A']
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

// ============= Your Code Here =============
type Permutation<T, U = T> = [T] extends [never]
  ? []
  : U extends U
  ? [U, ...Permutation<Exclude<T, U>>]
  : never

type P = Permutation<'A' | 'B' | 'C'>

// permutation
;(function fn(arr: number[] = [1, 2, 3]) {
  const n = arr.length
  const st = new Array(n).fill(false)
  const res = [],
    path = []
  function dfs(u: number): void {
    if (u === n) {
      res.push([...path])
      return
    }
    for (let i = 0; i < n; i++) {
      if (st[i]) continue
      st[i] = true
      path.push(arr[i])
      dfs(u + 1)
      path.pop()
      st[i] = false
    }
  }

  dfs(0)
  console.log(res)
})()

// ============= note =============
// `[T] extends [never] ? [] : ...` 数组判空
