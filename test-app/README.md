# react-visibility-state-new

A React state management library for handling visibility states using scoped observer pattern.

## Features

- State management for visibility states (open/close)
- Scoped observer pattern for event handling
- React context provider for global state management
- TypeScript support
- Lightweight and performant

## Installation

```bash
npm install react-visibility-state-new
```

## Usage

### Basic Setup

```tsx
import {
  createBrowserVisibility,
  VisibilityProvider,
} from "react-visibility-state-new";

const visibilityStore = createBrowserVisibility();

function App() {
  return (
    <VisibilityProvider value={visibilityStore}>
      <YourComponent />
    </VisibilityProvider>
  );
}
```

### Using Visibility State with VisibilityProvider.Item

```tsx
import {
  VisibilityProvider,
  useVisibilityHandler,
} from "react-visibility-state-new";

function MyComponent() {
  const { open, close } = useVisibilityHandler();

  return (
    <>
      <VisibilityProvider.Item name="modal" initState="close">
        {({ state, payload }) => {
          if (state === "open") {
            return payload; // Render the payload as component
          }
          return null;
        }}
      </VisibilityProvider.Item>

      <button onClick={() => open("modal", <div>Modal Content</div>)}>
        Open Modal
      </button>
      <button onClick={() => close("modal")}>Close Modal</button>
    </>
  );
}
```

### Using useVisibility Hook

```tsx
import {
  useVisibility,
  useVisibilityHandler,
} from "react-visibility-state-new";

function MyComponent() {
  const { state, payload } = useVisibility("myElement", "close");
  const { open, close } = useVisibilityHandler();

  return (
    <div>
      <p>State: {state}</p>
      <p>Payload: {JSON.stringify(payload)}</p>
      <button onClick={() => open("myElement", { data: "some data" })}>
        Open
      </button>
      <button onClick={() => close("myElement")}>Close</button>
    </div>
  );
}
```

### Creating Standalone Visibility Instance

```tsx
import { createVisibility } from "react-visibility-state-new";

const instance = createVisibility("myElement", "close");

// Use the instance methods
instance.subscribe(() => {
  // Handle state changes
});
```

## API

### createBrowserVisibility()

Creates a browser visibility store that manages multiple visibility instances.

**Returns:**

- `initializeItem(name, initState)` - Initialize a new visibility item
- `open(name, payload?)` - Open a visibility item
- `close(name, payload?)` - Close a visibility item
- `getEntity(name)` - Get visibility entity by name

### VisibilityProvider

React context provider for managing visibility state globally.

**Props:**

- `value` - Browser visibility store instance
- `children` - React children

**Static Methods:**

- `VisibilityProvider.Item` - Component for rendering visibility state

### useVisibility(name, initState)

Hook for accessing visibility state and payload.

**Parameters:**

- `name` - Unique name for the visibility item
- `initState` - Initial state ("open" or "close")

**Returns:**

- `state` - Current visibility state
- `payload` - Current payload data

### useVisibilityHandler()

Hook for controlling visibility state.

**Returns:**

- `open(name, payload?)` - Open visibility item
- `close(name)` - Close visibility item

### createVisibility(name, initState)

Creates a standalone visibility instance.

**Parameters:**

- `name` - Unique name for the visibility instance
- `initState` - Initial state ("open" or "close")

**Returns:**

- VisibilityInstance with subscribe, getState, getPayload methods

## Types

```tsx
enum VISIBILITY_STATE {
  OPEN = "open",
  CLOSE = "close",
}

type VisibilityConfig = {
  name: string;
  initState: VISIBILITY_STATE;
};
```

## License

MIT
