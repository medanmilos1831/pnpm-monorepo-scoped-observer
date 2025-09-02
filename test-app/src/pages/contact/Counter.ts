export class Counter {
  count: number = 0;

  increment(): void {
    this.count += 1;
  }

  decrement(): void {
    this.count -= 1;
  }

  reset(): void {
    this.count = 0;
  }

  getCount(): number {
    return this.count;
  }

  setCount(value: number): void {
    this.count = value;
  }
}
