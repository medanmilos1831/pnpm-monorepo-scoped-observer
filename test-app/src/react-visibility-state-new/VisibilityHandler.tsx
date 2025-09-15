import { VISIBILITY_EVENT_NAME, VISIBILITY_SCOPE } from "./constants";
import type { VisibilityInstance } from "./VisibilityInstance";
import { useSyncExternalStore } from "react";

const VisibilityHandler = ({
  name,
  instance,
  children,
}: {
  name: string;
  instance: VisibilityInstance;
  children: (props: any) => React.ReactNode;
}) => {
  const state = useSyncExternalStore(
    (callback) => {
      return instance.eventManager.subscribe({
        scope: VISIBILITY_SCOPE,
        eventName: VISIBILITY_EVENT_NAME.VISIBILITY_CHANGE,
        callback,
      });
    },
    () => {
      return instance.state;
    }
  );
  return <>{children({ name, state })}</>;
};

export { VisibilityHandler };
