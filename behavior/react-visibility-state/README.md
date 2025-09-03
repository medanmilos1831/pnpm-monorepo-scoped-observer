# react-visibility-state

**react-visibility-state** is a lightweight React package designed to manage visibility states (open/close) for UI components like modals, tooltips, drawers, and accordions with predictable state transitions — powered by a finite state machine under the hood.

It allows you to control component visibility, manage payload data, and track state changes in a clean, testable, and decoupled way, making it ideal for any UI component that needs to show/hide functionality.

The package is built on a layered architecture:

- **@scoped-observer/core** — a core event bus system
- **@scoped-observer/react-state-machine** — a finite state machine built on top of the core
- **react-visibility-state** — the React behavior layer providing a streamlined API for managing visibility states

This separation of concerns ensures flexibility, extensibility, and ease of maintenance.

Use **react-visibility-state** to simplify your visibility state management logic with a robust, minimal dependency solution that stays consistent across any UI framework or styling approach.

## 📦 Installation

You can install **react-visibility-state** via npm:

```bash
npm install react-visibility-state
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/react-state-machine`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

```bash
npm install react @scoped-observer/react-state-machine
```

## 🎮 Demo

Try out **react-visibility-state** in action with our interactive demo:

**[🚀 Live Demo on StackBlitz](https://stackblitz.com/~/github.com/medanmilos1831/react-visibility-state-demo)**

The demo showcases a complete visibility state management implementation with multiple UI components, real-time state tracking, and payload management.

## 🚀 Quick Start

Here's a basic example showing how to create and manage visibility states for different UI components:

```tsx
import React from "react";
import { createVisibility } from "react-visibility-state";

const { useVisibility, VisibilityHandler } = createVisibility({
  keys: ["userModal", "settingsDrawer"] as const,
});

const UserModal = () => {
  const modal = useVisibility("userModal", {
    initState: "close",
  });

  return (
    <div>
      <button onClick={() => modal.open({ userId: 123 })}>
        Open User Modal
      </button>
      <button onClick={modal.close}>Close Modal</button>
    </div>
  );
};

const SettingsDrawer = () => {
  const drawer = useVisibility("settingsDrawer", {
    initState: "close",
  });

  return (
    <div>
      <button onClick={() => drawer.open({ section: "profile" })}>
        Open Settings
      </button>
      <button onClick={drawer.close}>Close Settings</button>
    </div>
  );
};

const App = () => (
  <>
    <UserModal />
    <SettingsDrawer />

    <VisibilityHandler name="userModal">
      {({ state, payload }) => (
        <div style={{ display: state === "open" ? "block" : "none" }}>
          <h2>User Modal</h2>
          <p>State: {state}</p>
          {payload && <p>User ID: {payload.userId}</p>}
          <p>Modal is open!</p>
        </div>
      )}
    </VisibilityHandler>
  </>
);
```

## 📚 API Reference

### `createVisibility(config)`

Creates a visibility manager with predefined keys for type-safe visibility instances.

**Parameters:**

- `config.keys: readonly string[]` - Array of valid visibility names for type safety

**Returns:**
An object with methods to create and manage visibility instances.

### Methods

#### `useVisibility(name, config)`

Creates a visibility instance for the specified name. Each call creates a new visibility instance if it doesn't exist.

**Parameters:**

- `name: string` - The visibility name (must be one of the defined keys)
- `config: VisibilityConfig` - Configuration object with initial state

**Returns:**

```tsx
{
  open(payload?: any): void;    // Opens the visibility with optional payload
  close(): void;                // Closes the visibility
}
```

#### `VisibilityHandler`

Render prop component that provides visibility state and control functions.

**Props:**

```tsx
{
  name: string; // Visibility name
  children: (props: VisibilityHandlerChildrenProps) => JSX.Element; // Render function
}
```

**Children Props:**

```tsx
{
  name: string; // Visibility name
  state: "open" | "close"; // Current visibility state
  payload: any; // Current payload data
}
```

#### `useWatch(name, callback)`

Hook that watches visibility state and returns computed values.

**Parameters:**

- `name: string` - The visibility name to watch
- `callback: (state: "open" | "close") => C` - Function to compute derived values

**Returns:**
Only the result of the callback function.

#### `getItem(name)`

Gets a visibility instance by name for direct access.

**Parameters:**

- `name: string` - The visibility name to retrieve

**Returns:**
The visibility instance or throws error if not found.

## 🔧 Advanced Usage

### Multiple Visibility Instances

Manage multiple independent visibility states in the same application:

```tsx
const { useVisibility, VisibilityHandler } = createVisibility({
  keys: ["userModal", "settingsDrawer", "helpTooltip"] as const,
});

const App = () => {
  const userModal = useVisibility("userModal", { initState: "close" });
  const settingsDrawer = useVisibility("settingsDrawer", {
    initState: "close",
  });
  const helpTooltip = useVisibility("helpTooltip", { initState: "close" });

  return (
    <>
      <button onClick={() => userModal.open({ userId: 123 })}>
        Open User Modal
      </button>

      <button onClick={() => settingsDrawer.open({ section: "profile" })}>
        Open Settings
      </button>

      <button onClick={() => helpTooltip.open({ topic: "navigation" })}>
        Show Help
      </button>
    </>
  );
};
```

### Payload Management

Pass and manage data with your visibility states:

```tsx
const UserProfile = () => {
  const profileModal = useVisibility("userModal", { initState: "close" });

  const handleEditProfile = (userId: number) => {
    profileModal.open({
      userId,
      action: "edit",
      timestamp: Date.now(),
    });
  };

  return (
    <div>
      <button onClick={() => handleEditProfile(123)}>Edit Profile</button>

      <VisibilityHandler name="userModal">
        {({ state, payload }) => (
          <div style={{ display: state === "open" ? "block" : "none" }}>
            <h2>Edit Profile</h2>
            {payload && (
              <div>
                <p>User ID: {payload.userId}</p>
                <p>Action: {payload.action}</p>
                <p>Time: {new Date(payload.timestamp).toLocaleString()}</p>
              </div>
            )}
            <p>Editing profile...</p>
          </div>
        )}
      </VisibilityHandler>
    </div>
  );
};
```

### State Watching

Use the `useWatch` hook to react to visibility state changes:

```tsx
const VisibilityIndicator = () => {
  const { useWatch } = createVisibility({
    keys: ["userModal", "settingsDrawer"] as const,
  });

  const modalStatus = useWatch("userModal", (state) => ({
    isOpen: state === "open",
  }));

  const drawerStatus = useWatch("settingsDrawer", (state) => ({
    isOpen: state === "open",
  }));

  return (
    <div className="status-indicator">
      <div className={`modal-status ${modalStatus.isOpen ? "open" : "closed"}`}>
        Modal: {modalStatus.isOpen ? "Open" : "Closed"}
      </div>

      <div
        className={`drawer-status ${drawerStatus.isOpen ? "open" : "closed"}`}
      >
        Drawer: {drawerStatus.isOpen ? "Open" : "Closed"}
      </div>
    </div>
  );
};
```

### Direct Instance Access

Access visibility instances from anywhere in your component tree:

```tsx
const NavigationMenu = () => {
  const { getItem } = createVisibility({
    keys: ["userModal", "settingsDrawer"] as const,
  });

  const handleUserClick = () => {
    const userModal = getItem("userModal");
    userModal.open({ action: "view" });
  };

  const handleSettingsClick = () => {
    const settingsDrawer = getItem("settingsDrawer");
    settingsDrawer.open({ section: "general" });
  };

  return (
    <nav>
      <button onClick={handleUserClick}>User Profile</button>
      <button onClick={handleSettingsClick}>Settings</button>
    </nav>
  );
};
```

### Conditional Rendering

Use visibility states for conditional rendering:

```tsx
const Dashboard = () => {
  const { useVisibility, VisibilityHandler } = createVisibility({
    keys: ["sidebar", "notifications"] as const,
  });

  const sidebar = useVisibility("sidebar", { initState: "open" });
  const notifications = useVisibility("notifications", { initState: "close" });

  return (
    <div className="dashboard">
      <VisibilityHandler name="sidebar">
        {({ state }) => (
          <aside className={`sidebar ${state === "open" ? "open" : "closed"}`}>
            <nav>
              <ul>
                <li>Dashboard</li>
                <li>Profile</li>
                <li>Settings</li>
              </ul>
            </nav>
            <p>Sidebar is {state}</p>
          </aside>
        )}
      </VisibilityHandler>

      <main className="main-content">
        <header>
          <button onClick={() => sidebar.open()}>☰ Menu</button>
          <button onClick={() => notifications.open({ type: "all" })}>
            🔔 Notifications
          </button>
        </header>

        <div className="content">
          <h1>Dashboard Content</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </main>

      <VisibilityHandler name="notifications">
        {({ state, payload }) => (
          <div
            className={`notifications-panel ${
              state === "open" ? "open" : "closed"
            }`}
          >
            <div className="notifications-header">
              <h3>Notifications</h3>
              <p>State: {state}</p>
            </div>
            <div className="notifications-content">
              {payload?.type === "all" && (
                <div>Showing all notifications...</div>
              )}
            </div>
          </div>
        )}
      </VisibilityHandler>
    </div>
  );
};
```

## 🎯 Features

- **🚀 Lightweight** - Minimal bundle size with no unnecessary dependencies
- **🔒 Type Safe** - Full TypeScript support with comprehensive type definitions
- **🎮 Flexible** - Support for any number of visibility instances and custom payloads
- **🧪 Testable** - Clean separation of concerns makes testing straightforward
- **♻️ Reusable** - Multiple visibility instances can coexist in the same application
- **⚡ Performant** - Built on efficient state management with minimal re-renders
- **👀 State Watching** - Reactive state watching with computed values
- **🎯 Direct Access** - Direct instance access for external control
- **🔄 State Machine** - Predictable state transitions with finite state machine
- **📦 Payload Support** - Rich data passing with visibility state changes

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/medanmilos1831/scoped-observer/blob/main/CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/medanmilos1831/scoped-observer/blob/main/LICENSE) file for details.

## 🔗 Related Packages

- [@scoped-observer/core](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/core) - Core event bus system
- [@scoped-observer/react-state-machine](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/react-state-machine) - React state machine implementation
- [@scoped-observer/react](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/react) - React integration utilities
