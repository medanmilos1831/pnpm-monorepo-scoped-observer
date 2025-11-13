export type ScopeNode = {
  scope: string;
  subScopes?: ScopeNode[];
};

export const ROOT_SCOPE = "root";
