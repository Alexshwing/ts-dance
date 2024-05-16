function addComma(num: number) {
  const isNeg = num < 0;
  const [interger, float] = (Math.abs(num) + '').split('.');
  return `${isNeg ? '-' : ''}${interger
    .split('')
    .reverse()
    .map((item, index) => item + (index && index % 3 === 0 ? ',' : ''))
    .reverse()
    .join('')}${float ? '.' + float : ''}`;
}

console.log(addComma(1)); // '1'
console.log(addComma(1000)); // '1,000'
console.log(addComma(-12345678)); // '-12,345,678'
console.log(addComma(12345678.12345)); // '12,345,678.12345'
