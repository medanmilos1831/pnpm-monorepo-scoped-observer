# 🔄 Quantum Toggle

A modern React hook-based library for managing toggle/visibility state in your applications. Built on top of `@med1802/quantum-ui`, Quantum Toggle provides a clean and type-safe API for controlling on/off states with automatic lifecycle management and React's `useSyncExternalStore` for optimal performance.

Perfect for managing modals, drawers, tooltips, accordions, and any component that needs toggle functionality.

---

## 🚀 Features

- ✅ **React Hooks API** — Simple, intuitive hooks for managing toggle state
- ✅ **Automatic Lifecycle** — Models are automatically created and cleaned up
- ✅ **Type-Safe** — Full TypeScript support with exported types
- ✅ **Performance Optimized** — Uses React's `useSyncExternalStore` for efficient updates
- ✅ **Command Pattern** — Clean API with `onOpen`, `onClose`, and `onToggle` commands
- ✅ **Built on Quantum UI** — Leverages the powerful quantum-ui framework

---

## 📦 Installation

```bash
npm install @med1802/quantum-toggle
```

**Peer Dependencies**

- `react` ^18.0.0

---

## ⚙️ Quick Start

### 1. Create the toggle client

```typescript
import { createToggleClient } from "@med1802/quantum-toggle";

export const toggleClient = createToggleClient();
const { useToggle, useToggleCommands, useToggleSelector, getToggleClient } =
  toggleClient;
```

### 2. Build a single modal experience

```tsx
import { Button, Modal } from "antd";
import { useEffect } from "react";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle, useToggleCommands, useToggleSelector } =
  createToggleClient();

const UserModal = ({ model }: { model: ToggleProps }) => {
  const visibility = useToggle(model);
  const { onClose } = useToggleCommands(model.id);

  return (
    <Modal open={visibility === "on"} onCancel={onClose} onOk={onClose}>
      <h1>User Modal</h1>
    </Modal>
  );
};

const SomeHeader = () => {
  const visibility = useToggleSelector("user-modal");

  useEffect(() => {
    const unsubscribe = visibility?.subscribers.onChange((payload) => {
      console.log("subscribe", visibility?.getVisibility(), payload);
    });
    return () => unsubscribe?.();
  }, [visibility]);

  return (
    <div>
      <h2>Header</h2>
      <Button onClick={() => visibility?.commands.onOpen()}>
        Open form header
      </Button>
    </div>
  );
};

const SomeFooter = () => {
  const visibilityCommands = useToggleCommands("user-modal");
  return (
    <div>
      <h2>Footer</h2>
      <Button onClick={() => visibilityCommands.onOpen()}>Open</Button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <SomeHeader />
      <UserModal
        model={{
          id: "user-modal",
          initState: "off",
        }}
      />
      <SomeFooter />
    </div>
  );
};
```

---

## 📚 API Reference

### `createToggleClient()`

Creates a new toggle client instance. You typically create one instance and reuse it throughout your application.

**Returns:** `ToggleClient`

```typescript
const toggleClient = createToggleClient();
```

### `toggleClient.useToggle(props)`

React hook that returns the current visibility state for a given ID. Automatically creates the model if it doesn't exist and manages its lifecycle.

**Parameters:**

- `props.id` (string) - Unique identifier for the visibility instance
- `props.initState` (`"on" | "off"`) - Initial state

**Returns:** `"on" | "off"`

```typescript
const visibility = toggleClient.useToggle({
  id: "my-component",
  initState: "off",
});
```

### `toggleClient.useToggleCommands(id)`

React hook that returns command functions to control visibility state.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `{ onOpen: () => void; onClose: () => void; onToggle: () => void }`

```typescript
const { onOpen, onClose, onToggle } =
  toggleClient.useToggleCommands("my-component");
```

**Commands:**

- `onOpen()` - Sets visibility to "on"
- `onClose()` - Sets visibility to "off"
- `onToggle()` - Toggles between "on" and "off"

### `toggleClient.useToggleSelector(id)`

React hook that returns the model instance if it exists, or `undefined` if it doesn't. Useful for accessing the full model API.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient | undefined`

```typescript
const model = toggleClient.useToggleSelector("my-component");

if (model) {
  // Access full API
  const currentState = model.getVisibility();
  const unsubscribe = model.subscribers.onChange((payload) => {
    console.log("State changed:", payload);
  });
  // ...later, when you want to stop listening:
  unsubscribe();
}
```

### `toggleClient.getToggleClient(id)`

Non-hook function to get the model instance directly. Use this outside of React components.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient`

```typescript
const model = toggleClient.getToggleClient("my-component");
const state = model.getVisibility();
model.commands.onToggle();
```

## 🔗 Related Packages

- [`@med1802/quantum-ui`](../quantum-ui) - Core framework used by Quantum Toggle
- [`@med1802/scoped-observer`](../../med1802/scoped-observer) - Event system used internally

---

## 📝 License

MIT
