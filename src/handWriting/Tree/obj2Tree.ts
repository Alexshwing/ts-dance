function obj2Tree(obj: Record<string, any>) {
  const ans = {};
  for (const [key, value] of Object.entries(obj)) {
    const arr = key.split('-');
    const n = arr.length;
    let tmp = ans;
    arr.forEach((item, i) => {
      if (i === n - 1) {
        tmp[item] = value;
      } else {
        if (!tmp[item]) {
          tmp[item] = {};
        }
        tmp = tmp[item];
      }
    });
  }
  return ans;
}

console.log(
  obj2Tree({
    'a-b-c-d': 1,
    'a-b-c-e': 2,
    'a-b-f': 3,
    'a-j': 4,
  })
);
