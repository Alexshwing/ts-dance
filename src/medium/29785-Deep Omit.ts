// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<
    Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>
  >,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<
    Equal<
      DeepOmit<obj, 'person.age.value'>,
      { person: { name: string; age: {} } }
    >
  >,
];

// ============= Your Code Here =============
type DeepOmit<
  T extends Record<string, any>,
  Path extends string,
> = Path extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? {
        [P in keyof T]: P extends First ? DeepOmit<T[P], Rest> : T[P];
      }
    : T
  : {
      [P in keyof T as P extends Path ? never : P]: T[P];
    };
