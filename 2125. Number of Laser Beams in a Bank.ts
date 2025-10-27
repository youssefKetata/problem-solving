function numberOfBeams(bank: string[]): number {
  const counts = bank.map((row) => {
    const matches = row.match(/1/g);
    return matches ? matches.length : 0;
  });

  let total = 0;
  let prev = 0;
  for (const count of counts) {
    if (count === 0) continue;
    if (prev > 0) total += prev * count;
    prev = count;
  }

  return total;
}

let bank = ['000', '111', '000'];
console.log(numberOfBeams(bank));
