function smallestNumber(n: number): number {
  return parseInt(n.toString(2).toString().replace(/0/g, '1'), 2);
}

let n = 12;
console.log(smallestNumber(n));
