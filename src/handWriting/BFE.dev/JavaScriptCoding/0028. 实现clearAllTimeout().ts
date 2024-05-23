function clearAllTimeout() {
  let id = setTimeout(null, 0) as unknown as number;
  while (id >= 0) {
    clearTimeout(id);
    id -= 1;
  }
}
