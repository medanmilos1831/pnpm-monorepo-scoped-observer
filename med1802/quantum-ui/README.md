# Quantum UI — Store-First Modules

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
import { quantumUi } from "@med1802/quantum-ui";

type CounterState = number;

const counterModule = quantumUi.createModule<CounterState>({
  name: "counter",
  store: ({ id, state }) => ({
    id,
    state,
  }),
});

// Subscribe to lifecycle signals
const unsubscribeLoad = counterModule.onEntityLoad("counter", (payload) => {
  console.log("ENTITY LOAD", payload);
});
const unsubscribeDestroy = counterModule.onEntityDestroy(
  "counter",
  (payload) => {
    console.log("ENTITY DESTROY", payload);
  }
);

// Create and consume an entity
counterModule.createEntity({ id: "counter", state: 0 });
const entry = counterModule.getEntityById("counter");
entry?.store.subscribe(({ prevState, newState }) => {
  console.log("SET STATE", prevState, newState);
});

entry?.store.setState((value) => value + 1);
entry?.store.setState((value) => value + 1, {
  customEvents: ["counter:incremented"],
});

// Destroy when you are done
entry?.destroy();
unsubscribeLoad?.();
unsubscribeDestroy?.();
```

---

## Module API

```ts
const module = quantumUi.createModule<S>(config);
```

### Config

- `name` — descriptive identifier (debugging aid).
- `store({ id, state })` — factory returning `{ id, state }` (can include computed fields).

### Returned helpers

- `createEntity({ id, state })` — registers a new entity; duplicate `id` calls are ignored.
- `getEntityById(id)` — returns `{ store, destroy }` or `undefined`.
- `onEntityLoad(id, callback)` — subscribes to load events for a specific entity id.
- `onEntityDestroy(id, callback)` — subscribes to destroy events for a specific entity id.

---

## Entity Store API (`core.createStore`)

Each entity entry exposes the raw store instance:

- `setState(updater, options?)`
  - `updater` receives current state and returns the next value.
  - `options.customEvents?: string[]` dispatches additional observer events after the update.
- `subscribe(listener)` — listens to `setState` payloads (`{ prevState, newState }`).
- `state` — the current snapshot.
- `destroy()` — convenience wrapper added by the framework to remove the entity from the module map.

---

## Architecture Overview

```
quantumUi.createModule(config)
└── Module store (Map<string, EntityEntry>)
    ├── EntityEntry.store (core.createStore)
    ├── EntityEntry.destroy()
    └── Lifecycle events (onEntityLoad/onEntityDestroy)
```

- **Module store** — tracks every entity and exposes lifecycle notifications.
- **Entity entry** — pairs the user store with a destroy routine bound to its id.
- **Observer layer** — powers subscriptions, custom events, and React bindings.

---

## License

MIT
