function snakeToCamel(s) {
  return s.replace(
    /([^_])_([^_])/g,
    (_, before, after) => before + after.toUpperCase()
  );
}

console.log(snakeToCamel('snake_case')); // 'snakeCase'
console.log(snakeToCamel('is_flag_on')); // 'isFlagOn'
console.log(snakeToCamel('is_IOS_or_Android')); // 'isIOSOrAndroid'
console.log(snakeToCamel('_first_underscore')); // '_firstUnderscore'
console.log(snakeToCamel('last_underscore_')); // 'lastUnderscore_'
console.log(snakeToCamel('_double__underscore_')); // '_double__underscore_'
