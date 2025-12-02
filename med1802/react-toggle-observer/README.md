# 🔄 React Toggle Observer

A lightweight React library for managing toggle/visibility state with observer pattern and interceptors. Built on top of `@med1802/scoped-observer` and `@med1802/scoped-observer-message-broker`, React Toggle Observer provides a simple, type-safe API for controlling on/off states with automatic lifecycle management and event interception.

Perfect for managing modals, drawers, tooltips, accordions, dropdowns, and any component that needs toggle functionality with logging and interception capabilities.

---

## 📦 Installation

```bash
npm install @med1802/react-toggle-observer
```

---

## ⚡ Quick Start

```tsx
import { createReactToggleObserver } from "@med1802/react-toggle-observer";
import { Button, Modal } from "antd";

// Create toggle observers with logger configuration
const toggleObservers = createReactToggleObserver({
  userModal: {
    logger: (params) => {
      console.log("MODAL LOGGER", params);
    },
  },
  authModal: {
    logger: (params) => {
      console.log("AUTH MODAL LOGGER", params);
    },
  },
});

// Destructure the observers
const { userModal, authModal } = toggleObservers;
const { useToggle: useUserModal, useInterceptor: useUserModalInterceptor } =
  userModal;

// Use in components
const UserModalComponent = () => {
  const [value, close, message] = useUserModal(false);
  return (
    <Modal open={value} onCancel={() => close()} onOk={() => close()}>
      <h1>User Modal</h1>
      {message && <p>{message}</p>}
    </Modal>
  );
};

const SomeComponent = () => {
  return <Button onClick={() => userModal.open()}>Open Modal</Button>;
};

const HomePage = () => {
  return (
    <>
      <UserModalComponent />
      <SomeComponent />
    </>
  );
};
```

---

## 📖 Examples

### Basic Usage with Modal

```tsx
import { createReactToggleObserver } from "@med1802/react-toggle-observer";
import { Modal } from "antd";

const toggleObservers = createReactToggleObserver({
  userModal: {
    logger: (params) => console.log("User modal:", params),
  },
});

const { userModal } = toggleObservers;
const { useToggle } = userModal;

const UserModalComponent = () => {
  const [value, close, message] = useToggle(false);
  return (
    <Modal open={value} onCancel={close} onOk={close}>
      <h1>User Modal</h1>
      {message && <p>Message: {message}</p>}
    </Modal>
  );
};
```

### Opening and Closing from Outside

```tsx
const ControlPanel = () => {
  return (
    <>
      <Button onClick={() => userModal.open("Hello from button!")}>
        Open Modal
      </Button>
      <Button onClick={() => userModal.close("Goodbye!")}>Close Modal</Button>
    </>
  );
};
```

### Using Interceptors

```tsx
const SomeComponent = () => {
  const { useInterceptor } = userModal;

  // Intercept all actions (open and close)
  useInterceptor((payload) => {
    console.log("Intercepted:", payload);
    // You can modify the payload here
    return {
      ...payload,
      message: "Modified message",
    };
  });

  // Or intercept only specific actions
  useInterceptor(
    (payload) => {
      console.log("Opening with:", payload);
      return payload;
    },
    "open" // Only intercept open actions
  );

  return <div>Some Component</div>;
};
```

### Listening to Changes

```tsx
const WatcherComponent = () => {
  useEffect(() => {
    const unsubscribe = userModal.onChange((payload) => {
      console.log("State changed:", payload);
      // payload contains: { payload: { open: boolean, message?: any }, eventName, scope }
    });

    return () => unsubscribe();
  }, []);

  return <div>Watching changes...</div>;
};
```

### Multiple Toggles

```tsx
const toggleObservers = createReactToggleObserver({
  userModal: {
    logger: (params) => console.log("User modal:", params),
  },
  authModal: {
    logger: (params) => console.log("Auth modal:", params),
  },
  drawer: {
    logger: (params) => console.log("Drawer:", params),
  },
});

const { userModal, authModal, drawer } = toggleObservers;

// Each toggle is independent
const App = () => {
  return (
    <>
      <UserModalComponent />
      <AuthModalComponent />
      <DrawerComponent />
      <ControlPanel />
    </>
  );
};
```

---

## 🔧 API Reference

### `createReactToggleObserver<T>(params)`

Creates toggle observers for multiple scopes.

**Parameters:**

- `params` - An object where keys are scope names and values are configuration objects with:
  - `logger: (params: LoggerParams) => void` - Logger function called on state changes

**Returns:**
An object where keys are scope names and values are `Channel` objects.

**Example:**

```tsx
const observers = createReactToggleObserver({
  modal: {
    logger: (params) => console.log(params),
  },
});
```

### Channel API

Each channel provides the following methods and hooks:

#### `open(message?: any) => void`

Opens the toggle and optionally sets a message.

```tsx
userModal.open(); // Open without message
userModal.open("Hello!"); // Open with message
```

#### `close(message?: any) => void`

Closes the toggle and optionally sets a message.

```tsx
userModal.close(); // Close without message
userModal.close("Goodbye!"); // Close with message
```

#### `useToggle(initialValue?: boolean) => [boolean, () => void, any]`

React hook that returns the current toggle state, close function, and message.

**Returns:**

- `[value, close, message]` - Tuple containing:
  - `value` - Current boolean state
  - `close` - Function to close the toggle
  - `message` - Current message (if any)

**Example:**

```tsx
const [isOpen, close, message] = useToggle(false);
```

#### `useInterceptor(callback, action?) => void`

React hook for intercepting toggle actions.

**Parameters:**

- `callback: (payload: onChangePayload) => onChangePayload` - Callback that receives and can modify the payload
- `action?: "open" | "close"` - Optional action filter (if not provided, intercepts all actions)

**Example:**

```tsx
useInterceptor((payload) => {
  console.log("Intercepted:", payload);
  return payload; // Return modified or original payload
}, "open"); // Only intercept open actions
```

#### `onChange(callback) => () => void`

Subscribe to state changes. Returns an unsubscribe function.

**Parameters:**

- `callback: (payload: EventPayload) => void` - Callback function

**Returns:**

- Unsubscribe function

**Example:**

```tsx
const unsubscribe = userModal.onChange((payload) => {
  console.log("Changed:", payload);
});
// Later...
unsubscribe();
```

#### `getValue() => boolean`

Gets the current toggle state synchronously.

```tsx
const isOpen = userModal.getValue();
```

#### `getMessage() => any`

Gets the current message synchronously.

```tsx
const message = userModal.getMessage();
```

---

## ✨ Features

- ✅ **Type-safe** - Full TypeScript support with generics
- ✅ **Multiple scopes** - Manage multiple independent toggles
- ✅ **React hooks** - Built-in `useToggle` and `useInterceptor` hooks
- ✅ **Interceptors** - Modify payloads before state updates
- ✅ **Logging** - Built-in logger support for debugging
- ✅ **Message support** - Pass and retrieve messages with state changes
- ✅ **Event subscriptions** - Listen to state changes with `onChange`
- ✅ **Concurrent-safe** - Built on `useSyncExternalStore` for React 18+ compatibility

---

## 📝 Notes

- Each toggle instance is identified by a unique scope name
- Interceptors can modify payloads before they're applied
- Loggers are called on every state change
- Messages are optional and can be any type
- The `useToggle` hook automatically subscribes and unsubscribes on mount/unmount

---

## License

MIT
