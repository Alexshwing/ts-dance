function findMeetingSlots(schedules) {
  const mp = new Array(25).fill(0);
  for (const arr of schedules) {
    for (const [x, y] of arr) {
      for (let i = x; i <= y - 1; i += 1) {
        mp[i] += 1;
      }
    }
  }

  const ans = [];
  for (let i = 0; i < 24; i += 1) {
    if (mp[i] > 0) {
      continue;
    }
    let j = i;
    while (j < 24 && mp[j] === 0) {
      j += 1;
    }
    ans.push([i, j]);
    i = j;
  }

  return ans;
}

console.log(
  findMeetingSlots([
    [
      [13, 15],
      [11, 12],
      [10, 13],
    ], //成员1的安排
    [[8, 9]], //成员2的安排
    [[13, 18]], //成员3的安排
  ])
);
// [[0,8],[9,10],[18,24]]
