# @scoped-observer/react-state-machine

A lightweight, fully typed, and flexible state machine implementation for React applications.  
This package enables clean and predictable state transitions with a simple API, seamlessly integrated with React hooks and render props.

It is designed to work well for common UI patterns such as modals, drawers, wizards, tabs, and more — anywhere you need controlled state management with clear transitions.  
Thanks to its generic design and TypeScript support, it ensures type safety and excellent developer experience.

## Installation

Install the package using npm:

```bash
npm install @scoped-observer/react-state-machine
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/core`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

## API

### `createMachine(config)`

Creates a state machine with the given configuration.

**Parameters:**

- `config.init` - The initial state
- `config.transition` - Object defining state transitions

**Returns:**

- `send(event)` - Function to send events to the machine
- `useMachine()` - React hook that returns `{ state, send }`
- `getState()` - Function to get current state
- `setState(state)` - Function to manually set state

## Example Usage

```tsx
import React from "react";
import { createMachine } from "@scoped-observer/react-state-machine";

const { useMachine } = createMachine({
  init: "open",
  transition: {
    close: {
      on: {
        TOGGLE: "open",
      },
    },
    open: {
      on: {
        TOGGLE: "close",
      },
    },
  },
});

const SomeComponent = () => {
  const { state, send } = useMachine();

  return (
    <div>
      <h1>Current State: {state}</h1>
      <button onClick={() => send({ type: "TOGGLE" })}>
        Toggle from Component
      </button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() =>
          send({
            type: "TOGGLE",
          })
        }
      >
        Toggle from HomePage
      </button>
    </div>
  );
};

const App = () => {
  return (
    <>
      <HomePage />
      <SomeComponent />
    </>
  );
};

export default App;
```
