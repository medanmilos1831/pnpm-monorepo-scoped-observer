# 🔄 React Toggle Observer

A lightweight React library for managing toggle/visibility state with observer pattern and middleware support. Built on top of `@med1802/scoped-observer` and `@med1802/scoped-observer-message-broker`, React Toggle Observer provides a simple, type-safe API for controlling on/off states with automatic lifecycle management and middleware interception.

Perfect for managing modals, drawers, tooltips, accordions, dropdowns, and any component that needs toggle functionality with logging and middleware capabilities.

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

// Create toggle observer
const toggleObservers = createReactToggleObserver({
  log: false,
});

const { useToggle } = toggleObservers.reactHooks;

// Use in component
const ModalComponent = ({ id }: { id: string }) => {
  const [isOpen, close] = useToggle({ id, initialState: false });

  return (
    <Modal open={isOpen} onCancel={close} onOk={close}>
      <h1>Modal</h1>
    </Modal>
  );
};

// Open toggle from outside
const ControlButton = () => {
  const toggle = toggleObservers.getToggleClient("myModal");

  return <Button onClick={() => toggle.open()}>Open Modal</Button>;
};

// Use in your app
const App = () => {
  return (
    <>
      <ModalComponent id="myModal" />
      <ControlButton />
    </>
  );
};
```

---

## 📖 Examples

### Passing Messages

You can pass messages when opening or closing toggles:

```tsx
const ModalComponent = ({ id }: { id: string }) => {
  const [isOpen, close, message] = useToggle({ id, initialState: false });

  return (
    <Modal open={isOpen} onCancel={() => close("User cancelled")}>
      <h1>Modal</h1>
      {message && <p>Message: {message}</p>}
    </Modal>
  );
};

const Button = () => {
  const toggle = toggleObservers.getToggleClient("myModal");

  return (
    <Button onClick={() => toggle.open("Hello from button!")}>
      Open Modal
    </Button>
  );
};
```

### Multiple Toggles

Each toggle is identified by a unique ID, so you can manage multiple independent toggles:

```tsx
const App = () => {
  return (
    <>
      <ModalComponent id="userModal" />
      <ModalComponent id="settingsModal" />
      <ModalComponent id="drawer" />
    </>
  );
};
```

### Using Middleware

Middleware allows you to intercept and modify toggle actions. Define middleware when creating the observer, then use it in components:

```tsx
const toggleObservers = createReactToggleObserver({
  log: false,
  middlewares: {
    someMiddleware: ({ resolve, reject }, state) => {
      resolve((value, message) => {
        return value + message;
      });
    },
  },
});

const { useToggle, useMiddleware } = toggleObservers.reactHooks;

const ComponentWithMiddleware = () => {
  const [counter, setCounter] = useState(0);

  useMiddleware({
    toggleId: "test",
    use: "someMiddleware",
    value: counter + 1,
  });

  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </>
  );
};
```

---

## 🔧 API Reference

### `createReactToggleObserver(config)`

Creates a toggle observer store.

**Parameters:**

- `config.log: boolean` - Enable/disable console logging
- `config.middlewares?: object` - Optional middleware definitions

**Returns:**

- `reactHooks.useToggle` - React hook for using toggles
- `reactHooks.useMiddleware` - React hook for applying middleware
- `getToggleClient(id)` - Get toggle client by ID
- `createToggle(params)` - Manually create a toggle
- `deleteToggle(id)` - Delete a toggle

### `useToggle({ id, initialState })`

React hook that manages toggle state in a component.

**Parameters:**

- `id: string` - Unique identifier for the toggle
- `initialState: boolean` - Initial open/closed state

**Returns:**

- `[value, close, message]` - Tuple with current state, close function, and current message

### `useMiddleware({ toggleId, use, value })`

React hook for applying middleware to a toggle.

**Parameters:**

- `toggleId: string` - Toggle ID to apply middleware to
- `use: string` - Name of the middleware (must be defined in config)
- `value: any` - Value to pass to the middleware

### `getToggleClient(id)`

Gets a toggle client by ID.

**Returns:**

- `open(message?)` - Open the toggle with optional message
- `close(message?)` - Close the toggle with optional message
- `onChange(callback)` - Subscribe to state changes
- `getValue()` - Get current state synchronously
- `getMessage()` - Get current message synchronously

---

## 📝 Notes

- Each toggle must have a **unique ID** - using the same ID for multiple toggles will cause conflicts
- Toggles created with `useToggle` are **automatically cleaned up** when the component unmounts
- To open a toggle, use `getToggleClient(id).open()` - the `close` function from `useToggle` only closes the toggle
- Messages can be **any type** (string, object, number, etc.)
- Middleware must be defined in the config before using `useMiddleware`
