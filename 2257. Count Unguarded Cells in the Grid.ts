function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  const grid = Array.from({ length: m }, () => Array(n).fill(0));

  for (const [x, y] of walls) grid[x][y] = 3;
  for (const [x, y] of guards) grid[x][y] = 2;

  function dfs(x: number, y: number, dx: number, dy: number) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= m || ny < 0 || ny >= n) return;
    if (grid[nx][ny] === 2 || grid[nx][ny] === 3) return;

    grid[nx][ny] = 1;
    dfs(nx, ny, dx, dy);
  }

  for (const [x, y] of guards) {
    dfs(x, y, -1, 0); // Up
    dfs(x, y, 1, 0); // Down
    dfs(x, y, 0, -1); // Left
    dfs(x, y, 0, 1); // Right
  }

  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) count++;
    }
  }
  return count;
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
console.log(countUnguarded(m1, n1, guards1, walls1));
