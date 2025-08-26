# react-visibility-state

Lightweight, type-safe visibility state management for React modals, drawers, and other UI components. Built with state machines and TypeScript.

## Features

- **Type-safe API** with generic key constraints
- **State Machine** for predictable open/close transitions
- **Instance Management** with automatic cleanup
- **Reactive state** watching with `useWatch`

## Installation

```bash
npm install react-visibility-state @scoped-observer/core @scoped-observer/react-state-machine
```

**Note:** `@scoped-observer/react-state-machine` has `@scoped-observer/core` as a peer dependency.

## Quick Start

```tsx
import { useState } from "react";
import { createVisibility } from "react-visibility-state";

const { useVisibility, VisibilityHandler, getItem, useWatch } =
  createVisibility({
    keys: ["userModal"] as const,
  });

const SomeComponentOne = () => {
  return (
    <div>
      <VisibilityHandler name="userModal">
        {({ state, payload, close }) => {
          console.log("render SomeComponentOne");
          return <span>STATE: {state}</span>;
        }}
      </VisibilityHandler>
    </div>
  );
};

const SomeComponentTwo = () => {
  const { state, payload, send } = useWatch("userModal");
  return <div>SomeComponentTwo {state}</div>;
};

const SomeComponentThree = () => {
  return (
    <div>
      <h1>SomeComponentThree</h1>
    </div>
  );
};

export const HomePage = () => {
  const item = useVisibility("userModal", {
    initState: "close",
  });

  return (
    <>
      <SomeComponentOne />
      <br />
      <SomeComponentTwo />
      <br />
      <SomeComponentThree />
      <br />
      <button
        onClick={() => {
          item.open({
            fname: "John",
            lname: "Doe",
          });
        }}
      >
        Click me
      </button>
    </>
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

### `useWatch(name)`

Reactive hook that returns current state and payload.

```tsx
const { state, payload, send } = visibility.useWatch("modal");
```

### `VisibilityHandler`

Render prop component for handling visibility state.

```tsx
<visibility.VisibilityHandler name="modal">
  {({ state, payload, close }) => <div>Modal State: {state}</div>}
</visibility.VisibilityHandler>
```

**Props:**

- `name: T[number]` - Instance name (must be one of defined keys)
- `children: (props) => JSX.Element` - Render function

**Children Props:**

- `state: 'open' | 'close'` - Current state
- `payload: any` - Current payload
- `close: () => void` - Close function

## Usage Patterns

### Multiple Instances

```tsx
const visibility = createVisibility({
  keys: ["userModal", "settingsModal"] as const,
});

const userModal = visibility.useVisibility("userModal");
const settingsModal = visibility.useVisibility("settingsModal");
```

### Instance Management

- **Map-based storage** for multiple instances
- **Automatic cleanup** on component unmount
- **Type-safe keys** with generic constraints
