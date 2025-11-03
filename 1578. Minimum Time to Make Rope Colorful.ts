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

const colors = 'aaaaaaaaaaaaaa';
const neededTime = [1, 3, 6, 5, 4, 5, 4, 4, 2, 8, 3, 10, 6, 6];

console.log(minCost(colors, neededTime));
