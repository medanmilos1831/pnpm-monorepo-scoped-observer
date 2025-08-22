# @scoped-observer/react-store

A lightweight state management utility for React, built on top of [scoped-observer](https://www.npmjs.com/package/@scoped-observer/core).  
It provides **event-driven slices of state** with zero external dependencies (except React itself).

Think of it as a tiny alternative to Redux or Zustand – but with a focus on:

- 🔌 **Scoped events** – updates are triggered only when specific events occur
- 🎯 **Fine-grained subscriptions** – components re-render only when selected state changes
- ⚡ **Minimal boilerplate** – no reducers, middlewares, or context providers needed
- 🛠 **TypeScript first** – strong typing for state and events

## 📥 Installation

You can install the package via npm or yarn:

```bash
npm install @scoped-observer/react-store
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/core`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

## 🚀 Basic Usage

Here’s a minimal example of how to create and use a slice in your React application:

```tsx
import { createSlice } from "scoped-observer-store-react";

const { useSubscibe, getState, action } = createSlice({
  scope: "person",
  state: {
    fname: "John",
    lname: "Smit",
    age: 40,
  },
  onEvent: {
    updateAge(state, payload) {
      return {
        ...state,
        age: state.age + payload,
      };
    },
  },
});

const SomeComponent = () => {
  const age = useSubscibe((state) => state.age, ["updateAge"]);

  return <div>Age: {age}</div>;
};

export const App = () => {
  return (
    <>
      <h1>App</h1>

      <button
        onClick={() => {
          action({
            type: "updateAge",
            payload: 1,
          });
        }}
      >
        Update state
      </button>
      <SomeComponent />
    </>
  );
};
```

### 🔇 Silent updates

Sometimes you may want to update the state **without emitting an event** (e.g. during initialization or hydration).  
You can achieve this by passing `silent: true` to the `action` call.

```tsx
action({
  type: "updateAge",
  payload: 5,
  silent: true, // 👈 state will be updated, but no event is dispatched
});
```
