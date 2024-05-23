function uncompress(str: string): string {}
console.log(uncompress('3(ab)')); // 'ababab'
console.log(uncompress('3(ab2(c))')); // 'abccabccabcc'

