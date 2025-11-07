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

// solution 2
function getSneakyNumbers2(nums: number[]): number[] {
  const n = nums.length - 2;
  const res: number[] = [];
  for (let i = 0; i < nums.length && res.length < 2; i++) {
    const val = nums[i] % n;
    if (nums[val] >= n) {
      if (!res.includes(val)) res.push(val);
    } else {
      nums[val] += n;
    }
  }
  return res;
}

function getSneakyNumbers3(nums: number[]): number[] {
  const n = nums.length - 2;
  const res: number[] = [];
  for (let i = 0; i < nums.length && res.length < 2; i++) {
    const val = nums[i] % n;
    if (nums[val] >= n) {
      if (!res.includes(val)) res.push(val);
    } else {
      nums[val] += n;
    }
  }
  return res;
}
function getSneakyNumbers4(nums: number[]): number[] {
  const map = new Map<number, number>();
  const res: number[] = [];
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
    if (map.get(num) === 2) {
      res.push(num);
    }
  }
  return res;
}
const inputNumbers: number[] = [0, 1, 1, 0];
console.log(getSneakyNumbers(inputNumbers));
