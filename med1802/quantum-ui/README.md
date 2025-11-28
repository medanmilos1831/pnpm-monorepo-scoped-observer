# Quantum UI

Quantum UI helps you organize many small state machines (entities) inside a single module. Each module keeps a Map of entity stores, dispatches lifecycle events when entities mount or unmount, and lets you observe changes in plain JavaScript.

---

## Highlights

- **Entity-centric architecture** — Modules orchestrate many entity instances, each backed by an isolated store.
- **Reactive core** — Built on a minimal observer + store layer with custom lifecycle events.
- **Lifecycle hooks** — Automatic `onEntityLoad-{id}` and `onEntityDestroy-{id}` signals.

---

## Installation

```bash
npm install @med1802/quantum-ui
```

---

## Quick Start

```typescript
import { quantumUi, type ISubscribe } from "@med1802/quantum-ui";

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
  subscribe: ISubscribe<ToggleStateType>;
}

const toggleModule = quantumUi.createModule<ToggleStateType, IToggleClient>({
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
    subscribe: store.subscribe,
  }),
});

// Subscribe to lifecycle signals
toggleModule.onEntityLoad("toggleOne", (payload) => {
  console.log("ENTITY LOAD", payload);
});
toggleModule.onEntityDestroy("toggleOne", (payload) => {
  console.log("ENTITY DESTROY", payload);
});

// Create and consume an entity
toggleModule.createEntity({
  id: "toggleOne",
  state: ToggleState.ON,
});

const toggleOne = toggleModule.getEntityById("toggleOne");

// Subscribe to state changes
toggleOne?.subscribe((payload) => {
  console.log("STATE CHANGED", payload);
});

// Use client methods
toggleOne?.onToggle();
toggleOne?.onOpen();
toggleOne?.onClose();

// Destroy when you are done
toggleModule.destroyEntity("toggleOne");
```

---

## Module API

```ts
const module = quantumUi.createModule<S, A>(config);
```

### Config

- `name` — descriptive identifier (debugging aid).
- `onCreateEntity({ id, state })` — factory returning `{ id, state }` (can include computed fields).
- `clientSchema(store)` — factory that receives the store instance and returns a client object with your custom API.

### Returned helpers

- `createEntity({ id, state })` — registers a new entity; duplicate `id` calls are ignored.
- `getEntityById(id)` — returns the client object (type `A`) or `undefined`.
- `destroyEntity(id)` — removes an entity from the module.
- `onEntityLoad(id, callback)` — subscribes to load events for a specific entity id. Callback receives the client object.
- `onEntityDestroy(id, callback)` — subscribes to destroy events for a specific entity id. Callback receives `undefined`.

---

## Store API (`core.createStore`)

The store instance is available within `clientSchema` and provides:

- `setState(updater, options?)`
  - `updater` receives current state and returns the next value.
  - `options.customEvents?: string[]` dispatches additional observer events after the update.
- `getState()` — returns the current state snapshot.
- `subscribe(callback, eventName?)` — subscribes to state changes.
  - `callback` receives the new state value (or `undefined`).
  - `eventName` is optional; defaults to `"setState"`.

---

## Architecture Overview

```
quantumUi.createModule<S, A>(config)
└── Module store (Map<string, A>)
    ├── Client object (A) - created via clientSchema
    │   └── Wraps store instance (core.createStore<S>)
    ├── destroyEntity(id) - removes entity from map
    └── Lifecycle events (onEntityLoad/onEntityDestroy)
```

- **Module store** — tracks every entity as a client object and exposes lifecycle notifications.
- **Client object** — your custom API (type `A`) that wraps the store instance, created via `clientSchema`.
- **Store instance** — available within `clientSchema`, provides `setState`, `getState`, and `subscribe`.
- **Observer layer** — powers subscriptions, custom events, and React bindings.

---

## License

MIT
