import { useEffect, useState } from 'react';
import { Slice } from './Slice';
import { Descriptor, GetFn, MutFn } from './types';

class Store {
  slices = {} as Record<string, Slice<any, any, any>>;

  createSlice = <
    NAME extends string,
    DATA,
    MUTS extends Record<string, MutFn<DATA>>,
    GETS extends Record<string, GetFn<DATA, any>>
  >(
    name: NAME,
    data: DATA,
    descriptor: Descriptor<DATA, MUTS, GETS>
  ) => {
    const slice = new Slice(name, data, descriptor);
    this.slices[name] = slice;

    return {
      mutate: slice.mutate,
      selector: slice.selector as <K extends keyof GETS>(
        key: K,
        ...args: Parameters<GETS[K]>
      ) => ReturnType<GETS[K]>,
    };
  };
}

const store = new Store();

const createSlice = store.createSlice;

const useSlice = <
  NAME extends keyof typeof store.slices,
  DATA = ReturnType<(typeof store.slices)[NAME]['data']>
>(
  sliceName: NAME,
  selector: (data: DATA) => any,
  deps: string[]
) => {
  const slice = store.slices[sliceName];
  if (!slice) throw new Error(`Slice "${String(sliceName)}" not found`);

  const [_, setState] = useState(0);

  useEffect(() => {
    const slice = store.slices[sliceName];

    const unsubscribe = deps.map((eventName) => {
      return slice.manager.subscribe({
        scope: sliceName,
        eventName,
        callback() {
          setState((prev) => {
            return prev + 1;
          });
        },
      });
    });
    return () => unsubscribe.forEach((i) => i());
  }, []);

  return selector(slice.data);
};

export { createSlice, useSlice };
