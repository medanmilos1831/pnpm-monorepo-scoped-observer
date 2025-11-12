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

**Peer Dependencies:**

- `react` ^18.0.0
- `@med1802/scoped-observer` ^1.0.0
- `@med1802/quantum-ui` ^1.0.1

---

## ⚙️ Quick Start

### 1. Create the Visibility Client

```typescript
import { createVisibilityClient } from "@med1802/quantum-toggle";

const visibilityClient = createVisibilityClient();
```

### 2. Use the Visibility Hook

```tsx
import React from "react";
import { createVisibilityClient, INITIAL_STATE } from "@med1802/quantum-toggle";

const visibilityClient = createVisibilityClient();

const MyComponent = () => {
  // Get the current visibility state
  const visibility = visibilityClient.useVisibility({
    id: "my-modal",
    initState: INITIAL_STATE.OFF,
  });

  // Get commands to control visibility
  const commands = visibilityClient.useVisibilityCommands("my-modal");

  return (
    <div>
      <p>Visibility: {visibility}</p>
      <button onClick={commands.onOpen}>Open</button>
      <button onClick={commands.onClose}>Close</button>
      <button onClick={commands.onToggle}>Toggle</button>
    </div>
  );
};
```

### 3. Complete Example: Modal Component

```tsx
import React from "react";
import { createVisibilityClient, INITIAL_STATE } from "@med1802/quantum-toggle";

const visibilityClient = createVisibilityClient();

const Modal = ({ children }: { children: React.ReactNode }) => {
  const isOpen = visibilityClient.useVisibility({
    id: "modal",
    initState: INITIAL_STATE.OFF,
  });

  const { onOpen, onClose, onToggle } =
    visibilityClient.useVisibilityCommands("modal");

  if (isOpen === "off") return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const { onOpen } = visibilityClient.useVisibilityCommands("modal");

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

### `createVisibilityClient()`

Creates a new visibility client instance. You typically create one instance and reuse it throughout your application.

**Returns:** `VisibilityClient`

```typescript
const visibilityClient = createVisibilityClient();
```

### `visibilityClient.useVisibility(props)`

React hook that returns the current visibility state for a given ID. Automatically creates the model if it doesn't exist and manages its lifecycle.

**Parameters:**

- `props.id` (string) - Unique identifier for the visibility instance
- `props.initState` (`"on" | "off"`) - Initial state

**Returns:** `"on" | "off"`

```typescript
const visibility = visibilityClient.useVisibility({
  id: "my-component",
  initState: INITIAL_STATE.OFF,
});
```

### `visibilityClient.useVisibilityCommands(id)`

React hook that returns command functions to control visibility state.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `{ onOpen: () => void; onClose: () => void; onToggle: () => void }`

```typescript
const { onOpen, onClose, onToggle } =
  visibilityClient.useVisibilityCommands("my-component");
```

**Commands:**

- `onOpen()` - Sets visibility to "on"
- `onClose()` - Sets visibility to "off"
- `onToggle()` - Toggles between "on" and "off"

### `visibilityClient.useModelSelector(id)`

React hook that returns the model instance if it exists, or `undefined` if it doesn't. Useful for accessing the full model API.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient | undefined`

```typescript
const model = visibilityClient.useModelSelector("my-component");

if (model) {
  // Access full API
  const currentState = model.getVisibility();
  model.subscribe("onChange", (payload) => {
    console.log("State changed:", payload);
  });
}
```

### `visibilityClient.getVisibilityClient(id)`

Non-hook function to get the model instance directly. Use this outside of React components.

**Parameters:**

- `id` (string) - Unique identifier for the visibility instance

**Returns:** `IModelApiClient`

```typescript
const model = visibilityClient.getVisibilityClient("my-component");
const state = model.getVisibility();
model.commands.onToggle();
```

---

## 🎯 Use Cases

### Modals and Dialogs

```tsx
const Modal = () => {
  const isOpen = visibilityClient.useVisibility({
    id: "modal",
    initState: INITIAL_STATE.OFF,
  });
  const { onClose } = visibilityClient.useVisibilityCommands("modal");

  if (isOpen === "off") return null;

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {/* Modal content */}
    </div>
  );
};
```

### Accordions

```tsx
const AccordionItem = ({ id, title, content }) => {
  const isOpen = visibilityClient.useVisibility({
    id,
    initState: INITIAL_STATE.OFF,
  });
  const { onToggle } = visibilityClient.useVisibilityCommands(id);

  return (
    <div>
      <button onClick={onToggle}>{title}</button>
      {isOpen === "on" && <div>{content}</div>}
    </div>
  );
};
```

### Tooltips

```tsx
const Tooltip = ({ id, children, content }) => {
  const isVisible = visibilityClient.useVisibility({
    id,
    initState: INITIAL_STATE.OFF,
  });
  const { onOpen, onClose } = visibilityClient.useVisibilityCommands(id);

  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
      {children}
      {isVisible === "on" && <div className="tooltip">{content}</div>}
    </div>
  );
};
```

---

## 🔧 Advanced Usage

### Accessing Full Model API

```typescript
const model = visibilityClient.getVisibilityClient("my-component");

// Get current state
const state = model.getVisibility();

// Subscribe to changes
const unsubscribe = model.subscribe("onChange", (payload) => {
  console.log("Visibility changed:", payload);
});

// Use commands
model.commands.onOpen();
model.commands.onClose();
model.commands.onToggle();

// Use onChangeSync for React integration
const unsubscribeSync = model.onChangeSync.subscribe(() => {
  // React to changes
});
const currentState = model.onChangeSync.snapshot();
```

### Multiple Instances

```tsx
const App = () => {
  // Each instance has its own independent state
  const modal1 = visibilityClient.useVisibility({
    id: "modal-1",
    initState: INITIAL_STATE.OFF,
  });
  const modal2 = visibilityClient.useVisibility({
    id: "modal-2",
    initState: INITIAL_STATE.OFF,
  });

  const commands1 = visibilityClient.useVisibilityCommands("modal-1");
  const commands2 = visibilityClient.useVisibilityCommands("modal-2");

  return (
    <div>
      <button onClick={commands1.onToggle}>Toggle Modal 1</button>
      <button onClick={commands2.onToggle}>Toggle Modal 2</button>
      {modal1 === "on" && <div>Modal 1 Content</div>}
      {modal2 === "on" && <div>Modal 2 Content</div>}
    </div>
  );
};
```

---

## 💡 Best Practices

1. **Single Client Instance**: Create one `visibilityClient` instance and reuse it throughout your app
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
