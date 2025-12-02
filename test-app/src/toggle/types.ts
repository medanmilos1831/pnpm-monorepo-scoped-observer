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

export type InterceptorAction = "open" | "close";

type Channel = {
  subscribe: (
    eventName: EventName.ON_CHANGE,
    callback: (payload: EventPayload) => void
  ) => () => void;
  useToggle: (
    initialValue?: boolean
  ) => [boolean, (message?: any) => void, message: any];
  useInterceptor: (callback: any, action?: InterceptorAction) => void;
  open: (message?: any) => void;
  close: (message?: any) => void;
};

export type { Channel, EventPayload };
export { EventName };
