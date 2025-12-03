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

// Create toggle observer with logging enabled
const toggleObservers = createReactToggleObserver({
  log: true,
});

const { useToggle, useInterceptor } = toggleObservers.reactHooks;

// Use in components
const ModalComponent = ({ id, initialState }: { id: string; initialState: boolean }) => {
  const [isOpen, close, message] = useToggle({ id, initialState });
  return (
    <Modal open={isOpen} onCancel={() => close("close message")} onOk={() => close()}>
      <div>
        <h1>Modal</h1>
        {message && <p>{JSON.stringify(message)}</p>}
      </div>
    </Modal>
  );
};

const SomeComponent = () => {
  const toggle = toggleObservers.getToggleClient("test");
  const toggle2 = toggleObservers.getToggleClient("test2");
  return (
    <>
      <Button
        onClick={() =>
          toggle.open({
            message: "Hello from button!",
          })
        }
      >
        Open Modal
      </Button>
      <Button
        onClick={() =>
          toggle2.open({
            message: "Hello from button 2!",
          })
        }
      >
        Open Modal 2
      </Button>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <ModalComponent id="test" initialState={false} />
      <ModalComponent id="test2" initialState={false} />
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
  log: true,
});

const { useToggle } = toggleObservers.reactHooks;

const UserModalComponent = ({ id }: { id: string }) => {
  const [isOpen, close, message] = useToggle({ id, initialState: false });
  return (
    <Modal open={isOpen} onCancel={close} onOk={close}>
      <h1>User Modal</h1>
      {message && <p>Message: {JSON.stringify(message)}</p>}
    </Modal>
  );
};
```

### Opening and Closing from Outside

```tsx
const ControlPanel = () => {
  const toggle = toggleObservers.getToggleClient("test");
  
  return (
    <>
      <Button onClick={() => toggle.open({ message: "Hello from button!" })}>
        Open Modal
      </Button>
      <Button onClick={() => toggle.close({ message: "Goodbye!" })}>
        Close Modal
      </Button>
    </>
  );
};
```

### Using Interceptors

```tsx
const SomeComponent = () => {
  const [counter, setCounter] = useState(0);
  
  useInterceptor({
    id: "test",
    callback: (payload) => {
      return {
        ...payload,
        counter,
      };
    },
    action: "open", // Only intercept open actions
  });

  return (
    <>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <p>Counter: {counter}</p>
    </>
  );
};
```

### Listening to Changes

```tsx
const WatcherComponent = () => {
  useEffect(() => {
    const toggle = toggleObservers.getToggleClient("test");
    const unsubscribe = toggle.onChange((payload) => {
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
  log: true,
});

const { useToggle } = toggleObservers.reactHooks;

// Each toggle is identified by unique ID
const App = () => {
  return (
    <>
      <ModalComponent id="userModal" initialState={false} />
      <ModalComponent id="authModal" initialState={false} />
      <ModalComponent id="drawer" initialState={false} />
      <ControlPanel />
    </>
  );
};
```

---

## 🔧 API Reference

### `createReactToggleObserver(config)`

Creates a toggle observer store with React hooks.

**Parameters:**

- `config` - Configuration object:
  - `log: boolean` - Enable/disable logging (shows toggle state table in console)

**Returns:**

An object with:
- `reactHooks` - Object containing React hooks:
  - `useToggle` - Hook for using toggle in components
  - `useInterceptor` - Hook for intercepting toggle actions
- `getToggleClient(id: string)` - Get toggle client by ID
- `createToggle(params)` - Manually create a toggle
- `deleteToggle(id: string)` - Delete a toggle by ID

**Example:**

```tsx
const toggleObservers = createReactToggleObserver({
  log: true,
});
```

### React Hooks

#### `useToggle(params) => [boolean, (message?: any) => void, any]`

React hook that manages toggle state in a component. Automatically creates the toggle on mount and cleans it up on unmount.

**Parameters:**

- `params` - Toggle configuration:
  - `id: string` - Unique identifier for the toggle
  - `initialState: boolean` - Initial open/closed state

**Returns:**

- `[value, close, message]` - Tuple containing:
  - `value` - Current boolean state
  - `close` - Function to close the toggle (optionally accepts a message)
  - `message` - Current message (if any)

**Example:**

```tsx
const [isOpen, close, message] = useToggle({ id: "test", initialState: false });
```

#### `useInterceptor({ id, callback, action? }) => void`

React hook for intercepting toggle actions. Automatically subscribes on mount and unsubscribes on unmount.

**Parameters:**

- `id: string` - Toggle ID to intercept
- `callback: (payload: any) => boolean | { payload: any }` - Callback that receives and can modify the payload
- `action?: "open" | "close"` - Optional action filter (if not provided, intercepts all actions)

**Example:**

```tsx
useInterceptor({
  id: "test",
  callback: (payload) => {
    console.log("Intercepted:", payload);
    return {
      ...payload,
      customField: "value",
    };
  },
  action: "open", // Only intercept open actions
});
```

### Toggle Client API

#### `getToggleClient(id: string)`

Gets a toggle client by ID. Throws an error if toggle doesn't exist.

**Returns:**

An object with:
- `open(message?: any) => void` - Open the toggle with optional message
- `close(message?: any) => void` - Close the toggle with optional message
- `onChange(callback) => () => void` - Subscribe to state changes
- `getValue() => boolean` - Get current state synchronously
- `getMessage() => any` - Get current message synchronously

**Example:**

```tsx
const toggle = toggleObservers.getToggleClient("test");
toggle.open({ message: "Hello!" });
toggle.close();
const isOpen = toggle.getValue();
const message = toggle.getMessage();
```

---

## ✨ Features

- ✅ **Type-safe** - Full TypeScript support
- ✅ **ID-based toggles** - Manage multiple independent toggles by unique IDs
- ✅ **React hooks** - Built-in `useToggle` and `useInterceptor` hooks
- ✅ **Interceptors** - Modify payloads before state updates
- ✅ **Logging** - Built-in console logging with formatted tables
- ✅ **Message support** - Pass and retrieve messages with state changes
- ✅ **Event subscriptions** - Listen to state changes with `onChange`
- ✅ **Automatic cleanup** - Toggles are automatically cleaned up on unmount
- ✅ **Concurrent-safe** - Built on `useSyncExternalStore` for React 18+ compatibility

---

## 📝 Notes

- Each toggle instance is identified by a unique ID
- Toggles created with `useToggle` are automatically cleaned up when the component unmounts
- Interceptors can modify payloads before they're applied
- Logging shows a formatted table in the console with all toggle states
- Messages can be any type (string, object, etc.)
- The `useToggle` hook automatically subscribes and unsubscribes on mount/unmount

---

## License

MIT
