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
```

### 2. Build a modal with a single toggle instance

```tsx
import React from "react";
import { createToggleClient, INITIAL_STATE } from "@med1802/quantum-toggle";

const toggleClient = createToggleClient();

const Modal = ({ children }: { children: React.ReactNode }) => {
  const isOpen = toggleClient.useVisibility({
    id: "modal",
    initState: INITIAL_STATE.OFF,
  });

  const { onOpen, onClose, onToggle } =
    toggleClient.useVisibilityCommands("modal");

  if (isOpen === "off") return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>×</button>
        <button onClick={onToggle}>Toggle</button>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const { onOpen } = toggleClient.useVisibilityCommands("modal");

  return (
    <div>
      <button onClick={onOpen}>Open Modal</button>
      <Modal>Modal Content</Modal>
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

### `toggleClient.useVisibility(props)`

React hook that returns the current visibility state for a given ID. Automatically creates the model if it doesn't exist and manages its lifecycle.

**Parameters:**

- `props.id` (string) - Unique identifier for the visibility instance
- `props.initState` (`"on" | "off"`) - Initial state

**Returns:** `"on" | "off"`

```typescript
const visibility = toggleClient.useVisibility({
  id: "my-component",
  initState: INITIAL_STATE.OFF,
});
```

### `toggleClient.useVisibilityCommands(id)`

React hook that returns command functions to control visibility state.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `{ onOpen: () => void; onClose: () => void; onToggle: () => void }`

```typescript
const { onOpen, onClose, onToggle } =
  toggleClient.useVisibilityCommands("my-component");
```

**Commands:**

- `onOpen()` - Sets visibility to "on"
- `onClose()` - Sets visibility to "off"
- `onToggle()` - Toggles between "on" and "off"

### `toggleClient.useModelSelector(id)`

React hook that returns the model instance if it exists, or `undefined` if it doesn't. Useful for accessing the full model API.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient | undefined`

```typescript
const model = toggleClient.useModelSelector("my-component");

if (model) {
  // Access full API
  const currentState = model.getVisibility();
  model.subscribe("onChange", (payload) => {
    console.log("State changed:", payload);
  });
}
```

### `toggleClient.getVisibilityClient(id)`

Non-hook function to get the model instance directly. Use this outside of React components.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient`

```typescript
const model = toggleClient.getVisibilityClient("my-component");
const state = model.getVisibility();
model.commands.onToggle();
```

---

## 💡 Best Practices

1. **Single Client Instance**: Create one `toggleClient` instance and reuse it throughout your app
2. **Unique IDs**: Always use unique IDs for each visibility instance
3. **Initial State**: Set appropriate initial states based on your use case
4. **Lifecycle Management**: The library handles lifecycle automatically, but ensure IDs are consistent
5. **Type Safety**: Use `INITIAL_STATE` enum for better type safety

---

## 🔗 Related Packages

- [`@med1802/quantum-ui`](../quantum-ui) - Core framework used by Quantum Toggle
- [`@med1802/scoped-observer`](../../med1802/scoped-observer) - Event system used internally

---

## 📝 License

MIT
