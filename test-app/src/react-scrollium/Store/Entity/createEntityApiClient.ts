import { createModuleInstance } from "../../core/createModuleInstance";
import { createObserver } from "../../core/observer";
import {
  SCROLLIUM_SCOPE,
  type ScrolliumProps,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createScrolliumModules } from "./createScrolliumModules";
import { createScrolliumState } from "./createScrolliumState";

const createEntityApiClient = (props: ScrolliumProps) => {
  const stateManager = createScrolliumState(props);
  const observer = createObserver(SCROLLIUM_SCOPE);
  const modules = createScrolliumModules({
    stateManager: stateManager,
    observer,
  });
  const obj = {
    stateManager,
    modules,
    observer,
  };

  return createModuleInstance(obj, {
    api(value) {
      const state = value.stateManager;
      const getters = state.getters;
      const commands = value.modules.commands;

      const addEventListener = (
        event: `${ScrolliumPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return value.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };

      return {
        getMutations: () => value.stateManager.mutations,
        getGetters: () => value.stateManager.getters,
        getScroll: () => value.modules.scroll,
        getCommands: () => value.modules.commands,
        addEventListener,
        getSubscribeInternal: () => value.observer.subscribe,
        getClientEntity: () => {
          return {
            addEventListener,
            commands,
            getters,
          };
        },
        getClient: () => {
          return {
            id: state.getters.getId(),
            scrollPosition: state.getters.getScrollPosition(),
            axis: state.getters.getAxis(),
            direction: state.getters.getDirection(),
            progress: state.getters.getProgress(),
            isStart: state.getters.getIsStart(),
            isEnd: state.getters.getIsEnd(),
            clientSize: state.getters.getClientSize(),
            scrollSize: state.getters.getScrollSize(),
            isScrolling: state.getters.getIsScrolling(),
          };
        },
      };
    },
  });
};

export { createEntityApiClient };
