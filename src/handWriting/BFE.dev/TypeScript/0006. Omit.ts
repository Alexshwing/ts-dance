type MyOmit<T, K extends keyof any> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};
