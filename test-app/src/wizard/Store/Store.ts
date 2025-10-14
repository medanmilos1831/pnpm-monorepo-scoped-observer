import type { ISlice } from "./types";

class Store {
  slices = new Map<string, ISlice>();
  addSlice = (id: string, slice: ISlice) => {
    this.slices.set(id, slice);
  };
  getSlice = (id: string) => {
    return this.slices.get(id)!;
  };
  removeSlice = (id: string) => {
    this.slices.delete(id);
  };
  createSlice = (id: string, slice: () => ISlice) => {
    if (!this.getSlice(id)) {
      this.addSlice(id, slice());
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
