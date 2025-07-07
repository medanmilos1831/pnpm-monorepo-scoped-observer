import { ScrollEntity } from './ScrollEntity';

export class ScrollObserver {
  registry = new Map<string, ScrollEntity>();

  clearRegisty = () => {
    this.registry.clear();
  };
}
