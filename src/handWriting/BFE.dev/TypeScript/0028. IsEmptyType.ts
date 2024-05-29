// https://stackoverflow.com/questions/49464634/difference-between-object-and-object-in-typescript/49465172#49465172

type IsEmptyType<T> = number extends T
  ? [keyof T] extends [never]
    ? true
    : false
  : false;
