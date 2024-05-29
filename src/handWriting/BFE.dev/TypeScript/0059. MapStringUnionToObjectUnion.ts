type MapStringUnionToObjectUnion<U extends string> = U extends any
  ? {
      value: U;
    }
  : never;
