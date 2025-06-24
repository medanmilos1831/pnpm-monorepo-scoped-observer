export type actionType = {
  scope: string;
  eventName: string;
  payload?: any;
};

export type subscribeType = {
  scope: string;
  eventName: string;
  callback: (data: { payload: any }) => void;
};

export type interceptorType = {
  scope: string;
  eventName: string;
  callback: (data: any) => any;
};

export type scopeNodeType = {
  scope: string;
  log?: boolean;
  subScopes?: scopeNodeType[];
};
