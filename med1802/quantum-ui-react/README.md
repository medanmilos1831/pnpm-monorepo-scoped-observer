# Quantum UI React

Hooks layer for `@med1802/quantum-ui`. It bridges the entity-based module system
with idiomatic React patterns so you can create, select, and observe entities
directly inside components.

---

## Features

- `createModule` wrapper that mirrors the base Quantum UI API
- `useEntitySelector(id)` — returns the client object produced by `clientSchema`
  and re-renders when the entity loads/destroys
- `useCreateEntity({ id, state })` — create/destroy entities inside component lifecycles
- Works with `useSyncExternalStore` under the hood for concurrent-safe updates
- Fully typed generics forwarded from the underlying module config

---

## Installation

```bash
npm install @med1802/quantum-ui-react
```

---

## Quick Start

```tsx
import { useSyncExternalStore } from "react";
import { quantumUiReact } from "@med1802/quantum-ui-react";

enum ToggleState {
  ON = "on",
  OFF = "off",
}

type ToggleStateType = `${ToggleState}`;

interface IToggleClient {
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => ToggleStateType;
  onChangeSubscriber: (notify: () => void) => () => void;
}

const { useEntitySelector, useCreateEntity } = quantumUiReact.createModule<
  ToggleStateType,
  IToggleClient
>({
  name: "toggle",
  onCreateEntity: ({ id, state }) => ({
    id,
    state,
  }),
  clientSchema: (store) => ({
    onOpen: () => {
      store.setState(() => ToggleState.ON);
    },
    onClose: () => {
      store.setState(() => ToggleState.OFF);
    },
    onToggle: () => {
      store.setState((prevState) =>
        prevState === ToggleState.ON ? ToggleState.OFF : ToggleState.ON
      );
    },
    getState: () => store.getState(),
    onChangeSubscriber: (notify) => {
      return store.subscribe(() => {
        notify();
      });
    },
  }),
});

const HomePageReact = () => {
  useCreateEntity({ id: "toggleOne", state: ToggleState.ON });
  const toggle = useEntitySelector("toggleOne");
  const value = useSyncExternalStore(
    toggle?.onChangeSubscriber ?? (() => () => {}),
    toggle?.getState ?? (() => ToggleState.OFF)
  );

  return (
    <div>
      <div>Current: {value}</div>
      <button onClick={() => toggle?.onOpen()}>Open</button>
      <button onClick={() => toggle?.onClose()}>Close</button>
      <button onClick={() => toggle?.onToggle()}>Toggle</button>
    </div>
  );
};
```

---

## API Reference

### `quantumUiReact.createModule<S, A>(config)`

Accepts the same config as `quantumUi.createModule`:

- `name` – descriptive identifier
- `onCreateEntity({ id, state })` – returns `{ id, state }`
- `clientSchema(store)` – receives the raw store instance and returns your client object (`A`)

The returned module exposes:

- `useEntitySelector(id: string)`  
  React hook that returns the client object (`A`) for a given id. Re-renders when
  the entity loads, updates, or is destroyed.

- `useCreateEntity({ id, state })`  
  React hook that creates the entity on mount and destroys it on unmount.

- `createEntity`, `getEntityById`, `destroyEntity`, `onEntityLoad`, `onEntityDestroy`  
  Direct pass-through helpers from the underlying Quantum UI module if you need
  to manage entities outside of React hooks.

### Store access inside `clientSchema`

The `store` argument is the raw `core.createStore` instance, so you can:

- Call `store.setState((draft) => nextDraft, { customEvents? })`
- Read the current value via `store.getState()`
- Subscribe to updates with `store.subscribe(listener, eventName?)`

---

## License

MIT
