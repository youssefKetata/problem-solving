export function rangeAddQueries(n: number, queries: number[][]): number[][] {
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (const [r1, c1, r2, c2] of queries) {
    // filll matrix top-left is r1,c1 bottom-right is r2,c2
    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        matrix[i][j] += 1;
      }
    }
  }
  return matrix;
}
let n = 3,
  queries = [
    [1, 1, 2, 2],
    [0, 0, 1, 1],
  ];
console.log(rangeAddQueries(n, queries));
