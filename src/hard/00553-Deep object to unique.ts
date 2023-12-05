// ============= Test Cases =============
import type { Equal, IsFalse, IsTrue } from '../test-utils';

type Quz = { quz: 4 };

type Foo = { foo: 2; baz: Quz; bar: Quz };
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } };

type UniqQuz = DeepObjectToUniq<Quz>;
type UniqFoo = DeepObjectToUniq<Foo>;
type UniqBar = DeepObjectToUniq<Bar>;

declare let foo: Foo;
declare let uniqFoo: UniqFoo;

uniqFoo = foo;
foo = uniqFoo;

type cases = [
  IsFalse<Equal<UniqQuz, Quz>>,
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo['foo'], Foo['foo']>>,
  IsTrue<Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']>>,
  IsFalse<Equal<UniqQuz, UniqFoo['baz']>>,
  IsFalse<Equal<UniqFoo['bar'], UniqFoo['baz']>>,
  IsFalse<Equal<UniqBar['baz'], UniqFoo['baz']>>,
  IsTrue<Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>,
];

// ============= Your Code Here =============
type DeepObjectToUniq<
  T extends Record<string, any>,
  Tag extends any[] = [T],
> = {
  [P in keyof T]: T[P] extends Record<string, any>
    ? DeepObjectToUniq<T[P], [...Tag, P]>
    : T[P];
} & { [P in symbol]: Tag };

// 用原对象和当前 Key 组成的数组给当前元素打 Tag
