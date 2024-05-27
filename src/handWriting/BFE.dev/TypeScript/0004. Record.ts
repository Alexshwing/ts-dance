type MyRecord<K extends number | string | symbol, V> = {
  [Key in K]: V;
};
