class EventScope extends EventTarget {
  scopeName: string;
  subScopes: Map<string, EventScope> = new Map();

  constructor(scopeName: string) {
    super();
    this.scopeName = scopeName;
  }

  dispatch = ({
    eventName,
    payload = undefined,
  }: {
    eventName: string;
    payload?: any;
  }) => {
    const event = new CustomEvent(eventName, {
      detail: {
        payload,
      },
    });
    this.dispatchEvent(event);
  };
  subscribe = (eventName: string, callback: (e: any) => void) => {};
}

export { EventScope };
