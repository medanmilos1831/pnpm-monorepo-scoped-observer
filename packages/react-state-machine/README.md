## @scoped-observer/react

A lightweight, scoped event-driven state system for React.

This package provides React bindings for `@scoped-observer/core`, enabling components to subscribe to scoped events and reactively update local state or side effects without the need for global stores or third-party state management libraries.

- 🔬 Scoped subscriptions
- ⚡ Local reactive updates
- 🧩 Modular and encapsulated
- 💡 Great for micro frontends and isolated features

## Installation

You need both the core package and the React bindings:

```bash
npm i @scoped-observer/core

npm i @scoped-observer/react-state-machine
```

## Example Usage

```tsx
import React from "react";
import {
  createMachine,
  useMachine,
} from "@scoped-observer/react-state-machine";

const SomeMachine = createMachine({
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
  const { state, payload } = useMachine(SomeMachine);

  return (
    <div>
      <h1>Current State: {state}</h1>
      <p>Payload: {payload ?? "-"}</p>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <button
        onClick={() =>
          SomeMachine.handler({
            type: "TOGGLE",
            payload: 111,
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
