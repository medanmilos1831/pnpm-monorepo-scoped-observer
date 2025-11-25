# 🔄 Quantum UI (Store-first Edition)

Quantum UI now focuses on lightweight, reactive stores. Each module owns a map of stores (keyed by `id`) that can dispatch lifecycle events, broadcast `setState` updates, and expose granular subscriptions both per-store and per-module.

---

## 🚀 Features

- ✅ **Module-managed stores** — Create isolated store instances with a single call
- ✅ **Reactive state** — Built-in store primitive with `setState`, `subscribe`, and custom lifecycle events
- ✅ **Lifecycle signals** — Automatic `onModelMount-{id}` / `onModelUnmount-{id}` events for orchestration
- ✅ **Scoped observers** — Every store and module emits updates through the Observer core
- ✅ **Message broker ready** — Core still ships observer + broker utilities for more advanced setups
- ✅ **Fully typed API** — Simple generics keep state definitions ergonomic

---

## 📦 Installation

```bash
npm install @med1802/quantum-ui
```

---

## ⚙️ Quick Start

```typescript
import { quantumUi } from "@med1802/quantum-ui";

const counterModule = quantumUi.createModule<number>({
  name: "counter",
  store: (props) => {
    return {
      id: props.id,
      state: props.state,
    };
  },
});
// Fire when a specific store id mounts
counterModule.subscribe((payload) => {
  console.log("TRIGGERED ON CREATE COUNTER STORE", payload);
}, "onStoreCreate-counter");

// Fire when the same store id is destroyed
counterModule.subscribe((payload) => {
  console.log("TRIGGERED ON DESTROY COUNTER STORE", payload);
}, "onStoreDestroy-counter");

// Listen to every setState emission (no custom event name needed)
counterModule.subscribe((payload) => {
  console.log("LISTENER FOR ALL SET STATE EVENTS", payload);
});

counterModule.createStore({
  id: "counter",
  state: 0,
});
const counterStore = counterModule.getStoreById("counter")!;
counterStore.destroy();
```

### Custom store events

```typescript
const counterModule = quantumUi.createModule<number>({
  name: "counter",
  store: (props) => ({
    id: props.id,
    state: props.state,
  }),
});
counterModule.createStore({
  id: "counter",
  state: 0,
});
const counterStore = counterModule.getStoreById("counter")!;

// Subscribes to every mutation via default `setState` event
counterStore.store.subscribe((payload) => {
  console.log("PAYLOAD", payload);
});

// Subscribes only when a custom event name is dispatched
counterStore.store.subscribe((payload) => {
  console.log("PAYLOAD CUSTOM EVENT", payload);
}, "triggerOnlyOnCustomEvent");

counterStore.store.setState((state) => state + 1);
counterStore.store.setState((state) => state + 1, {
  customEvents: ["triggerOnlyOnCustomEvent"],
});
```

---

## 📚 Quantum UI API Reference

### `quantumUi.createModule<S>(config)`

Creates a module that can manage multiple store instances sharing the same state shape.

**Config:**

- `name` — unique module name (used for debugging only right now)
- `store` — factory that receives `{ id, state }` and returns the initial `IStore<S>`

**Returns an object with:**

- `createStore({ id, state })` — registers a new store instance. No-op if the `id` already exists.
- `getStoreById(id)` — returns `{ store, destroy }` or `undefined`. Call `destroy()` to remove the store (and to emit `onModelUnmount-{id}`).
- `subscribe(callback, eventName?)` — listen to module-level events. Without `eventName` you receive payloads for every module `setState`. Pass custom event names (like `onModelMount-${id}`) to listen to lifecycle hooks.

### Store API (`core.createStore`)

Every module store entry exposes the native store primitive:

- `setState(updater, options?)` — updates the state. Optional `options.customEvents` (array) dispatch additional events after the update.
- `subscribe(callback, eventName?)` — listen to store updates. Defaults to `setState` events.
- `state` — the current immutable snapshot.

---

## 🏗️ Architecture

```
Module (quantumUi.createModule)
└── Map<string, StoreEntry>
    ├── store (core.createStore)
    └── destroy()
```

- **Module** — wraps a Map of store entries and coordinates lifecycle events.
- **Store entry** — contains a reactive store and a `destroy` helper.
- **Store** — observer-backed primitive with batched state updates and subscriptions.

---

## 📝 License

MIT
