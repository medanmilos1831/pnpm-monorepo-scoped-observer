# Quantum UI React

Hooks layer for `@med1802/quantum-ui`. It bridges the entity-based module system
with idiomatic React patterns so you can create, select, and observe entities
directly inside components.

---

## Features

- `createModule` wrapper that mirrors the base Quantum UI API
- `useEntitySelector(id)` — subscribe to store changes for one entity
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
import { useEffect } from "react";
import { quantumUiReact } from "@med1802/quantum-ui-react";

const counterModule = quantumUiReact.createModule<number>({
  name: "counter",
  store: ({ id, state }) => ({
    id,
    state,
  }),
});

const HomePage = () => {
  // Returns the entity store instance (or undefined if not created yet)
  const counter = counterModule.useEntitySelector("counter");

  // Ensures the entity exists for the lifetime of this component
  counterModule.useCreateEntity({ id: "counter", state: 0 });

  useEffect(() => {
    const unsubscribe = counter?.subscribe(({ prevState, newState }) => {
      console.log(prevState, newState);
    });
    return () => {
      unsubscribe?.();
    };
  }, [counter]);

  return (
    <button onClick={() => counter?.setState((value) => value + 1)}>
      Increment ({counter?.state ?? 0})
    </button>
  );
};
```

---

## API Reference

### `quantumUiReact.createModule<S>(config)`

Accepts the same config as `quantumUi.createModule` and returns:

- `useEntitySelector(id: string)`  
  React hook that returns the entity store (`core.createStore`) for a given id.
  Re-renders when lifecycle events fire or the entity is removed.

- `useCreateEntity({ id, state })`  
  React hook that creates the entity on mount and destroys it on unmount.

- `createEntity`, `getEntityById`, `onEntityLoad`, `onEntityDestroy`  
  Direct pass-through helpers from the underlying Quantum UI module if you need
  to manage entities outside of React hooks.

### Entity store

The value returned by `useEntitySelector` is the raw `core.createStore` instance, so you can:

- Call `store.setState((draft) => nextDraft)` with optional `{ customEvents }`
- Read `store.state` for the latest snapshot
- Call `store.subscribe(listener)` for low-level observers

---

## License

MIT
