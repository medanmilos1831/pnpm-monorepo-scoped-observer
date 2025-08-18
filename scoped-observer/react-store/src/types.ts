export interface Slice<T, E extends string> {
  name: string;
  useSubscibe<R>(cb: (state: T) => R, events: E[]): R;
  getState(): T;
  action(args: { type: E; payload?: any }): void;
}
