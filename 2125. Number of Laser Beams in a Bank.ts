function numberOfBeams(bank: string[]): number {
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      let row1 = bank[i];
      let row2 = bank[j];
      let count1 = 0;
      let count2 = 0;
      for (let k = 0; k < row1.length; k++) {
        if (row1[k] === '1') count1++;
        if (row2[k] === '1') count2++;
      }
      if (count1 > 0 && count2 > 0) {
        return count1 * count2;
      }
    }
  }
  return 0;
}
let bank = ['011001', '000000', '010100', '001000'];
numberOfBeams(bank);
