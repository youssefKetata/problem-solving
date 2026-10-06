function findMax(nums: number[]): number | null {
  if (nums.length == 0) return null;

  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}
// time: O(n)
// space: O(1)

// For arrays, always think about:

// Empty array
// One element
// All same values
// Negative numbers
// Duplicates
// Very large array
// Already sorted array
// Reverse sorted array

const set = new Set<number>();
// set answer the question: "Have I seen this value before?"

// The important operations are:
let value = 5;
set.add(value); // add value
set.has(value); // check if value exists
set.delete(value); // remove value
set.size; // number of unique values

// problem
// Given an array, return true if any number appears more than once.
function appearsTwice(nums: number[]): Boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}
