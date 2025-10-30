function minNumberOperations(target: number[]): number {
  // If empty (not expected by constraints) return 0
  if (!target || target.length === 0) return 0;

  let ops = 0;
  let prev = 0;
  for (let i = 0; i < target.length; i++) {
    const cur = target[i];
    if (cur > prev) ops += cur - prev;
    prev = cur;
  }
  return ops;
}
