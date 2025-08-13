import { createMachine } from '@scoped-observer/react-state-machine';

type StepConfig<T extends string> = Record<
  T,
  { element: (props: any) => JSX.Element }
>;

export class WizzardService<T extends string = string> {
  name: string;
  machine: any;
  totalSteps: number;
  stepsName: T[];
  activeStep: T;
  next: T;
  prev: T;
  keys: T[];
  isLast: boolean;
  isFirst: boolean;

  constructor(config: { name: string; init: T; steps: StepConfig<T> }) {
    this.name = config.name;
    this.machine = createMachine({
      init: config.init,
      transition: this.parseSteps(config.steps),
    });

    this.keys = Object.keys(config.steps) as T[];
    this.totalSteps = this.keys.length;
    this.stepsName = this.keys;
    this.activeStep = config.init;

    const { next, prev } = this.getPrevNext(this.keys, this.activeStep);
    this.next = next;
    this.prev = prev;
    this.isLast = this.activeStep === this.keys[this.keys.length - 1];
    this.isFirst = this.activeStep === this.keys[0];
  }

  getPrevNext(keys: T[], current: T): { prev: T; next: T } {
    const index = keys.indexOf(current);
    if (index === -1) {
      throw new Error(`Key "${current}" not found in list`);
    }

    const prev = keys[(index - 1 + keys.length) % keys.length];
    const next = keys[(index + 1) % keys.length];

    return { prev, next };
  }

  parseSteps(obj: StepConfig<T>) {
    const keys = Object.keys(obj) as T[];
    const output: Record<T, { on: Record<T, T> }> = {} as any;

    keys.forEach((key) => {
      output[key] = { on: {} as Record<T, T> };

      keys.forEach((targetKey) => {
        if (targetKey !== key) {
          output[key].on[targetKey] = targetKey;
        }
      });
    });

    return output;
  }

  changeStep(step: T) {
    this.activeStep = step;
    const { next, prev } = this.getPrevNext(this.keys, this.activeStep);
    this.next = next;
    this.prev = prev;
    this.isFirst = this.activeStep === this.keys[0];
    this.isLast = this.activeStep === this.keys[this.keys.length - 1];

    this.machine.handler({ type: step });
  }

  nextStep() {
    if (this.isLast) return;
    this.changeStep(this.next);
  }

  prevStep() {
    if (this.isFirst) return;
    this.changeStep(this.prev);
  }
}
