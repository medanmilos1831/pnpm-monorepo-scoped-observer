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

## 📚 Framework API Reference

### `framework.createModule<S>(config)`

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
Module (framework.createModule)
└── Map<string, StoreEntry>
    ├── store (core.createStore)
    └── destroy()
```

- **Module** — wraps a Map of store entries and coordinates lifecycle events.
- **Store entry** — contains a reactive store and a `destroy` helper.
- **Store** — observer-backed primitive with batched state updates and subscriptions.

---

## 💡 Best Practices

1. **ID discipline** — Re-using ids is a no-op, so pick deterministic ids per entity.
2. **Destroy stores** — Always call `destroy()` when an entity leaves the UI to keep module state lean.
3. **Use lifecycle events** — Subscribe to `onModelMount-{id}` / `onModelUnmount-{id}` for orchestration work.
4. **Single source of truth** — Avoid mutating the returned `state` object directly. Always go through `setState`.
5. **Typed stores** — Provide the `S` generic when creating a module so you get inference inside `setState`.

---

## 📝 License

MIT
