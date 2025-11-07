import { framework } from "./framework";

function createApp(
  client: (app: Pick<typeof framework, "createStateManager">) => any
) {
  const app = framework.createStateManager({
    id: "APP",
    state: {},
    mutations(state) {
      return {
        setState: (state: any) => {
          state.state = state;
        },
      };
    },
    getters(state) {
      return {
        getState: () => state,
      };
    },
  });
  return client({
    createStateManager: framework.createStateManager,
  });
}

export { createApp };
