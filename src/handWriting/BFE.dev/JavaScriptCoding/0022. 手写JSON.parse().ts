const isNumeric = (s) => !isNaN(parseFloat(s)) && isFinite(Number(s));

function parse(s) {
  if (s === '' || s[0] === "'") {
    throw Error();
  }

  if (isNumeric(s)) {
    return Number(s);
  }

  if (s === 'null') {
    return null;
  }

  if (s === 'true' || s === 'false') {
    return Boolean(s);
  }

  if (s === '{}') {
    return {};
  }

  if (s[0] === '"') {
    return s.slice(1, -1);
  }

  if (s[0] === '[') {
    return mySplit(s.slice(1, -1)).map((item) => parse(item));
  }

  if (s[0] === '{') {
    return mySplit(s.slice(1, -1)).reduce((prev, cur) => {
      const index = cur.indexOf(':');
      const key = cur.slice(0, index);
      const value = cur.slice(index + 1);
      prev[parse(key)] = parse(value);
      return prev;
    }, {});
  }
}

function mySplit(s) {
  if (s[s.length - 1] === ',') {
    throw Error();
  }
  const ans = [];
  let tmp = '';
  let a = 0, // [
    b = 0, // {
    c = 0; // "
  for (const ch of s) {
    if (ch === ',' && a === 0 && b === 0 && c % 2 === 0) {
      ans.push(tmp);
      tmp = '';
      continue;
    }

    if (ch === '[') {
      a += 1;
    } else if (ch === ']') {
      a -= 1;
    } else if (ch === '{') {
      b += 1;
    } else if (ch === '}') {
      b -= 1;
    } else if (ch === '"') {
      c += 1;
    }
    tmp += ch;
  }
  if (tmp) {
    ans.push(tmp);
  }
  return ans;
}

export {};
