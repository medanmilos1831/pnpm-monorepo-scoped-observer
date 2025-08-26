# react-visibility-state

Lightweight, type-safe visibility state management for React modals, drawers, and other UI components. Built with state machines and TypeScript.

## Features

- **Type-safe API** with generic key constraints
- **State Machine** for predictable open/close transitions
- **Instance Management** with automatic cleanup
- **Reactive state** watching with `useWatch`
- **Direct instance access** with `getItem`
- **Callback-based watching** for computed values
- **Enhanced VisibilityHandler** with open/close functions

## Installation

```bash
npm install react-visibility-state @scoped-observer/core @scoped-observer/react-state-machine
```

**Note:** `@scoped-observer/react-state-machine` has `@scoped-observer/core` as a peer dependency.

## Quick Start

```tsx
import { Modal } from "antd";
import { createVisibility } from "react-visibility-state";

const { useVisibility, VisibilityHandler, getItem, useWatch } =
  createVisibility({
    keys: ["userModal"] as const,
  });

// Component that opens the modal
const HomeHeader = () => {
  return (
    <div>
      <span>Welcome to our amazing homepage!</span>
      <button
        onClick={() => {
          getItem("userModal").open({ message: "Hello from HomeHeader!" });
        }}
      >
        Open Modal
      </button>
    </div>
  );
};

// Neutral component that doesn't interact with modal
const HomeContent = () => {
  return <span>This is the main content area of our homepage.</span>;
};

// Component that watches modal state and changes background
const HomeFooter = () => {
  const { state, payload, open, close, reset, callbackValue } = useWatch(
    "userModal",
    (state) => {
      return {
        footerBackground: state === "open" ? "red" : "blue",
      };
    }
  );

  return (
    <div style={{ backgroundColor: callbackValue.footerBackground }}>
      <span>Homepage footer - thanks for visiting!</span>
      <div>
        <span>Modal State: {state}</span>
        {payload && <span>Payload: {JSON.stringify(payload)}</span>}
        <button onClick={() => open({ message: "Hello from Footer!" })}>
          Open from Footer
        </button>
        <button onClick={close}>Close from Footer</button>
        <button onClick={reset}>Reset from Footer</button>
      </div>
    </div>
  );
};

export const HomePage = () => {
  const userModal = useVisibility("userModal", { initState: "close" });

  const handleClose = () => {
    userModal.close();
  };

  return (
    <div>
      <h1>Home Page Hello</h1>

      <div>
        <HomeHeader />
      </div>

      <div>
        <HomeContent />
      </div>

      <div>
        <HomeFooter />
      </div>

      <div>
        <h3>Visibility State Example</h3>
        <div>
          <button
            onClick={() => userModal.open({ message: "Hello from HomePage!" })}
          >
            Open Modal
          </button>
        </div>

        <VisibilityHandler name="userModal">
          {({ state, payload }) => {
            return (
              <Modal
                title="Visibility State Modal"
                open={state === "open"}
                onCancel={handleClose}
                onOk={handleClose}
              >
                <div>
                  <p>
                    <strong>Modal is Open!</strong>
                  </p>
                  <p>
                    Payload: <code>{JSON.stringify(payload)}</code>
                  </p>
                  <p>
                    State: <code>{state}</code>
                  </p>
                </div>
              </Modal>
            );
          }}
        </VisibilityHandler>
      </div>
    </div>
  );
};
```

## API

### `createVisibility(config)`

Creates a visibility manager with predefined keys.

```tsx
const visibility = createVisibility({
  keys: ["modal", "drawer", "tooltip"] as const,
});
```

### `useVisibility(name, options?)`

Creates a visibility instance for the specified name.

```tsx
const api = visibility.useVisibility("modal", {
  initState: "open", // 'open' | 'close', default: 'close'
});
```

**Returns API:**

- `open(payload?)` - Opens the instance with optional payload
- `close()` - Closes the instance
- `reset()` - Resets to initial state

### `useWatch(name, callback?)`

Reactive hook that returns current state, payload, and optional computed values.

```tsx
// Basic usage
const { state, payload, open, close, reset } = visibility.useWatch("modal");

// With callback for computed values
const { state, payload, callbackValue, open, close, reset } =
  visibility.useWatch("modal", (state, payload) => {
    return {
      backgroundColor: state === "open" ? "red" : "blue",
      isActive: state === "open",
    };
  });
```

**Returns:**

- `state: 'open' | 'close'` - Current state
- `payload: any` - Current payload
- `callbackValue: C | null` - Computed value from callback (if provided)
- `open: (payload?) => void` - Open function
- `close: () => void` - Close function
- `reset: () => void` - Reset function

### `VisibilityHandler`

Render prop component for handling visibility state with full API access.

```tsx
<visibility.VisibilityHandler name="modal">
  {({ state, payload, close, open }) => (
    <div>
      <div>Modal State: {state}</div>
      <button onClick={() => open({ message: "Hello!" })}>Open</button>
      <button onClick={close}>Close</button>
    </div>
  )}
</visibility.VisibilityHandler>
```

**Props:**

- `name: T[number]` - Instance name (must be one of defined keys)
- `children: (props) => JSX.Element` - Render function

**Children Props:**

- `state: 'open' | 'close'` - Current state
- `payload: any` - Current payload
- `close: () => void` - Close function
- `open: (payload?) => void` - Open function

### `getItem(name)`

Direct access to visibility instance API without hooks.

```tsx
// Access from anywhere in your component tree
const modalApi = visibility.getItem("modal");
modalApi.open({ message: "Hello!" });
modalApi.close();
```

**Use cases:**

- Event handlers in child components
- Imperative API calls
- Access from non-React contexts

## Usage Patterns

### Multiple Instances

```tsx
const visibility = createVisibility({
  keys: ["userModal", "settingsModal"] as const,
});

const userModal = visibility.useVisibility("userModal");
const settingsModal = visibility.useVisibility("settingsModal");
```

### Callback-based Watching

```tsx
const { callbackValue } = useWatch("modal", (state, payload) => {
  return {
    backgroundColor: state === "open" ? "red" : "blue",
    isActive: state === "open",
    message: payload?.message || "No message",
  };
});

// Use computed values
<div style={{ backgroundColor: callbackValue.backgroundColor }}>
  {callbackValue.message}
</div>;
```

### Direct API Access

```tsx
// In event handlers
const handleClick = () => {
  const modalApi = getItem("userModal");
  modalApi.open({ userId: 123 });
};

// In child components
<button onClick={handleClick}>Open Modal</button>;
```

### Instance Management

- **Map-based storage** for multiple instances
- **Automatic cleanup** on component unmount
- **Type-safe keys** with generic constraints
- **Shared state** across component tree
