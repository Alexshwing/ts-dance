/*
In switch, it is easy for us to miss out some cases.

type Value = 'a' | 'b' | 'c';
declare let value: Value

switch (value) {
  case 'a':
    break;
  case 'b':
    break;
  default:
    break;
}
We missed out case 'c' in above code and compiler doesn't compain.

Plase create function assertsNever() to check for exhaustiveness.

type Value = 'a' | 'b' | 'c';
declare let value: Value

switch (value) {
  case 'a':
    break;
  case 'b':
    break;
  default:
    assertsNever(value)
    break;
}
Now TypeScript would complaint the missing case 'c'.
*/

function assertsNever(x: never): never {
  throw new Error('missing case');
}
