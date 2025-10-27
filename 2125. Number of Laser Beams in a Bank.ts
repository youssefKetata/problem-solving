function numberOfBeams(bank: string[]): number {
  let i1 = 0;
  let i2 = 1;
  let sum = 0;
  while (i2 < bank.length) {
    let row1 = bank[i1];
    let row2 = bank[i2];
    let count1 = 0;
    let count2 = 0;
    for (let k = 0; k < row1.length; k++) {
      count1 += row1[k] == '1' ? 1 : 0;
      count2 += row2[k] == '1' ? 1 : 0;
    }
    if (count2 == 0) {
      i2++;
      continue;
    }
    if (count1 == 0) {
      i1 = i2;
      i2++;
    }
    if (count1 > 0 && count2 > 0) {
      sum += count1 * count2;
      i1 = i2;
      i2++;
    }
  }

  return sum;
}
let bank = ['000', '111', '000'];
console.log(numberOfBeams(bank));
