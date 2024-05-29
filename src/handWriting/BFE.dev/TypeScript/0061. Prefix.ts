type Prefix<T extends Record<string, any>, P extends string> = {
  [Key in keyof T as Key extends string ? `${P}_${Key}` : never]: T[Key];
};
