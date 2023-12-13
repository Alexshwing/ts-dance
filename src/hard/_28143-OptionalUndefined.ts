// ============= Test Cases =============
import type { Equal, Expect } from '../test-utils';

type cases = [
  Expect<
    Equal<
      OptionalUndefined<{ value: string | undefined }, 'value'>,
      { value?: string | undefined }
    >
  >,
  Expect<
    Equal<
      OptionalUndefined<{ value: string; desc: string }, 'value'>,
      { value: string; desc: string }
    >
  >,
  Expect<
    Equal<
      OptionalUndefined<{ value: string | undefined; desc: string }, 'value'>,
      { value?: string; desc: string }
    >
  >,
  Expect<
    Equal<
      OptionalUndefined<
        { value: string | undefined; desc: string | undefined },
        'value'
      >,
      { value?: string | undefined; desc: string | undefined }
    >
  >,
  Expect<
    Equal<
      OptionalUndefined<
        { value: string | undefined; desc: string },
        'value' | 'desc'
      >,
      { value?: string; desc: string }
    >
  >,
  Expect<
    Equal<
      OptionalUndefined<{
        value: string | undefined;
        desc: string | undefined;
      }>,
      { value?: string; desc?: string }
    >
  >,
  Expect<
    Equal<OptionalUndefined<{ value?: string }, 'value'>, { value?: string }>
  >,
  Expect<Equal<OptionalUndefined<{ value?: string }>, { value?: string }>>,
];

// 它将T的所有可以未定义的属性转换为可选属性。此外，还可以传递第二个可选的泛型Props来限制可以更改的属性。
// ============= Your Code Here =============

type OptionalUndefined<
  T extends Record<string, any>,
  Props extends keyof T,
> = Omit<
  Omit<T, Props> & {
    [K in Props as undefined extends T[K] ? K : never]?: T[K];
  } & {
    [K in Props as undefined extends T[K] ? never : K]: T[K];
  },
  never
>;

type T = OptionalUndefined<{ value: string; desc: string }, 'value'>;
