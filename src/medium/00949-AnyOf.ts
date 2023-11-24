// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

type cases = [
  Expect<
    Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<
    Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>
  >,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

// 在类型系统中实现类似于 Python 中 any 函数。类型接收一个数组，如果数组中任一个元素为真，则返回 true，否则返回 false。如果数组为空，返回 false
// ============= Your Code Here =============

type Falsy = 0 | '' | false | [] | { [key: string]: never } | undefined | null
type AnyOf<T extends readonly any[]> = T extends Falsy[] ? false : true
