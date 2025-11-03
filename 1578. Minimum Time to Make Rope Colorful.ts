function minCost(colors: string, neededTime: number[]): number {
  let secondPointer = 0;
  let sum = 0;
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] !== colors[i + 1]) {
      continue;
    } else if (colors[i] === colors[i + 1]) {
      secondPointer = i + 1;
      while (true) {
        if (colors[secondPointer] == colors[i]) {
          let minIndex =
            neededTime[secondPointer] < neededTime[i] ? secondPointer : i;
          sum += neededTime[minIndex];
          console.log(
            `i :${i}, secondPointer: ${secondPointer}, i value: ${neededTime[i]}, secondPointer value: ${neededTime[secondPointer]}, minIndex: ${minIndex}, sum: ${sum}`
          );
          //   move the i if it was the chosen
          if (minIndex === i) {
            i = secondPointer;
          }
          secondPointer++;
          continue;
        } else {
          i = secondPointer - 1;
          break;
        }
      }
    }
  }
  return sum;
}

function minCost2(colors: string, neededTime: number[]): number {
  let total = 0;
  let maxTime = neededTime[0];
  for (let i = 1; i < colors.length; i++) {
    if (colors[i] === colors[i - 1]) {
      // Add the smaller time to total, keep the max for the group
      total += Math.min(maxTime, neededTime[i]);
      maxTime = Math.max(maxTime, neededTime[i]);
    } else {
      maxTime = neededTime[i];
    }
  }
  return total;
}

function minCost3(colors: string, neededTime: number[]): number {
  let total = 0;

  for (let i = 0; i < colors.length - 1; i++) {
    if (colors[i] === colors[i + 1]) {
      if (neededTime[i] < neededTime[i + 1]) {
        total += neededTime[i];
      } else {
        total += neededTime[i + 1];
        neededTime[i + 1] = neededTime[i];
      }
    }
  }

  return total;
}

const colors = 'aaabbbabbbb';
const neededTime = [3, 5, 10, 7, 5, 3, 5, 5, 4, 8, 1];

console.log(minCost(colors, neededTime));
console.log(minCost2(colors, neededTime));
console.log(minCost3(colors, neededTime));
