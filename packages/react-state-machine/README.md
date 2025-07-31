# @scoped-observer/react-state-machine

A lightweight, flexible state machine library built on top of an event-driven scoped observer pattern.  
Designed to seamlessly integrate with React or work standalone, this package provides a robust way to manage state transitions using clear, typed events and scoped event dispatching.

- Strongly typed state and event definitions for maximum type safety
- Event-based architecture enabling scalable and modular state management
- React hooks for easy integration and reactive UI updates
- Decoupled core logic that can be used outside React as well

Perfect for managing complex UI states, orchestrating asynchronous flows, or building scalable front-end architectures with clean separation of concerns.

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
