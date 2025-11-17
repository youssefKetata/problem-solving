export function kLengthApart(nums: number[], k: number): boolean {
  let count = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      count = 0;
      let j = i + 1;
      while (nums[j] === 0 && j < n) {
        count++;
        j++;
      }
      if (count < k && nums[j] === 1) return false;
    }
  }

  return true;
}

let nums = [1, 0, 0, 0, 1, 0, 0, 1],
  k = 2;
console.log(kLengthApart(nums, k));
