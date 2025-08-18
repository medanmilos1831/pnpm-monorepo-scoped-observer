import { createContext, PropsWithChildren, useContext } from 'react';
import { WizzardClient } from './WizzardClient';

export const WizzardContext = createContext<WizzardClient | undefined>(
  undefined
);

const WizzardProvider = ({
  children,
  client,
}: PropsWithChildren<{ client: WizzardClient }>) => {
  return (
    <WizzardContext.Provider value={client}>{children}</WizzardContext.Provider>
  );
};

const useWizzard = (name: string) => {
  const context = useContext(WizzardContext)!;
  if (!context) {
    throw new Error('useWizzard must be used within WizzardProvider');
  }
  let wizzard = context.getWizzardByName(name);
  wizzard.machine.useMachine();
  return {
    totalSteps: wizzard.totalSteps,
    stepsName: wizzard.stepsName,
    activeStep: wizzard.activeStep,
    changeStep(type: string) {
      wizzard.changeStep(type);
    },
    nextStep() {
      if (wizzard.isLast) return;
      wizzard.changeStep(wizzard.next);
    },
    prevStep() {
      if (wizzard.isFirst) return;
      wizzard.changeStep(wizzard.prev);
    },
    next: wizzard.next,
    prev: wizzard.prev,
    isLast: wizzard.isLast,
    isFirst: wizzard.isFirst,
  };
};

const useWizzardClient = () => {
  const context = useContext(WizzardContext)!;
  if (!context) {
    throw new Error('useWizzard must be used within WizzardProvider');
  }
  return {
    getWizzardClient(name: string) {
      let wizzard = context.getWizzardByName(name);
      return {
        changeStep(type: string) {
          wizzard.changeStep(type);
        },
        nextStep() {
          if (wizzard.isLast) return;
          wizzard.changeStep(wizzard.next);
        },
        prevStep() {
          if (wizzard.isFirst) return;
          wizzard.changeStep(wizzard.prev);
        },
      };
    },
  };
};

export { useWizzard, WizzardClient, WizzardProvider, useWizzardClient };
