# react-visibility-state

`react-visibility-state` is a lightweight React package designed to manage simple visibility states — specifically, toggling between "open" and "close" — using a finite state machine under the hood.

Built on top of a modular state machine system, this package provides a clean, predictable, and testable way to control visibility in React applications, whether for modals, dropdowns, accordions, or any UI element requiring open/close state management.

The package leverages a layered architecture:

- **@scoped-observer/core** — a core event bus system,
- **@scoped-observer/react-state-machine** — a finite state machine built on the core,
- **react-visibility-state** — the React-focused behavior layer providing an easy-to-use interface for visibility toggling.

This separation of concerns ensures flexibility, extensibility, and ease of maintenance.

Use `react-visibility-state` to simplify your component visibility logic with a robust, minimal dependency solution.

## Installation

You can install `react-visibility-state` via npm or yarn:

```bash
npm install react-visibility-state
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/react-state-machine`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

```bash
npm install react @scoped-observer/react-state-machine
```

## Usage Example

This example demonstrates how to use `react-visibility-state` to manage visibility state of multiple modals across different components using `VisibilityProvider`, `VisibilityHandler`, and `useVisibility` hook.

```tsx
import { Modal } from "antd";
import {
  useVisibility,
  VisibilityHandler,
  VisibilityProvider,
  createVisibilityRegistry,
} from "react-visibility-state";

const value = createVisibilityRegistry();

const SomeComponentOne = () => {
  const item = useVisibility("two");
  return (
    <>
      <span>SomeComponentOne</span>
      <button onClick={() => item.handle(1)}>open modal</button>
    </>
  );
};

const SomeComponentTwo = () => {
  return (
    <>
      <VisibilityHandler name={"two"}>
        {(data, handler) => {
          return (
            <Modal open={data === "open"} onCancel={handler} closable>
              {/* element */}
            </Modal>
          );
        }}
      </VisibilityHandler>
    </>
  );
};

export const App = () => (
  <div style={{ background: "black", height: "100vh", color: "white" }}>
    <VisibilityStateProvider value={value}>
      <SomeComponentTwo />
      <SomeComponentOne />
    </VisibilityStateProvider>
  </div>
);
```
