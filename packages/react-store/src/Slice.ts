import { Descriptor, GetFn, mutateParams, MutFn } from "./types";
import { createEventManager } from "@scoped-observer/core";

export class Slice<
  DATA,
  MUTS extends Record<string, MutFn<DATA>>,
  GETS extends Record<string, GetFn<DATA, any>>
> {
  data: DATA;
  manager!: any;
  constructor(
    private name: string,
    initial: DATA,
    private descriptor: Descriptor<DATA, MUTS, GETS>
  ) {
    this.data = initial;
    this.manager = createEventManager([
      {
        scope: this.name,
      },
    ]);
  }

  mutate = <K extends keyof MUTS>(
    params: mutateParams<Descriptor<DATA, MUTS, GETS>, K>
  ) => {
    this.data = this.descriptor.mutations[params.mutation](
      this.data,
      params.payload
    );

    params.runEvents?.forEach((eventName) => {
      this.manager.dispatch({ scope: this.name, eventName });
    });
  };

  selector = <K extends keyof GETS>(
    key: K,
    ...args: Parameters<GETS[K]>
  ): ReturnType<GETS[K]> => this.descriptor.getters[key](this.data, ...args);
}
