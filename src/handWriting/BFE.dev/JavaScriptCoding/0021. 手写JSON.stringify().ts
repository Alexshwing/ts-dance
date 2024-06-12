function stringify(data) {
  if (typeof data === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt');
  }

  if (data === Infinity || data === -Infinity) {
    return 'null';
  }

  if (typeof data === 'string') {
    return `"${data}"`;
  }

  if (typeof data === 'function') {
    return undefined;
  }

  if (data !== data) {
    return 'null';
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return `${data}`;
  }

  if (data === null || data === undefined) {
    return 'null';
  }

  if (typeof data === 'symbol') {
    return undefined;
  }

  if (data instanceof Date) {
    return `"${data.toISOString()}"`;
  }

  if (Array.isArray(data)) {
    return `[${data.map((item) => stringify(item) || 'null').join(',')}]`;
  }

  if (typeof data === 'object' && data !== null) {
    const items = [];
    for (const key of Object.keys(data)) {
      if (data[key] === undefined) continue;
      items.push(`"${key}":${stringify(data[key])}`);
    }
    return `{${items.join(',')}}`;
  }
}

const sym = [Symbol('key')];
console.log(stringify(sym));
console.log(JSON.stringify(sym));

export {};
