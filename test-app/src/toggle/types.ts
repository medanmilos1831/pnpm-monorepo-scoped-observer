enum EventName {
  ON_CHANGE = "onChange",
}
type onChangePayload = {
  open: boolean;
  message?: any;
};
type EventPayload = {
  payload: onChangePayload;
  eventName: string;
  scope: string;
};

type Channel = {
  subscribe: (
    eventName: EventName.ON_CHANGE,
    callback: (payload: EventPayload) => void
  ) => () => void;
  useToggle: () => [boolean, (message?: any) => void, message: any];
  open: (message?: any) => void;
  close: (message?: any) => void;
};

export type { Channel, EventPayload };
export { EventName };
