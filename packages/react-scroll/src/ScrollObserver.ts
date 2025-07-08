import { ScrollInstance } from './ScrollInstance';

export class ScrollObserver {
  registry = new Map<string, ScrollInstance>();

  clearRegisty = () => {
    this.registry.clear();
  };
}
