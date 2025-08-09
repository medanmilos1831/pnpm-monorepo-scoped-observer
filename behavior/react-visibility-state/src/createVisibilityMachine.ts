import { createMachine } from '@scoped-observer/react-state-machine';

export const createVisibilityMachine = () => {
  return createMachine({
    init: 'close',
    transition: {
      close: {
        on: {
          TOGGLE: 'open',
        },
      },
      open: {
        on: {
          TOGGLE: 'close',
        },
      },
    },
  });
};
