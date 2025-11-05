function findXSum(nums: number[], k: number, x: number): number[] {
  const n = nums.length;
  const l = n - k + 1;
  const result: number[] = new Array(l).fill(0);
  // find the sub arrays
  for (let i = 0; i < l; i++) {
    let subarray = nums.slice(i, i + k);
    const unique = new Map();
    // count frequency
    for (let j = 0; j < subarray.length; j++) {
      if (unique.has(subarray[j])) {
        unique.set(subarray[j], unique.get(subarray[j]) + 1);
      } else {
        unique.set(subarray[j], 1);
      }
    }
    // sort
    const sorted = Array.from(unique.entries()).sort((a, b) => {
      if (b[1] === a[1]) {
        return b[0] - a[0];
      }
      return b[1] - a[1];
    });
    // calculate x sum
    let sum = 0;
    for (let m = 0; m < Math.min(x, sorted.length); m++) {
      sum += sorted[m][0] * sorted[m][1];
    }
    result[i] = sum;
  }
  return result;
}

const nums1 = [1, 1, 2, 2, 2, 2, 2, 2];
const k1 = 6;
const x1 = 3;
console.log(findXSum(nums1, k1, x1));
