export enum INITIAL_STATE {
  ON = "on",
  OFF = "off",
}

export type initialStateType = `${INITIAL_STATE}`;

export type VisibilityProps = {
  id: string;
  initState: initialStateType;
};

export interface IModelState {
  visibility: initialStateType;
}

export interface IModelMutations {
  setVisibility: (visibility: initialStateType) => void;
}

export interface IModelGetters {
  getVisibility: () => initialStateType;
}

export interface ICommands {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export interface ISubscribers {
  onChange: (callback: (payload: initialStateType) => void) => () => void;
}

export interface IModelApiClient {
  commands: ICommands;
  subscribers: ISubscribers;
  getVisibility: () => initialStateType;
}
