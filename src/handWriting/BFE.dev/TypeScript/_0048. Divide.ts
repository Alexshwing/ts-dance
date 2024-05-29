type Divide<A extends number, B extends number, Res extends any[] = []> = A;

type A = Divide<1, 0>; // never
type B = Divide<4, 2>; // 2
type C = Divide<10, 3>; // 3
export {};
