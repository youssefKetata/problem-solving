interface FindMaxFormParams {
  strs: string[];
  m: number;
  n: number;
}

export function findMaxForm(strs: string[], m: number, n: number): number {
  const dp: Map<string, number> = new Map();

  function helper(i: number, zerosLeft: number, onesLeft: number): number {
    if (i >= strs.length) return 0;

    const key = `${i},${zerosLeft},${onesLeft}`;
    if (dp.has(key)) return dp.get(key)!;

    const word: string = strs[i];
    const oneCount: number = countOnes(word);
    const zeroCount: number = countZeros(word);

    let picked: number = 0;
    if (oneCount <= onesLeft && zeroCount <= zerosLeft) {
      picked = 1 + helper(i + 1, zerosLeft - zeroCount, onesLeft - oneCount);
    }

    const notPicked: number = helper(i + 1, zerosLeft, onesLeft);
    const result: number = Math.max(picked, notPicked);

    dp.set(key, result);
    return result;
  }

  return helper(0, m, n);
}

function countOnes(s) {
  let count = 0;
  for (const ch of s) {
    if (ch === '1') count++;
  }
  return count;
}

function countZeros(s) {
  let count = 0;
  for (const ch of s) {
    if (ch === '0') count++;
  }
  return count;
}
let strs = ['10', '0001', '111001', '1', '0'],
  m = 5,
  n = 3;
console.log(findMaxForm(strs, m, n));

// second faster version
function findMaxForm2(strs: string[], m: number, n: number): number {
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (const s of strs) {
    const zero = s.split('0').length - 1;
    const one = s.length - zero;
    for (let i = m; i >= zero; i--) {
      for (let j = n; j >= one; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zero][j - one] + 1);
      }
    }
  }

  return dp[m][n];
}
