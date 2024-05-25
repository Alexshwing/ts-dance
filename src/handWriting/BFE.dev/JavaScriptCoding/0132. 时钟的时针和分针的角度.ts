function angle(time) {
  const [hh, mm] = time.split(':').map(Number);
  const a = Math.abs((hh % 12) * 30 + (mm / 60) * 30 - (mm / 60) * 360);
  return Math.round(a > 180 ? 360 - a : a);
}

console.log(angle('12:00')); // 0
console.log(angle('23:30')); // 165
console.log(angle('12:15')); // 83
console.log(angle('12:34')); // 173
