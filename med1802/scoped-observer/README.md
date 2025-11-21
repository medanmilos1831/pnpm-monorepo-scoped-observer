# 🔄 Scoped Observer

A lightweight, type-safe, and **zero-dependency** event system for frontend applications. Built on native `EventTarget` API with support for **hierarchical scopes**, **last event replay**.

---

## 🚀 Features

- ✅ **Hierarchical scopes** — Define scopes once, navigate through them
- ✅ **Last event replay** — Late subscribers automatically receive the last dispatched payload
- ✅ **Zero dependencies** — Built on native JavaScript APIs
- ✅ **TypeScript native** — Full type safety out of the box
- ✅ **Immutable structure** — Scopes are defined once and cannot be modified at runtime
- ✅ **Simple API** — Just `dispatch` and `subscribe`, nothing more

---

## 📦 Installation

```bash
npm i @med1802/scoped-observer
```

---

## ⚙️ Quick Start

Define your scope hierarchy once at initialization:

```typescript
import { createScopedObserver } from "@med1802/scoped-observer";

const observer = createScopedObserver([
  {
    scope: "app",
    subScopes: [
      {
        scope: "dashboard",
        subScopes: [{ scope: "widgets" }, { scope: "settings" }],
      },
      {
        scope: "profile",
      },
    ],
  },
]);
```

---

## 📤 Dispatching Events

```typescript
// Dispatch to a specific scope
observer.dispatch({
  scope: "app:dashboard:widgets",
  eventName: "widgetUpdated",
  payload: { id: 1, name: "Chart" },
});

// Dispatch to root scope (scope is optional)
observer.dispatch({
  eventName: "appInitialized",
  payload: { version: "1.0.0" },
});
```

---

## 📥 Subscribing to Events

```typescript
// Subscribe to a scoped event
const unsubscribe = observer.subscribe({
  scope: "app:dashboard:widgets",
  eventName: "widgetUpdated",
  callback: ({ payload, eventName, scope }) => {
    console.log("Widget updated:", payload);
    console.log("Event:", eventName);
    console.log("Scope:", scope);
  },
});

// Unsubscribe when done
unsubscribe();
```

---

## 🎯 Last Event Replay

If you subscribe **after** an event has been dispatched, the callback will be invoked immediately with the last payload:

```typescript
// 1. Dispatch first
observer.dispatch({
  scope: "app:profile",
  eventName: "userLoaded",
  payload: { id: 1, name: "John" },
});

// 2. Subscribe later
observer.subscribe({
  scope: "app:profile",
  eventName: "userLoaded",
  callback: ({ payload }) => {
    // This will fire immediately with { id: 1, name: 'John' }
    console.log("User:", payload);
  },
});
```

This is perfect for state synchronization where components mount after data has loaded.

---

## 🧭 Scope Navigation

Scopes are separated by `:` and form a hierarchical structure:

- `app` → root level scope
- `app:dashboard` → nested scope
- `app:dashboard:widgets` → deeply nested scope

If `scope` is omitted or empty, the **root scope** is used.

---

## 📚 API Reference

### `createScopedObserver(scopes?)`

Creates a new scoped observer instance.

**Parameters:**

- `scopes` (optional): Array of `ScopeNode` objects defining the hierarchy

**Returns:** Observer instance with `dispatch` and `subscribe` methods

---

### `observer.dispatch(options)`

Dispatches an event to a specific scope.

**Options:**

- `scope?` (string): Target scope path (e.g., `"app:dashboard"`)
- `eventName` (string): Name of the event
- `payload?` (any): Data to send with the event

---

### `observer.subscribe(options)`

Subscribes to events on a specific scope.

**Options:**

- `scope?` (string): Target scope path
- `eventName` (string): Name of the event to listen for
- `callback` (function): Handler receiving `{ payload, eventName, scope }`

**Returns:** Unsubscribe function

---

## 🏗️ Architecture

- **EventScope** — Each scope is an `EventTarget` instance
- **Recursive hierarchy** — Scopes are built as a tree structure at initialization
- **lastEventPayloads** — Each scope maintains a map of the last payload per event
- **Immutable** — Once created, the scope structure cannot be modified

---

## 📄 License

MIT
