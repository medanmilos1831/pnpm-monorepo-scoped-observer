export interface IStep {
  name: string;
  state: any;
  prevState: any;
  isCompleted: boolean;
  setCompleted: (isCompleted: boolean) => void;
  setState: (state: any) => void;
  isChanged: boolean;
  setIsChanged: (isChanged: boolean) => void;
}
