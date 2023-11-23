// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils'

const store = defineStore({
  id: '',
  state: () => ({
    num: 0,
    str: '',
  }),
  getters: {
    stringifiedNum() {
      // @ts-expect-error
      this.num += 1

      return this.num.toString()
    },
    parsedNum() {
      return parseInt(this.stringifiedNum)
    },
  },
  actions: {
    init() {
      this.reset()
      this.increment()
    },
    increment(step = 1) {
      this.num += step
    },
    reset() {
      this.num = 0

      // @ts-expect-error
      this.parsedNum = 0

      return true
    },
    setNum(value: number) {
      this.num = value
    },
  },
})

// @ts-expect-error
store.nopeStateProp
// @ts-expect-error
store.nopeGetter
// @ts-expect-error
store.stringifiedNum()
store.init()
// @ts-expect-error
store.init(0)
store.increment()
store.increment(2)
// @ts-expect-error
store.setNum()
// @ts-expect-error
store.setNum('3')
store.setNum(3)
const r = store.reset()

type _tests = [
  Expect<Equal<typeof store.num, number>>,
  Expect<Equal<typeof store.str, string>>,
  Expect<Equal<typeof store.stringifiedNum, string>>,
  Expect<Equal<typeof store.parsedNum, number>>,
  Expect<Equal<typeof r, true>>,
]

/*
id - just a string (required)
state - a function which will return an object as store's state (required)
getters - an object with methods which is similar to Vue's computed values or Vuex's getters, and details are below (optional)
-- Additionally, getters can access state and/or other getters via this, but state is read-only.

actions - an object with methods which can do side effects and mutate state, and details are below (optional)
-- State can be accessed and mutated via this. Getters can be accessed via this but they're read-only.

*/
// ============= Your Code Here =============

type MapGetter<T> = {
  readonly [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
}

type TOptions<TId, TState, TGetters, TActions> = {
  id: TId
  state: () => TState
  getters: TGetters & ThisType<Readonly<TState> & MapGetter<TGetters>>
  actions: TActions & ThisType<TState & TActions>
}

declare function defineStore<TId, TState, TGetters, TActions>(
  store: TOptions<TId, TState, TGetters, TActions>
): TState & MapGetter<TGetters> & TActions & { init: () => void }
