import { createApp } from "./createApp";
import { createContextInstance } from "./createContextInstance";

const framework = (function () {
  const app = createApp({
    createModule(props: any): ReturnType<typeof createContextInstance> {
      return createContextInstance(
        props.name,
        props.entity,
        props.actions,
        props.listeners
      );
    },
  });
  return {
    createModule: app.mutations.createModule,
  };
})();

export { framework };
