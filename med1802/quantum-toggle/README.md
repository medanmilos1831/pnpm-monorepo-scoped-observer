# 🔄 Quantum Toggle

A lightweight React library for managing toggle/visibility state in your applications. Built on top of `@med1802/quantum-ui-react`, Quantum Toggle provides a simple, type-safe API for controlling on/off states with automatic lifecycle management.

Perfect for managing modals, drawers, tooltips, accordions, dropdowns, and any component that needs toggle functionality. Each toggle instance is automatically created when you use it in a component and cleaned up when the component unmounts.

---

## 📦 Installation

```bash
npm install @med1802/quantum-toggle
```

---

## ⚡ Quick Start

```ts
// toggleClient.ts
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle, getToggleInstance } = createToggleClient();

export { useToggle, getToggleInstance };
```

---

## 📖 Examples

### Basic Usage with Modal

```tsx
import { Modal } from "antd";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle } = createToggleClient();

const ModalComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <Modal open={value === "on"} onCancel={onClose}>
      <div>Modal Content</div>
    </Modal>
  );
};
```

### Basic Usage with Drawer

```tsx
import { Drawer } from "antd";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle } = createToggleClient();

const DrawerComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <Drawer open={value === "on"} onClose={onClose}>
      <div>Drawer Content</div>
    </Drawer>
  );
};
```

### Controlling Toggles from Outside Components

```tsx
import { createToggleClient } from "@med1802/quantum-toggle";

const { getToggleInstance } = createToggleClient();

const SomeComponent = () => {
  const userModalInstance = getToggleInstance("userModal");
  const userDrawerInstance = getToggleInstance("userDrawer");

  return (
    <>
      <div>
        <button onClick={() => userModalInstance?.onOpen()}>Open Modal</button>
        <button onClick={() => userModalInstance?.onClose()}>
          Close Modal
        </button>
        <button onClick={() => userModalInstance?.onToggle()}>
          Toggle Modal
        </button>
      </div>
      <br />
      <div>
        <button onClick={() => userDrawerInstance?.onOpen()}>
          Open Drawer
        </button>
        <button onClick={() => userDrawerInstance?.onClose()}>
          Close Drawer
        </button>
        <button onClick={() => userDrawerInstance?.onToggle()}>
          Toggle Drawer
        </button>
      </div>
    </>
  );
};
```

### Watching Toggle Changes

```tsx
import { useEffect } from "react";
import { createToggleClient } from "@med1802/quantum-toggle";

const { useToggle, getToggleInstance } = createToggleClient();

const SomeComponentWatcher = () => {
  const [value] = useToggle({ id: "userModal" });
  const drawerReference = getToggleInstance("userDrawer");

  useEffect(() => {
    const unsubscribe = drawerReference?.onChange((payload) => {
      console.log("Drawer value changed", payload, drawerReference?.getState());
    });
    return () => unsubscribe?.();
  }, []);

  return <div>Modal state: {value}</div>;
};
```

### Complete Example

```tsx
import { useEffect } from "react";
import { createToggleClient } from "@med1802/quantum-toggle";
import { Drawer, Modal } from "antd";

const { useToggle, getToggleInstance } = createToggleClient();

const ModalComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <Modal open={value === "on"} onCancel={onClose}>
      <div>Modal Content</div>
    </Modal>
  );
};

const DrawerComponent = ({
  id,
  initState,
}: {
  id: string;
  initState: "on" | "off";
}) => {
  const [value, { onClose }] = useToggle({ id, initState });
  return (
    <Drawer open={value === "on"} onClose={onClose}>
      <div>Drawer Content</div>
    </Drawer>
  );
};

const ControlPanel = () => {
  const userModalInstance = getToggleInstance("userModal");
  const userDrawerInstance = getToggleInstance("userDrawer");

  return (
    <>
      <div>
        <button onClick={() => userModalInstance?.onOpen()}>Open Modal</button>
        <button onClick={() => userModalInstance?.onClose()}>
          Close Modal
        </button>
        <button onClick={() => userModalInstance?.onToggle()}>
          Toggle Modal
        </button>
      </div>
      <br />
      <div>
        <button onClick={() => userDrawerInstance?.onOpen()}>
          Open Drawer
        </button>
        <button onClick={() => userDrawerInstance?.onClose()}>
          Close Drawer
        </button>
        <button onClick={() => userDrawerInstance?.onToggle()}>
          Toggle Drawer
        </button>
      </div>
    </>
  );
};

const WatcherComponent = () => {
  const [value] = useToggle({ id: "userModal" });
  const drawerReference = getToggleInstance("userDrawer");

  useEffect(() => {
    const unsubscribe = drawerReference?.onChange((payload) => {
      console.log("Drawer value changed", payload, drawerReference?.getState());
    });
    return () => unsubscribe?.();
  }, []);

  return <div>Modal state: {value}</div>;
};

const App = () => {
  return (
    <>
      <ModalComponent id="userModal" initState="off" />
      <ModalComponent id="authModal" initState="off" />
      <DrawerComponent id="userDrawer" initState="off" />
      <DrawerComponent id="authDrawer" initState="off" />
      <ControlPanel />
      <WatcherComponent />
    </>
  );
};
```

---

## 🔧 API Reference

### `createToggleClient()`

Creates a toggle client instance with hooks and utilities.

**Returns:**

- `useToggle` - React hook for using toggle state in components
- `getToggleInstance` - Function to get toggle instance by ID

### `useToggle({ id, initState? })`

React hook that returns the current toggle state and control methods.

**Parameters:**

- `id` (string) - Unique identifier for the toggle instance
- `initState?` ("on" | "off") - Initial state (optional, defaults to "off")

**Returns:**

```tsx
[
  value: "on" | "off",
  {
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
  }
]
```

**Example:**

```tsx
const [value, { onOpen, onClose, onToggle }] = useToggle({
  id: "myModal",
  initState: "off",
});
```

### `getToggleInstance(id)`

Retrieves a toggle instance by ID. Useful for controlling toggles from outside components.

**Parameters:**

- `id` (string) - Unique identifier for the toggle instance

**Returns:**

```tsx
{
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  getState: () => "on" | "off";
  onChange: (callback: (payload: "on" | "off") => void) => () => void;
} | undefined
```

**Example:**

```tsx
const modalInstance = getToggleInstance("myModal");
modalInstance?.onOpen(); // Open the modal
modalInstance?.onChange((state) => {
  console.log("State changed:", state);
});
```

---

## ✨ Features

- ✅ **Automatic lifecycle management** - Toggles are created on mount and cleaned up on unmount
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Global access** - Control toggles from anywhere using `getToggleInstance`
- ✅ **Reactive** - Built on `useSyncExternalStore` for concurrent-safe updates
- ✅ **Event subscriptions** - Listen to state changes with `onChange`
- ✅ **Zero configuration** - Works out of the box

---

## 📝 Notes

- Each toggle instance is identified by a unique `id`
- If `initState` is not provided and the toggle doesn't exist, an error will be thrown
- Toggle instances are automatically cleaned up when components unmount
- You can control the same toggle from multiple components using the same `id`
