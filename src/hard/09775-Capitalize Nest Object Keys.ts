// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type foo = {
  foo: string;
  bars: [{ foo: string }];
};

type Foo = {
  Foo: string;
  Bars: [
    {
      Foo: string;
    },
  ];
};

type cases = [Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>];

// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = T extends any[]
  ? {
      [P in keyof T]: CapitalizeNestObjectKeys<T[P]>;
    }
  : T extends Record<string, any>
  ? {
      [P in keyof T as Capitalize<P & string>]: CapitalizeNestObjectKeys<T[P]>;
    }
  : T;
