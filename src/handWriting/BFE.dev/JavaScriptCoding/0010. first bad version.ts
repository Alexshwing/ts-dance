/*
Say you have multiple versions of a program, write a program that will find and return the first bad revision given a isBad(version) function.

Versions after first bad version are supposed to be all bad versions.

notes

Inputs are all non-negative integers
if none found, return -1
*/

type IsBad = (version: number) => boolean;

function firstBadVersion(isBad: IsBad) {
  return (version: number): number => {
    let left = 0,
      right = version;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (isBad(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return isBad(left) ? left : -1;
  };
}
