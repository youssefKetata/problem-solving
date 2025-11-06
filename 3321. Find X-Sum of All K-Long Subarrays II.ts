export class MyMinHeap {
  private heap: Array<[number, number, number]> = []; // [priority, value, freq]

  push(val: number, freq: number) {
    const priority = freq * 1e10 + val; // Combined priority
    this.heap.push([priority, val, freq]);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): [number, number] | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return [min[1], min[2]];
  }

  peek(): [number, number] | null {
    return this.heap.length > 0 ? [this.heap[0][1], this.heap[0][2]] : null;
  }

  get size() {
    return this.heap.length;
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[idx][0] >= this.heap[parent][0]) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }

  private bubbleDown(idx: number) {
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }
}

class MyMaxHeap {
  private heap: Array<[number, number, number]> = []; // [priority, value, freq]

  push(val: number, freq: number) {
    const priority = freq * 1e10 + val;
    this.heap.push([priority, val, freq]);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): [number, number] | null {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return [max[1], max[2]];
  }

  peek(): [number, number] | null {
    return this.heap.length > 0 ? [this.heap[0][1], this.heap[0][2]] : null;
  }

  get size() {
    return this.heap.length;
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[idx][0] <= this.heap[parent][0]) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }

  private bubbleDown(idx: number) {
    while (true) {
      let largest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (
        left < this.heap.length &&
        this.heap[left][0] > this.heap[largest][0]
      ) {
        largest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][0] > this.heap[largest][0]
      ) {
        largest = right;
      }
      if (largest === idx) break;

      [this.heap[idx], this.heap[largest]] = [
        this.heap[largest],
        this.heap[idx],
      ];
      idx = largest;
    }
  }
}

function findXSum(nums: number[], k: number, x: number): number[] {
  const n = nums.length;
  const answer: number[] = [];
  const freqMap = new Map<number, number>();

  const topHeap = new MyMinHeap();
  const restHeap = new MyMaxHeap();
  const inTop = new Map<number, number>(); // value -> frequency (what's currently in top)
  let topSum = 0;

  const isValid = (val: number, freq: number): boolean => {
    return freqMap.get(val) === freq;
  };

  const cleanTopHeap = () => {
    while (topHeap.size > 0) {
      const item = topHeap.peek()!;
      if (isValid(item[0], item[1]) && inTop.get(item[0]) === item[1]) {
        break;
      }
      topHeap.pop();
    }
  };

  const cleanRestHeap = () => {
    while (restHeap.size > 0) {
      const item = restHeap.peek()!;
      if (isValid(item[0], item[1]) && !inTop.has(item[0])) {
        break;
      }
      restHeap.pop();
    }
  };

  const addToTop = (val: number, freq: number) => {
    inTop.set(val, freq);
    topHeap.push(val, freq);
    topSum += val * freq;
  };

  const removeFromTop = (val: number, freq: number) => {
    inTop.delete(val);
    topSum -= val * freq;
  };

  const rebalance = () => {
    // Move from rest to top if needed
    while (inTop.size < x) {
      cleanRestHeap();
      if (restHeap.size === 0) break;

      const item = restHeap.pop()!;
      if (isValid(item[0], item[1]) && !inTop.has(item[0])) {
        addToTop(item[0], item[1]);
      }
    }

    // Swap if rest has better candidates
    while (inTop.size === x) {
      cleanRestHeap();
      cleanTopHeap();

      if (restHeap.size === 0 || topHeap.size === 0) break;

      const restTop = restHeap.peek()!;
      const topMin = topHeap.peek()!;

      if (!isValid(restTop[0], restTop[1]) || inTop.has(restTop[0])) {
        restHeap.pop();
        continue;
      }

      if (!isValid(topMin[0], topMin[1]) || !inTop.has(topMin[0])) {
        topHeap.pop();
        continue;
      }

      const restPriority = restTop[1] * 1e10 + restTop[0];
      const topPriority = topMin[1] * 1e10 + topMin[0];

      if (restPriority > topPriority) {
        restHeap.pop();
        topHeap.pop();

        removeFromTop(topMin[0], topMin[1]);
        addToTop(restTop[0], restTop[1]);

        restHeap.push(topMin[0], topMin[1]);
      } else {
        break;
      }
    }
  };

  const updateFreq = (val: number, delta: number) => {
    const oldFreq = freqMap.get(val) || 0;
    const newFreq = oldFreq + delta;

    // Remove old entry if it was in top
    if (oldFreq > 0 && inTop.get(val) === oldFreq) {
      removeFromTop(val, oldFreq);
    }

    // Update frequency map
    if (newFreq > 0) {
      freqMap.set(val, newFreq);
      restHeap.push(val, newFreq);
    } else {
      freqMap.delete(val);
    }

    rebalance();
  };

  // Initialize first window
  for (let i = 0; i < k; i++) {
    updateFreq(nums[i], 1);
  }

  answer.push(topSum);

  // Slide the window
  for (let i = k; i < n; i++) {
    updateFreq(nums[i - k], -1);
    updateFreq(nums[i], 1);
    answer.push(topSum);
  }

  return answer;
}
