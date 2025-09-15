export enum VISIBILITY_STATE {
  OPEN = "open",
  CLOSE = "close",
}
export type VisibilityConfig = {
  name: string;
  initState: VISIBILITY_STATE;
};
