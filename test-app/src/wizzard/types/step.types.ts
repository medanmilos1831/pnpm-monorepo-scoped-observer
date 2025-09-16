export interface IStep {
  name: string;
  state: any;
  prevState: any;
  isCompleted: boolean;
}
