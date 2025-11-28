# 🔄 Quantum Toggle

> React-first toggle state management built on top of `@med1802/quantum-ui`.

Quantum Toggle exposes a focused API for building toggleable experiences (modals, drawers, accordions, menus, etc.). It wraps `useSyncExternalStore` so that every toggle instance is concurrent-safe, memoized, and automatically cleaned up when you leave the component tree.

---

## 📘 Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Patterns](#-usage-patterns)
- [API Reference](#-api-reference)
- [Related Packages](#-related-packages)

---

## 🚀 Features

- **React Hooks API** – `useToggle`, `useToggleCommands`, and `useToggleSelector`
- **Automatic lifecycle** – Entities are created/destroyed through hooks
- **Command-first ergonomics** – `onOpen`, `onClose`, `onToggle` available everywhere
- **Type-safe** – Ships with TypeScript typings for every public primitive
- **Concurrent rendering ready** – Uses `useSyncExternalStore` under the hood
- **Composable** – Built on the Quantum UI module system so you can extend it when needed

---

## 📦 Installation

```bash
# pick your favorite client
pnpm add @med1802/quantum-toggle
# or
npm install @med1802/quantum-toggle
# or
yarn add @med1802/quantum-toggle
```

**Peer dependency**

- `react >= 18`

---

## ⚙️ Quick Start

### 1. Instantiate the client once

```ts
// toggleClient.ts
import { createToggleClient } from "@med1802/quantum-toggle";

export const toggleClient = createToggleClient();
```

### 2. Consume hooks inside components

```tsx
import { toggleClient } from "./toggleClient";

const { useToggle, useToggleCommands } = toggleClient;

export const ProfileModal = () => {
  const visibility = useToggle({ id: "profile-modal", initState: "off" });
  const { onClose } = useToggleCommands("profile-modal");

  return (
    <Modal open={visibility === "on"} onCancel={onClose} onOk={onClose}>
      <h1>Profile</h1>
    </Modal>
  );
};

export const ProfileButton = () => {
  const { onOpen } = useToggleCommands("profile-modal");
  return <Button onClick={onOpen}>Open profile</Button>;
};
```

### 3. Optional selectors/subscribers

```tsx
const { useToggleSelector } = toggleClient;

export const DebugPanel = () => {
  const model = useToggleSelector("profile-modal");

  useEffect(() => {
    const unsubscribe = model?.subscribers.onChange((payload) => {
      console.log("Toggle changed", payload);
    });
    return () => unsubscribe?.();
  }, [model]);

  return <pre>{model?.getState()}</pre>;
};
```

---

## 🧱 Usage Patterns

### Modal pattern

```tsx
const { useToggle, useToggleCommands } = toggleClient;

export const ModalExample = () => {
  const visibility = useToggle({ id: "user-modal", initState: "off" });
  const commands = useToggleCommands("user-modal");

  return (
    <>
      <Button onClick={commands.onOpen}>Open modal</Button>
      <Modal open={visibility === "on"} onCancel={commands.onClose}>
        <UserForm />
      </Modal>
    </>
  );
};
```

### Imperative orchestration

```ts
const model = toggleClient.getToggleClient("user-modal");
model.onOpen();

// subscribe outside of React
const unsubscribe = model.subscribe(() => {
  console.log("modal changed", model.getState());
});
```

---

## 📚 API Reference

### `createToggleClient()`

Creates a client with the full hook/api surface. Call it once and re-use the returned object.

```ts
const toggleClient = createToggleClient();
```

### `toggleClient.useToggle({ id, initState })`

Returns `"on"` or `"off"` for the provided entity. Automatically creates the entity on mount and destroys it on unmount.

```ts
const state = toggleClient.useToggle({ id: "drawer", initState: "off" });
```

### `toggleClient.useToggleCommands(id)`

Returns `onOpen`, `onClose`, and `onToggle` closures that always target the same entity.

```ts
const { onOpen, onToggle } = toggleClient.useToggleCommands("drawer");
```

### `toggleClient.useToggleSelector(id)`

Returns the low-level model (or `undefined`). Use it when you need subscribers, metadata, or to read a custom field.

```ts
const model = toggleClient.useToggleSelector("drawer");
model?.getState();
model?.subscribers.onChange(console.log);
```

### `toggleClient.getToggleClient(id)`

Imperative accessor that works outside React (testing, services, listeners).

```ts
const modal = toggleClient.getToggleClient("drawer");
modal.onToggle();
```

---

## 🔗 Related Packages

- [`@med1802/quantum-ui`](../quantum-ui) – Core entity/module engine
- [`@med1802/quantum-ui-react`](../quantum-ui-react) – React bindings for the Quantum UI framework
- [`@med1802/scoped-observer`](../../med1802/scoped-observer) – Event system powering subscriptions

---

## 📝 License

MIT
