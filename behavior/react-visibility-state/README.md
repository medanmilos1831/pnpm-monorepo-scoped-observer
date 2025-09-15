# react-visibility-state

**react-visibility-state** is a powerful React package for managing visibility states (ON/OFF) for UI components like modals, tooltips, drawers, and accordions. It provides predictable state management with automatic cleanup and memory optimization.

The package offers a clean API for controlling component visibility, managing payload data, and tracking state changes in a testable and decoupled way.

## 📦 Installation

You can install **react-visibility-state** via npm:

```bash
npm install react-visibility-state
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/core`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

```bash
npm install react @scoped-observer/core
```

## 🚀 Quick Start

Here's a basic example showing how to set up and use the visibility engine system:

```tsx
import React from "react";
import { createBrowserVisibility } from "react-visibility-state";
import {
  VisibilityProvider,
  useVisibility,
  useVisibilityHandler,
} from "react-visibility-state";

// Create the browser visibility implementation
const browserVisibility = createBrowserVisibility();

const App = () => {
  return (
    <VisibilityProvider value={browserVisibility}>
      <MyComponent />
    </VisibilityProvider>
  );
};

const MyComponent = () => {
  // Get visibility state and payload
  const { state, payload } = useVisibility("my-modal", "off");

  // Get control functions
  const { on, off } = useVisibilityHandler();

  const handleOpen = () => {
    on("my-modal", { userId: 123, action: "edit" });
  };

  const handleClose = () => {
    off("my-modal");
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <button onClick={handleClose}>Close Modal</button>

      <div style={{ display: state === "on" ? "block" : "none" }}>
        <h2>Modal is {state}</h2>
        {payload && <p>User ID: {payload.userId}</p>}
      </div>
    </div>
  );
};
```

## 🎮 Render Prop Pattern

Use the render prop pattern for cleaner component composition:

```tsx
import { VisibilityProvider } from "react-visibility-state";

const ModalExample = () => {
  const { on, off } = useVisibilityHandler();

  return (
    <div>
      <button onClick={() => on("modal", { title: "Settings" })}>
        Open Modal
      </button>

      <VisibilityProvider.Item name="modal" initState="off">
        {({ state, payload }) => (
          <div style={{ display: state === "on" ? "block" : "none" }}>
            <h2>{payload?.title || "Modal"}</h2>
            <p>State: {state}</p>
            <button onClick={() => off("modal")}>Close</button>
          </div>
        )}
      </VisibilityProvider.Item>
    </div>
  );
};
```

## 📚 API Reference

### `createBrowserVisibility()`

Creates a browser visibility implementation with instance management capabilities.

**Returns:**
An object with methods to manage visibility instances:

```typescript
{
  ensureEngine(name: string, initState: "on" | "off"): EngineInterface;
  start(name: string, payload?: any): void;
  stop(name: string, payload?: any): void;
  getEngine(name: string): Engine;
}
```

### `VisibilityProvider`

React context provider that makes visibility functionality available to child components.

**Props:**

```typescript
{
  children: React.ReactNode;
  value: ReturnType<typeof createBrowserVisibility>;
}
```

### `VisibilityProvider.Item`

Render prop component for accessing visibility state and payload.

**Props:**

```typescript
{
  name: string;
  initState?: "on" | "off";
  children: (props: { state: "on" | "off"; payload: any }) => React.ReactNode;
}
```

### `useVisibility(name, initState)`

Hook for accessing visibility state and payload.

**Parameters:**

- `name: string` - Instance identifier
- `initState: "on" | "off"` - Initial state

**Returns:**

```typescript
{
  state: "on" | "off";
  payload: any;
}
```

### `useVisibilityHandler()`

Hook for controlling visibility instance state.

**Returns:**

```typescript
{
  on: (name: string, payload?: any) => void;
  off: (name: string) => void;
}
```

## 🔧 Advanced Usage

### Multiple Instance Management

Manage multiple independent visibility instances:

