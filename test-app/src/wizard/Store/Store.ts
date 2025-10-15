import type { ISlice } from "./types";

class Store {
  slices = new Map<string, ISlice>();
  getSlice = (id: string) => {
    return this.slices.get(id)!;
  };
  removeSlice = (id: string) => {
    this.slices.delete(id);
  };
  createSlice = (id: string, slice: () => ISlice) => {
    if (!this.getSlice(id)) {
      this.slices.set(id, slice());
    }
    return {
      slice: this.getSlice(id)!,
      disconnect: () => {
        this.removeSlice(id);
      },
    };
  };
}

export { Store };
