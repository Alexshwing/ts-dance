// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

// ============= Your Code Here =============
type ObjectFromEntries<T extends any[]> = {
  [P in T as P extends any[] ? P[0] : never]: P[1];
};