```tsx
const MultiInstanceExample = () => {
  const { on, off } = useVisibilityHandler();

  // Multiple instances with different states
  const modal = useVisibility("modal", "off");
  const drawer = useVisibility("drawer", "off");
  const tooltip = useVisibility("tooltip", "off");

  return (
    <div>
      <button onClick={() => on("modal", { type: "user" })}>Open Modal</button>
      <button onClick={() => on("drawer", { section: "settings" })}>
        Open Drawer
      </button>
      <button onClick={() => on("tooltip", { message: "Help text" })}>
        Show Tooltip
      </button>

      {/* Modal */}
      <VisibilityProvider.Item name="modal">
        {({ state, payload }) => (
          <div style={{ display: state === "on" ? "block" : "none" }}>
            <h2>Modal: {payload?.type}</h2>
            <button onClick={() => off("modal")}>Close</button>
          </div>
        )}
      </VisibilityProvider.Item>

      {/* Drawer */}
      <VisibilityProvider.Item name="drawer">
        {({ state, payload }) => (
          <div className={`drawer ${state === "on" ? "open" : "closed"}`}>
            <h3>Drawer: {payload?.section}</h3>
            <button onClick={() => off("drawer")}>Close</button>
          </div>
        )}
      </VisibilityProvider.Item>
    </div>
  );
};
```

### Payload Management

Pass and manage rich data with visibility states:

```tsx
const PayloadExample = () => {
  const { on, off } = useVisibilityHandler();

  const handleUserAction = (action: string, userId: number) => {
    on("userModal", {
      action,
      userId,
      timestamp: Date.now(),
      metadata: { source: "dashboard" },
    });
  };

  return (
    <div>
      <button onClick={() => handleUserAction("edit", 123)}>Edit User</button>
      <button onClick={() => handleUserAction("view", 456)}>View User</button>

      <VisibilityProvider.Item name="userModal">
        {({ state, payload }) => (
          <div style={{ display: state === "on" ? "block" : "none" }}>
            <h2>User Action: {payload?.action}</h2>
            <p>User ID: {payload?.userId}</p>
            <p>Time: {new Date(payload?.timestamp).toLocaleString()}</p>
            <p>Source: {payload?.metadata?.source}</p>
            <button onClick={() => off("userModal")}>Close</button>
          </div>
        )}
      </VisibilityProvider.Item>
    </div>
  );
};
```

### Direct Instance Access

Access visibility instances directly for advanced control:

```tsx
const AdvancedExample = () => {
  const browserVisibility = createBrowserVisibility();

  const handleAdvancedControl = () => {
    // Get direct access to instance
    const instance = browserVisibility.getEngine("myInstance");

    // Direct manipulation
    instance.dispatch({
      value: "on",
      data: { custom: "advanced control" },
    });
  };

  return <button onClick={handleAdvancedControl}>Advanced Control</button>;
};
```

const ConditionalRenderingExample = () => {
const { on, off } = useVisibilityHandler();
const sidebar = useVisibility("sidebar", "on");
const notifications = useVisibility("notifications", "off");

return (
<div className="app">
<header>
<button onClick={() => on("sidebar")}>Toggle Sidebar</button>
<button onClick={() => on("notifications", { count: 5 })}>
Notifications ({notifications.payload?.count || 0})
</button>
</header>

      <div className="main-layout">
        <VisibilityProvider.Item name="sidebar">
          {({ state }) => (
            <aside className={`sidebar ${state === "on" ? "open" : "closed"}`}>
              <nav>
                <ul>
                  <li>Dashboard</li>
                  <li>Profile</li>
                  <li>Settings</li>
                </ul>
              </nav>
            </aside>
          )}
        </VisibilityProvider.Item>

        <main className="content">
          <h1>Main Content</h1>
          <p>Welcome to your application!</p>
        </main>

        <VisibilityProvider.Item name="notifications">
          {({ state, payload }) => (
            <div
              className={`notifications ${
                state === "on" ? "visible" : "hidden"
              }`}
            >
              <h3>Notifications</h3>
              <p>You have {payload?.count || 0} new notifications</p>
              <button onClick={() => off("notifications")}>Dismiss</button>
            </div>
          )}
        </VisibilityProvider.Item>
      </div>
    </div>

);
};

```

## 🎯 Features

- **🚀 Lightweight** - Minimal bundle size with optimized performance
- **🔒 Type Safe** - Full TypeScript support with comprehensive type definitions
- **🎮 Flexible** - Support for unlimited visibility instances and custom payloads
- **🧪 Testable** - Clean separation of concerns makes testing straightforward
- **♻️ Reusable** - Multiple visibility instances can coexist independently
- **⚡ Performant** - Built on efficient state management with minimal re-renders
- **👀 State Watching** - Reactive state management with real-time updates
- **📦 Rich Payloads** - Comprehensive data passing with state changes
- **🔄 Lifecycle Management** - Automatic cleanup and memory optimization

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/medanmilos1831/scoped-observer/blob/main/CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/medanmilos1831/scoped-observer/blob/main/LICENSE) file for details.

## 🔗 Related Packages

- [@scoped-observer/core](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/core) - Core event bus system
```
