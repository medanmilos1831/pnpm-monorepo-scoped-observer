export interface Slice<T, E extends string> {
  name: string;
  useSubscribe<R>(cb: (state: T) => R, events: E[]): R;
  getState(): T;
  action(args: { type: E; payload?: any; silent?: boolean }): void;
}
