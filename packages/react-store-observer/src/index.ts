import { store } from "./Store";
import { useSubscribe } from "./useSubscribe";

const getter = store.getter;
const mutate = store.mutate;
const generateStore = store.generateStore;

export * from "./types";
export { generateStore, getter, mutate, useSubscribe };
