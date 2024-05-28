type FirstChar<T extends string> = T extends `${infer R}${string}` ? R : never;
