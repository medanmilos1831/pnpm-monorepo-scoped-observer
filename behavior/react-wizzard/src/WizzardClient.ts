import { WizzardService } from './WizzardService';

export class WizzardClient<T extends string = string> {
  private items = new Map<string, WizzardService<T>>();

  subscribe(name: string, service: WizzardService<T>) {
    if (!this.items.has(name)) {
      this.items.set(name, service);
    }
    return this.getWizzardByName(name);
  }

  removeItem(name: string): void {
    this.items.delete(name);
  }

  getWizzardByName(name: string): WizzardService<T> {
    if (!this.items.has(name)) {
      throw new Error(
        `Wizzard with name "${name}" was not found in the registry.`
      );
    }
    return this.items.get(name)!;
  }
}
