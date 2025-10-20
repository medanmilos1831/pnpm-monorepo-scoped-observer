import { Observer } from "./Observer";

export function createClient() {
  const observer = new Observer();

  return {
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
