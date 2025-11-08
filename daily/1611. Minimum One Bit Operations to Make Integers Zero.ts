// Given an integer n, you must transform it into 0 using the following operations any number of times:
//
// Change the rightmost (0th) bit in the binary representation of n.
// Change the ith bit in the binary representation of n if the (i-1)th bit is set to 1 and the (i-2)th through 0th bits are set to 0.
// Return the minimum number of operations to transform n into 0.
//
// Solution explanation:
//
// GRAY CODE BASICS:
// Gray code is a binary number sequence where consecutive numbers differ by exactly one bit.
// Example: 0→1→3→2→6→7→5→4→12→13→15→14→10→11→9→8 (in binary: 0000→0001→0011→0010→0110...)
//
// WHY GRAY CODE?
// The problem's operations create a Gray code sequence:
// - We can only flip bits in a specific order (rightmost, or bit i when bit i-1 is 1 and all below are 0)
// - This constraint means we traverse through numbers in Gray code order to reach 0
// - The minimum operations = position of n in the Gray code sequence
//
// REVERSE GRAY CODE:
// To find n's position in Gray code sequence, we reverse the Gray code formula:
// - Standard Gray code: gray = n ^ (n >> 1)
// - Reverse (what we need): n = gray ^ (gray >> 1) ^ (gray >> 2) ^ (gray >> 4) ^ ...
//
// THE ALGORITHM:
// 1. Start with res = n (treating n as a Gray code number)
// 2. XOR res with itself shifted right by 1, 2, 4, 8, 16... positions
// 3. Each XOR "undoes" one layer of the Gray code transformation
// 4. Final result is the binary index (number of steps to reach n from 0)
//
// Time: O(log n), Space: O(1)

function minimumOneBitOperations(n: number): number {
  // Reverse Gray code operation to find the index of n in the Gray code sequence
  let res = n;
  for (let shift = 1; shift < 32; shift <<= 1) {
    res ^= res >> shift;
  }
  return res;
}

// test caseas
const n2 = 536870912;
console.log(minimumOneBitOperations(n2)); // 2
