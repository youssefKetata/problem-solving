function getSneakyNumbers(nums: number[]): number[] {
  let sneaky: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const curr = nums[i];
    console.log('curr', nums[i]);
    for (let j = 0; j < nums.length; j++) {
      if (j === i) continue;
      if (nums[j] === curr && !sneaky.includes(curr)) {
        sneaky.push(curr);
      }
    }
  }
  return sneaky;
}
const inputNumbers: number[] = [0, 1, 1, 0];
console.log(getSneakyNumbers(inputNumbers));
