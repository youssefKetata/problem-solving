function countOperations(num1: number, num2: number): number {
  let op = 0;
  while (num1 > 0 && num2 > 0) {
    num1 > num2 ? (num1 = num1 - num2) : (num2 = num2 - num1);
    op++;
  }
  return op;
}
let num1 = 100000,
  num2 = 2356;
console.log(countOperations(num1, num2));
