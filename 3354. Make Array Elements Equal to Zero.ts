function countValidSelections(nums: number[]): number {
  let length = nums.length;
  let valid = 0;
  function validFn(nums: number[], direction: number, curr: number): boolean {
    while (curr >= 0 && curr < length) {
      if (nums[curr] == 0) {
        direction == 1 ? curr++ : curr--;
      } else if (nums[curr] > 0) {
        nums[curr] = nums[curr] - 1;
        direction = direction == 1 ? -1 : 1;
        direction == 1 ? curr++ : curr--;
      }
    }
    const r = nums.every((item) => item === 0);

    console.log(nums);
    return r;
  }
  const allIndexes: number[] = [];

  nums.forEach((value, index) => {
    if (value === 0) {
      allIndexes.push(index);
    }
  });
  for (let i = 0; i < allIndexes.length; i++) {
    validFn([...nums], 1, allIndexes[i]) && valid++;
    validFn([...nums], -1, allIndexes[i]) && valid++;
  }
  return valid;
}

let nums = [1, 0, 2, 0, 3];
console.log(countValidSelections(nums));
