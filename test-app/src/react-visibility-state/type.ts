type DefaultReturn = {
  state: "open" | "close";
  payload: any;
  open: Function;
  close: Function;
  reset: Function;
};

type CallbackReturn<C> = {
  state: "open" | "close";
  payload: any;
  callbackValue: C;
  open: Function;
  close: Function;
  reset: Function;
};

export type UseWatchReturn<C> = C extends undefined
  ? DefaultReturn
  : CallbackReturn<C>;
