class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  const numSet = new Set(nums);
  let listNode = new ListNode(0);
  let tail = listNode;
  let curr = head;
  while (curr) {
    if (numSet.has(curr.val)) {
      tail.next = new ListNode(curr.val);
      tail = tail.next;
    }
    curr = curr.next;
  }
  return listNode.next;
}

// Helper to create a linked list from an array
function arrayToList(arr: number[]): ListNode | null {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (let num of arr) {
    curr.next = new ListNode(num);
    curr = curr.next;
  }
  return dummy.next;
}

// Helper to print a linked list as an array
function listToArray(head: ListNode | null): number[] {
  let arr: number[] = [];
  let curr = head;
  while (curr) {
    arr.push(curr.val);
    curr = curr.next;
  }
  return arr;
}

const nums3217 = [1, 2, 3];
const headArr = [1, 2, 3, 4, 5];
const head = arrayToList(headArr);

const result = modifiedList(nums3217, head);
console.log(listToArray(result));
