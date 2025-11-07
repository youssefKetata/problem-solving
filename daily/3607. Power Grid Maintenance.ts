function processQueries(
  c: number,
  connections: number[][],
  queries: number[][]
): number[] {
  const parent = new Int32Array(c + 1);
  for (let i = 0; i <= c; i++) parent[i] = i;

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x: number, y: number): void {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootX] = rootY;
    }
  }

  for (let i = 0; i < connections.length; i++) {
    union(connections[i][0], connections[i][1]);
  }

  const online = new Uint8Array(c + 1);
  for (let i = 1; i <= c; i++) online[i] = 1;

  const gridMap = new Map<number, number[]>();
  for (let i = 1; i <= c; i++) {
    const root = find(i);
    if (!gridMap.has(root)) {
      gridMap.set(root, []);
    }
    gridMap.get(root)!.push(i);
  }

  const gridMin = new Map<number, number>();
  const gridMinIndex = new Map<number, number>();

  for (const [root, stations] of gridMap) {
    stations.sort((a, b) => a - b);
    gridMin.set(root, stations[0]);
    gridMinIndex.set(root, 0);
  }

  const result: number[] = [];

  for (let i = 0; i < queries.length; i++) {
    const type = queries[i][0];
    const x = queries[i][1];

    if (type === 1) {
      if (online[x]) {
        result.push(x);
      } else {
        const root = find(x);
        const min = gridMin.get(root);
        result.push(min !== undefined ? min : -1);
      }
    } else {
      online[x] = 0;
      const root = find(x);
      const currentMin = gridMin.get(root);

      if (currentMin === x) {
        const stations = gridMap.get(root)!;
        let idx = gridMinIndex.get(root)! + 1;

        while (idx < stations.length && !online[stations[idx]]) {
          idx++;
        }

        if (idx < stations.length) {
          gridMin.set(root, stations[idx]);
          gridMinIndex.set(root, idx);
        } else {
          gridMin.delete(root);
          gridMinIndex.delete(root);
        }
      }
    }
  }

  return result;
}
