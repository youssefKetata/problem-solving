function maxPower(stations: number[], r: number, k: number): number {
  // first step is to deal with   statiosn and r
  // calcluae the power of cities before k
  const n = stations.length;
  const power = Array.from({ length: n }).fill(0);
  for (let i = 0; i < n; i++) {
    power[i] = stations[i];
    // const right
  }

  return 0;
}

let stations = [1, 2, 4, 5, 0],
  r = 1,
  k = 2;
maxPower(stations, r, k);
