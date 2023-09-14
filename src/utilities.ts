import * as fs from "fs";

export function getFib(length: number): Array<number> {
  const fibs = [1, 2];
  if (length < 1) return [];
  else if (length == 1) return [1];
  else {
    for (let i = 1; i < length - 1; i++) {
      fibs.push(fibs[i] + fibs[i - 1]);
    }
    return fibs;
  }
}

export function isPrime(n: number): boolean {
  if (n == 1) return true;
  for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
    if (n % i === 0) return false;
  }
  return n >= 2;
}

export function isNegPrime(n: number): boolean {
  if (n == 0) return false;
  if (n == 1) return false;
  if (n < 0) n *= -1;
  for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
    if (n % i === 0) return false;
  }
  return n >= 2;
}

export function range(m: number, n: number): number[] {
  return Array.from(
    {
      length: n - m + 1
    },
    (_, i) => m + i
  );
}

// INTEGER FACTORS
export function getDivisors(n: number) {
  const rRoot: number = Math.sqrt(n),
    intRoot: number = Math.floor(rRoot),
    lows = range(1, intRoot).filter(function (x) {
      return n % x === 0;
    });

  // for perfect squares, we can drop the head of the 'highs' list
  return lows.concat(
    lows
      .map(function (x) {
        return n / x;
      })
      .reverse()
      .slice(+(intRoot === rRoot) | 0)
  );
}

export function isPalindrome(n: number): boolean {
  const str = n.toString();
  return str === reverseString(str);
}

export function reverseString(s: string): string {
  if (s === "") return "";
  return reverseString(s.substring(1)) + s[0];
}

export function factorial(n: number): number {
  return n < 2 ? 1 : n * factorial(n - 1);
}

export function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}
export function isSquare(n: number): boolean {
  return n == Math.sqrt(n) * Math.sqrt(n) && n % Math.sqrt(n) == 0 && n >= 4;
}

export function isCube(n: number): boolean {
  return (
    n == Math.cbrt(n) * Math.cbrt(n) * Math.cbrt(n) && n % Math.cbrt(n) == 0 && n >= 8
  );
}

export function findBaseExponent(n: number): BaseExponent | undefined {
  if (!isSquare(n) && !isCube(n)) return;

  let base = n;
  let exponent = 1;
  let res: BaseExponent;

  if (isSquare(n) && isCube(n)) {
    while (isSquare(base)) {
      base = Math.sqrt(base);
      exponent++;
    }
    res = { base, exponent };
    return res;
  } else
    while (isSquare(base)) {
      if (n % Math.sqrt(Math.sqrt(n)) == 0) exponent = 3;
      base = Math.sqrt(base);
      exponent++;
    }
  while (isCube(base)) {
    base = Math.cbrt(base);
    exponent += 2;
  }
  res = { base: base, exponent: exponent };
  return res;
}

export interface BaseExponent {
  base: number;
  exponent: number;
}

export function findPrime(n: number) {
  let i;
  const primes = [2, 3];
  let x = 5;
  for (i = 2; i <= n; i++) {
    while (!isPrime(x)) {
      x += 2;
    }
    primes.push(x);
    x += 2;
  }
  return primes[n - 1];
}

// 2, 3, 5, 7, 11, 13, 17, 19
export function sumPrimesLessThanN(limit: number): number {
  const start = 3;
  const stop = limit;
  const step = 2;

  if (limit == 2) return 2;

  return (
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step)
      .filter((value) => isPrime(value))
      .reduce((a, b) => a + b) + 2
  );
}

export function readFileToString(filepath: string) {
  try {
    return fs.readFileSync(filepath).toString();
  } catch (err) {
    console.log(err);
    return "";
  }
}

