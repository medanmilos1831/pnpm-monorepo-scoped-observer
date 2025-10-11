const createEventName = (name: string, eventName: string) => {
  return `${name}.${eventName}`;
};

export { createEventName };
