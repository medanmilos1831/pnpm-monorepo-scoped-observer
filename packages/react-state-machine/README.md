# React State Machine

A lightweight, fully typed, and flexible state machine implementation for React applications.  
This package enables clean and predictable state transitions with a simple API, seamlessly integrated with React hooks and render props.

It is designed to work well for common UI patterns such as modals, drawers, wizards, tabs, and more — anywhere you need controlled state management with clear transitions.  
Thanks to its generic design and TypeScript support, it ensures type safety and excellent developer experience.

## Installation

Install the package using npm or yarn:

```bash
npm install @scoped-observer/react-state-machine
```

⚠️ **Peer dependencies:** This package requires @scoped-observer/core as peer dependencies.
Make sure to install them in your project:

```
npm install @scoped-observer/core
```

## Features

- 🔥 Fully typed with TypeScript generics for strong type safety
- ⚡ Simple and intuitive API: dispatch, force state, subscribe, and render prop React component
- 🔄 Supports custom payloads on state transitions
- 🎯 Easily integrates with React hooks and functional components
- 🚀 Lightweight and dependency-free except React & TypeScript
- 🔧 Flexible and generic enough for modals, wizards, tabs, and other UI state machines
- 🛠 Custom event manager handles efficient communication and subscriptions

## Usage

### Basic modal toggle example

```tsx
import React from "react";
import { createMachine } from "your-package-name";

const modalMachine = createMachine({
  init: "close",
  transition: {
    close: {
      on: {
        TOGGLE: "open",
        Pera: "open",
      },
    },
    open: {
      on: {
        TOGGLE: "close",
      },
    },
  },
});
export const Modal = () => {
  return (
    <>
      <button
        onClick={() =>
          modalMachine.handler({
            type: "TOGGLE",
            payload: 1,
          })
        }
      >
        Toggle Modal
      </button>

      <modalMachine.StateMachineSlot>
        {(data) => {
          console.log("data", data);
          return <></>;
        }}
      </modalMachine.StateMachineSlot>
    </>
  );
};
```

This example demonstrates how to create a simple open/close modal state machine, handle toggle actions, force states, and subscribe to state updates with an optional payload.

## API

### createMachine({ init, transition })

Creates a new state machine instance.

- `init`: initial state (must be a key from `transition`)
- `transition`: object mapping states to their `handle` functions

**Returns:**

- `handler({ type, payload? })`: Triggers a transition from the current state using the given type. If the transition exists, it updates the internal state and notifies all subscribers. An optional payload can be passed and will be sent to listeners
- `StateMachineSlot`: a React render-prop component providing `{ state, payload }`

---

### handler({ type, payload? })

Triggers the current state's handler. Optionally accepts a payload.

### StateMachineSlot

A render-prop React component that provides the current state and payload:

```tsx
<StateMachineSlot>
  {({ state, payload }) => (
    // Render UI based on state and payload
  )}
</StateMachineSlot>
```
