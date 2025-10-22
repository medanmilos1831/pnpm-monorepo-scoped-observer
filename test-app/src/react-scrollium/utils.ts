import { getters as gettersFn } from "./Store/Entity/getters";

export function getScrolliumData(getters: ReturnType<typeof gettersFn>) {
  return {
    scrollPosition: getters.getScrollPosition(),
    isStart: getters.getIsStart(),
    isEnd: getters.getIsEnd(),
    clientSize: getters.getClientSize(),
    scrollSize: getters.getScrollSize(),
    progress: getters.getProgress(),
    direction: getters.getDirection(),
    isScrolling: getters.getIsScrolling(),
    id: getters.getId(),
  };
}
