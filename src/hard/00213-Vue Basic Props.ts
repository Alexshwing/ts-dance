// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from '../test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})

// This challenge continues from 6 - Simple Vue, you should finish that one first, and modify your code based on it to start this challenge.

// In addition to the Simple Vue, we are now having a new props field in the options. This is a simplified version of Vue's props option. Here are some of the rules.

// props is an object containing each field as the key of the real props injected into this. The injected props will be accessible in all the context including data, computed, and methods.

// A prop will be defined either by a constructor or an object with a type field containing constructor(s).

// For example

// props: {
//   foo: Boolean
// }
// // or
// props: {
//   foo: { type: Boolean }
// }
// should be inferred to type Props = { foo: boolean }.

// When passing multiple constructors, the type should be inferred to a union.

// props: {
//   foo: { type: [Boolean, Number, String] }
// }
// // -->
// type Props = { foo: boolean | number | string }
// When an empty object is passed, the key should be inferred to any.

// For more specified cases, check out the Test Cases section.

// required, default, and array props in Vue are not considered in this challenge.
// ============= Your Code Here =============
type GetComputed<TComputed> = {
  [Key in keyof TComputed]: TComputed[Key] extends () => infer R ? R : never
}

type GetPropType<T> = T extends unknown[]
  ? GetPropType<T[number]>
  : T extends (...args: any) => any
  ? ReturnType<T>
  : T extends new (...args: any) => any
  ? InstanceType<T>
  : T

type Props<T> = {
  [K in keyof T]: T[K] extends Record<string, never>
    ? any
    : T[K] extends { type: infer R }
    ? GetPropType<R>
    : GetPropType<T[K]>
}

type TOptions<TProps, TData, TComputed, TMethod> = {
  props: TProps
  data: (this: Props<TProps>) => TData
  computed: TComputed & ThisType<TData & Props<TProps>>
  methods: TMethod &
    ThisType<TData & GetComputed<TComputed> & TMethod & Props<TProps>>
}

declare function VueBasicProps<TProps, TData, TComputed, TMethod>(
  options: TOptions<TProps, TData, TComputed, TMethod>
): any
