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
  useToggle: () => [boolean, () => void, message: any];
  open: (payload?: { message?: any }) => void;
  close: () => void;
};

export type { Channel, EventPayload };
export { EventName };
