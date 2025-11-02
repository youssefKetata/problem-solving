function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  const wallGrid = Array.from({ length: m }, () => Array(n).fill(false));
  const guardGrid = Array.from({ length: m }, () => Array(n).fill(false));
  for (const [x, y] of walls) wallGrid[x][y] = true;
  for (const [x, y] of guards) guardGrid[x][y] = true;

  const guarded: boolean[][] = Array.from({ length: m }, () =>
    Array(n).fill(false)
  );

  for (const [x, y] of guards) {
    // up
    for (let i = x - 1; i >= 0; i--) {
      if (wallGrid[i][y] || guardGrid[i][y]) break;
      guarded[i][y] = true;
    }
    // down
    for (let i = x + 1; i < m; i++) {
      if (wallGrid[i][y] || guardGrid[i][y]) break;
      guarded[i][y] = true;
    }
    // left
    for (let j = y - 1; j >= 0; j--) {
      if (wallGrid[x][j] || guardGrid[x][j]) break;
      guarded[x][j] = true;
    }
    // right
    for (let j = y + 1; j < n; j++) {
      if (wallGrid[x][j] || guardGrid[x][j]) break;
      guarded[x][j] = true;
    }
  }

  let unguardedCount = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!guarded[i][j] && !wallGrid[i][j] && !guardGrid[i][j]) {
        unguardedCount++;
      }
    }
  }
  return unguardedCount;
}

const m1 = 4;
const n1 = 6;
const guards1 = [
  [0, 0],
  [1, 1],
  [2, 3],
];
const walls1 = [
  [0, 1],
  [2, 2],
  [1, 4],
];
console.log(countUnguarded(m1, n1, guards1, walls1)); // Output: 7