export function readFileToNumArrArr(filename: string) {
  try {
    const strs = fs.readFileSync(filename).toString().split("\n");
    const numberArray: number[][] = [];
    for (let line = 0; line < strs.length; line++) {
      const number = [parseInt(strs[line])];
      numberArray.push(number);
    }
    return numberArray;
  } catch (e) {
    if (typeof e == "string") {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
    return "Process Failed";
  }
}

export function stringToIntArr(string: string): number[] {
  const intArr: number[] = [];
  for (let i = 0; i < string.length; i++) {
    const int: number = parseInt(string.charAt(i));
    if (!isNaN(int)) {
      intArr.push(int);
    }
  }
  return intArr;
}

export function nthTriangleRecursive(n: number, ans = 0) {
  if (n == 0) {
    return ans;
  } else {
    ans += n;
    n--;
    return nthTriangleRecursive(n, ans);
  }
}

export function nthTriangleLoop(n: number) {
  let ans = 0;
  for (let number = n; number != 0; number--) {
    ans += number;
  }
  return ans;
}

export function readFileToNumArrByElement(filename: string) {
  try {
    const strs = fs.readFileSync(filename).toString().split("\r\n");
    const numberArray: number[][] = [];
    for (let i = 0; i < strs.length; i++) {
      const number = splitStrToNumArr(strs[i]);
      numberArray.push(number);
    }
    // console.log(numberArray[6]);
    // console.log(numberArray.length);
    return numberArray;
  } catch (e) {
    if (typeof e == "string") {
      console.log(e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    }
    return "Process Failed";
  }
}

export function splitStrToNumArr(string: string): number[] {
  // const string = "37107287533902102798797998220837590246510135740250";
  const arr: number[] = [];
  for (let char = 0; char < string.length; char++) {
    arr.push(parseInt(string.substring(char, char + 1)));
  }
  return arr;
}

export function combinations(n: number, r: number) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function stringToUint8Array(string: string) {
  return new TextEncoder().encode(string);
}

export function uint8ArrayToString(Uint8Array: Uint8Array): string {
  return new TextDecoder().decode(Uint8Array);
}

export function removeElement(array: never[], index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

export function removeDuplicates<T>(array: T[]): T[] {
  const newArray: T[] = [];

  for (let i = 0; i < array.length; i++) {
    if (!newArray.includes(array[i])) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

export function visualize(data: number[][]) {
  for (const line of data) {
    console.log(line.toString().replaceAll(",", ""));
  }
}

export class LRU_Cache<T> {
  capacity: number;
  cachedKeys: Set<T>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cachedKeys = new Set();
  }
  hasKey(key: T): boolean {
    if (!this.cachedKeys.has(key)) {
      return false;
    }
    this.cachedKeys.delete(key);
    this.cachedKeys.add(key);
    return true;
  }
  putKey(key: T): void {
    if (this.cachedKeys.size === this.capacity) {
      this.cachedKeys.delete(this.cachedKeys.values().next().value);
    }
    this.cachedKeys.add(key);
  }
  refer(key: T): void {
    if (!this.hasKey(key)) {
      this.putKey(key);
    }
  }
  display(): void {
    const list = [...this.cachedKeys];
    list.reverse();
    let result = "";
    for (const t of list) {
      result += t + " ";
    }
    console.log(result);
  }
  retrieveAll(): T[] {
    return [...this.cachedKeys].reverse();
  }
}

export class SimpleCache<K, V> {
  private cache: Map<string, V>;
  constructor() {
    this.cache = new Map<string, V>();
  }

  hasKey(key: K): boolean {
    return this.cache.has(JSON.stringify(key));
  }

  set(key: K, value: V): void {
    this.cache.set(JSON.stringify(key), value);
  }

  get(key: K): V | undefined {
    const sKey = JSON.stringify(key);
    return this.cache.get(sKey) ? this.cache.get(sKey) : undefined;
  }

  display() {
    const keys = Array.from(this.cache.keys()).map((key) => JSON.parse(key));
    const values = Array.from(this.cache.values());
    const pairs: [K, V][] = [];

    for (let i = 0; i < keys.length; i++) {
      pairs.push([keys[i], values[i]]);
    }
    console.log(pairs);
  }
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  display() {
    console.log(this.x, this.y);
  }
}

export class Pair<T, V> {
  first: T;
  second: V;

  constructor(first: T, second: V) {
    this.first = first;
    this.second = second;
  }

  display() {
    console.log(this.first, this.second);
  }
}
export function assertUnreachable(msg?: string): never {
  if (msg) throw new Error(msg);
  throw new Error("Didn't expect to get here");
}

export class MinHeap {
  // Min heaps can be represented as arrays. We can calculate an index's parent,
  // left and right child via simple math.
  array: number[];
  maxSize: number;

  constructor(maxSize: number) {
    this.array = [];
    this.maxSize = maxSize;
  }

  // Add the new value to the end of the array/tree. Heapify up. If our new heap is over capacity,
  // Remove the min value.
  insert(value: number) {
    this.array.push(value);
    this.minHeapifyUp();

    if (this.array.length > this.maxSize) {
      this.extract();
    }
  }

  // Remove the first (min) value from the array/tree. Move the last value to the front,
  // and heapify down.
  extract(): number {
    const min = this.array[0];
    this.array[0] = <number>this.array.pop();
    this.minHeapifyDown();

    return min;
  }

  // Retrieve the min value without removing it.
  peek(): number {
    return this.array[0];
  }

  // Start from the last value in the array/tree. Compare it to its parent. If parent value is greater
  // than the current, it does not satisfy the min heap requirement (parent is less than either of
  // its children). If so, swap the values and move up the tree. Otherwise, we're done.
  minHeapifyUp() {
    for (let ind = this.array.length - 1; ind > 0; ) {
      const parentInd = this.getParent(ind);
      if (this.array[parentInd] > this.array[ind]) {
        this.swap(parentInd, ind);
        ind = parentInd;
      } else {
        return;
      }
    }
  }

  // Start at the top of the heap, comparing the current node to whichever child has a smaller value.
  // If the current value is greater than its smallest child, it does not satisfy the min heap
  // Requirement. Swap it with the child and move down the tree. Otherwise, we're done.
  minHeapifyDown() {
    const lastInd = this.array.length - 1;
    for (let ind = 0; ind < lastInd; ) {
      const [leftInd, rightInd] = this.getChildren(ind);
      let childInd = leftInd;

      if (leftInd > lastInd) {
        return;
      } else if (rightInd <= lastInd && this.array[rightInd] < this.array[leftInd]) {
        childInd = rightInd;
      }

      if (this.array[ind] > this.array[childInd]) {
        this.swap(ind, childInd);
        ind = childInd;
      } else {
        return;
      }
    }
  }

  // ES6 destructure assignment that swaps two variables.
  swap(indA: number, indB: number) {
    [this.array[indA], this.array[indB]] = [this.array[indB], this.array[indA]];
  }

  // Calculation to get parent index
  getParent(ind: number): number {
    return Math.floor((ind - 1) / 2);
  }

  // Calculation to get left and right child indices, respectively.
  getChildren(ind: number): [number, number] {
    return [ind * 2 + 1, ind * 2 + 2];
  }
}

export class MaxBinaryHeap {
  // Array to save the nodes in the heap
  private _values: number[];
  public get values(): number[] {
    return this._values;
  }
  public set values(v: number[]) {
    this._values = v;
  }

  constructor() {
    // initialize the array
    this._values = [];
  }
  /**
   * Adds a new element to the max binary heap. Returns the success of the operation.
   * @param n Value of an integer to be added to the heap
   */
  public insert(n: number): boolean {
    // if this is the first element, add it to array and return
    if (this.values.length === 0) {
      this._values.push(n);
      return true;
    }

    // Add the element to the end of the list
    this._values.push(n);

    // Find the correct spot for the new node in the max heap
    return this.bubbleUp();
  }

  private bubbleUp(): boolean {
    // Index of the element we need to bubble up
    let index = this._values.length - 1;
    const element = this.values[index];
    let parentIndex = Math.floor((index - 1) / 2); // Parent index of a child at index = n: Math.floor(n-1/2)

    // Keep looping until the parent node is greater than the child node
    while (parentIndex >= 0 && this._values[parentIndex] < element) {
      // If parent < child, swap the nodes
      this._values[index] = this._values[parentIndex];
      this._values[parentIndex] = element;

      // Reset the indexes as we swapped the values
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
    return true;
  }

  /**
   * Return the maximum element in the heap and rebalances the heap.
   */
  public extractMax(): number | null {
    if (this._values.length === 0) {
      return null;
    }

    // First value in the list will always be the maximum one
    const max = this._values[0];
    const end = this._values.pop();

    // Get the last element in the list to the front
    if (this._values.length > 0) {
      if (end != null) {
        this._values[0] = end;
      }

      // Rebalance the heap by sinking down the node to the correct spot
      this.sinkDown();
    }
    return max;
  }
  private sinkDown() {
    let parentIdx = 0;
    let leftChildIdx = 0;
    let rightChildIdx = 0;
    const heapLength = this._values.length;

    const nodeToSink = this._values[parentIdx];
    let idxToSwap = 0;
    let swap = false;
    // Keep looping through the nodes util you find the right spot
    // eslint-disable-next-line no-constant-condition
    while (true) {
      leftChildIdx = 2 * parentIdx + 1;
      rightChildIdx = 2 * parentIdx + 2;

      swap = false;
      let leftChild;
      let rightChild;

      // Check with the left child only if it is a valid index
      if (leftChildIdx < heapLength) {
        leftChild = this._values[leftChildIdx];
        // Compare with the node to sink down
        if (nodeToSink < leftChild) {
          idxToSwap = leftChildIdx;
          swap = true;
        }
      }

      // Check with the right child only if it is a valid index
      if (rightChildIdx < heapLength) {
        rightChild = this._values[rightChildIdx];

        if (leftChild) {
          if ((swap && leftChild < rightChild) || (!swap && nodeToSink < rightChild)) {
            idxToSwap = rightChildIdx;
            swap = true;
          }
        }
      }

      if (!swap) {
        // If there is no swap required, we found the correct spot for the element
        return;
      } else {
        // Swap the elements
        this._values[parentIdx] = this._values[idxToSwap];
        this._values[idxToSwap] = nodeToSink;

        // Set the reference to index to its new value
        parentIdx = idxToSwap;
      }
    }
  }
}

export class Triplet<T, V, K> {
  first: T;
  second: V;
  third: K;

  constructor(first: T, second: V, third: K) {
    this.first = first;
    this.second = second;
    this.third = third;
  }
}

export function isNullOrUndefined<T>(value: T): boolean {
  return value === null || value === undefined;
}

export function product<T>(...iterables: T[][]): T[][] {
  let argv = Array.prototype.slice.call(arguments);
  let argc = argv.length;
  return iterables;
}
