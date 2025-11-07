class NumMatrix {
  private cummSum: number[][];
  constructor(matrix: number[][]) {
    const m = matrix.length,
      n = matrix[0]?.length ?? 0;
    this.cummSum = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.cummSum[i][j] =
          matrix[i - 1][j - 1] +
          this.cummSum[i - 1][j] +
          this.cummSum[i][j - 1] -
          this.cummSum[i - 1][j - 1];
      }
    }
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return (
      this.cummSum[row2 + 1][col2 + 1] -
      this.cummSum[row1][col2 + 1] -
      this.cummSum[row2 + 1][col1] +
      this.cummSum[row1][col1]
    );
  }
}

// test case
var obj = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]);
var param_1 = obj.sumRegion(2, 1, 4, 3);
console.log(' param_1:', param_1);
/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
