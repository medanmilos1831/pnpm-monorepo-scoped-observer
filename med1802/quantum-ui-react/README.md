# 🔄 Quantum UI React

React hooks integration layer for `@med1802/quantum-ui` modules. It wires
lifecycle hooks and `useSyncExternalStore` so that React components can subscribe
to `quantum-ui` models without writing boilerplate.

## ✨ Features

- `useModelSelector(id)` – subscribe to a specific model instance
- `useCreateModel(id, props)` – create/remove models inside React effects
- Full TypeScript support with generics for your module API
- Lightweight wrapper around existing `quantum-ui` modules

## 🚀 Usage

```tsx
import { quantumUiReact } from "@med1802/quantum-ui-react";
import { useEffect, useSyncExternalStore } from "react";

const quantumUi = quantumUiReact();

interface ToggleState {
  status: string;
}

interface ToggleMutations {
  setStatus: (status: string) => void;
}

interface ToggleGetters {
  getStatus: () => string;
}

interface ToggleApiClient {
  commands: {
    toggle: () => void;
  };
  subscribers: {
    onChange: (callback: (payload: string) => void) => () => void;
  };
  getStatus: () => string;
}

const toggleModule = quantumUi.createModule<
  ToggleState,
  ToggleMutations,
  ToggleGetters,
  ToggleApiClient
>({
  name: "toggle",
  model: (props: { id: string; initState: "on" | "off" }) => {
    return {
      id: props.id,
      state: {
        status: prop.initState,
      },
      mutations(state) {
        return {
          setStatus: (status: string) => {
            state.status = status;
          },
        };
      },
      getters(state) {
        return {
          getStatus: () => state.status,
        };
      },
    };
  },
  modelClient: (model, broker) => {
    return {
      commands: {
        toggle: () => {
          model.mutations.setStatus(
            model.getters.getStatus() === "on" ? "off" : "on"
          );
          broker.publish({
            eventName: "onChange",
            payload: model.getters.getStatus(),
          });
        },
      },
      subscribers: {
        onChange: (callback: (payload: string) => void) => {
          return broker.subscribe({
            eventName: "onChange",
            callback,
          });
        },
      },
      getStatus: model.getters.getStatus,
    };
  },
});

const HomePage = () => {
  const modelSelector = toggleModule.useModelSelector("toggle");
  toggleModule.useCreateModel({ id: "toggle", initState: "on" });
  const model = toggleModule.getModelById("toggle");
  const visibility = useSyncExternalStore(
    model.subscribers.onChange,
    model.getStatus
  );

  useEffect(() => {
    return () => {
      toggleModule.removeModel("toggle");
    };
  }, []);

  return (
    <div>
      <h1>Status: {visibility}</h1>
      <button onClick={() => model.commands.toggle()}>Toggle</button>
    </div>
  );
};
```
