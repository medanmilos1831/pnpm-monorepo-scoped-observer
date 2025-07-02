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
  init: "closed",
  transition: {
    closed: {
      handle() {
        return "open";
      },
    },
    open: {
      handle() {
        return "closed";
      },
    },
  },
});

export const Modal = () => {
  const { handler, forceHandler, StateMachineSlot } = modalMachine;

  return (
    <>
      <button onClick={() => handler()}>Toggle Modal</button>
      <button onClick={() => forceHandler("closed")}>Force Close</button>

      <StateMachineSlot>
        {({ state, payload }) => (
          <div>
            Modal is <strong>{state}</strong>
            {payload && <p>Payload: {JSON.stringify(payload)}</p>}
          </div>
        )}
      </StateMachineSlot>
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

- `handler(payload?)`: triggers the current state's handler, optionally with a payload
- `forceHandler(state, payload?)`: forces the machine into the specified state if valid
- `StateMachineSlot`: a React render-prop component providing `{ state, payload }`

---

### handler(payload?)

Triggers the current state's handler. Optionally accepts a payload.

---

### forceHandler(state, payload?)

Forces a state transition to the given state. Throws an error if state is invalid.

---

### StateMachineSlot

A render-prop React component that provides the current state and payload:

```tsx
<StateMachineSlot>
  {({ state, payload }) => (
    // Render UI based on state and payload
  )}
</StateMachineSlot>
```
