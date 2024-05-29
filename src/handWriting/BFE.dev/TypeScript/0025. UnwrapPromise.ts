type UnwrapPromise<T> = T extends Promise<infer R> ? R : never;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<Promise<null>>; // null
type C = UnwrapPromise<null>; // Error
export {};
