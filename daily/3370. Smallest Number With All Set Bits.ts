function smallestNumber(n: number): number {
  return parseInt(n.toString(2).toString().replace(/0/g, '1'), 2);
}

// toString(2) converts number to binary
// replace(/0/g, '1') replaces all 0s with 1s
// parseInt(..., 2) converts the binary string back to a number

// using <<
function smallestNumberUsingBitwise(n: number): number {
  let k = 1;
  while ((1 << k) - 1 < n) {
    k++;
  }
  return (1 << k) - 1;
}

let n = 12;
console.log(smallestNumber(n));
