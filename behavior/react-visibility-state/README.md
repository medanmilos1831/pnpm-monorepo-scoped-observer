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

## Usage Example with Ant Design Modal

This example demonstrates how to use `react-visibility-state` to manage visibility state of multiple modals across different components using `VisibilityProvider`, `VisibilityHandler`, and `useVisibility` hook.

```tsx
import { Modal } from "antd";
import {
  useVisibility,
  VisibilityHandler,
  VisibilityProvider,
} from "react-visibility-state";

const SomeComponentOne = () => {
  return <span>SomeComponentOne</span>;
};

const SomeComponentTwo = () => {
  return (
    <>
      <span>SomeComponentTwo</span>
      <VisibilityHandler name="two">
        {(state, toggle) => (
          <Modal open={state === "open"} onCancel={toggle} closable>
            <span>Modal Two Content</span>
          </Modal>
        )}
      </VisibilityHandler>
    </>
  );
};

const HomePage = () => {
  const modalOne = useVisibility("one");
  const modalTwo = useVisibility("two");

  return (
    <div>
      <button onClick={() => modalOne.handle()}>Open Modal One</button>

      <VisibilityHandler name="one">
        {(state, toggle) => (
          <Modal
            open={state === "open"}
            onCancel={toggle}
            closable
            onOk={() => {
              modalTwo.handle();
            }}
          >
            <span>Modal One Content</span>
          </Modal>
        )}
      </VisibilityHandler>

      <br />
      <SomeComponentOne />
      <br />
      <SomeComponentTwo />
    </div>
  );
};

export const App = () => (
  <div style={{ background: "black", height: "100vh", color: "white" }}>
    <VisibilityProvider>
      <HomePage />
    </VisibilityProvider>
  </div>
);
```
