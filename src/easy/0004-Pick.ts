// ============= Test Cases =============
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  Expect<Equal<Todo, MyPick<Todo, 'title' | 'completed' | 'description'>>>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

// ============= Your Code Here =============
type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key]
}
