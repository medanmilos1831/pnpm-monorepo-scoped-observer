## 🧠 Scoped Observer React Store

`@scoped-observer/react-store` is a lightweight, event-driven state management library for React.

It eliminates the need for global context or provider components. Instead, it relies on scoped references and a custom event system to trigger updates where and when you need them — giving you full control with zero overhead.

Ideal for modular, performant React applications.

- 🔄 Reactive via scoped events
- 🧩 Modular `createSlice` architecture
- 🚫 No provider, no context
- 🧼 Minimal and boilerplate-free

## 📦 Installation

To install `@scoped-observer/react-store`, use your preferred package manager:

```bash
npm install @scoped-observer/react-store
```

Make sure you also have @scoped-observer/core installed, as it's a peer dependency:

```bash
npm install @scoped-observer/core
```

## 🚀 Quick Start

**Create a slice** using `createSlice`:

```ts
import { createSlice, useSlice } from "@scoped-observer/react-store";

const { mutate, selector } = createSlice(
  "user",
  { id: 1 },
  {
    mutations: {
      inc: (data, payload: number) => {
        data.id += payload;
        return data;
      },
    },
    getters: {
      getId: (data) => data.id,
    },
  }
);
```

Use the slice in a React component:

```
export const App = () => {
  const user = useSlice(
    'user',
    (state) => state,
    ['userUpdated'] // event name
  );

  return (
    <div>
      <p>User ID: {user.id}</p>
      <button
        onClick={() =>
          mutate({ mutation: 'inc', payload: 1, runEvents: ['userUpdated'] })
        }
      >
        Increment
      </button>
    </div>
  );
};
```

React component re-renders only when the specified event is dispatched.
No context, no global providers — just direct control.

## 🧠 Concepts

### 📌 Slice

A **slice** is a self-contained unit of state, mutations, and selectors.  
It represents a scoped portion of your application logic.

```ts
createSlice("user", initialState, { mutations, getters });
```

Each slice:

- Owns its state (data)

- Defines mutations to update the state

- Defines getters to read computed data

- Has its own event scope for precise UI updates

### 🔁 **Mutations**

Mutations are pure functions that return a new version of the state.
They are triggered manually using the mutate method.

```
mutate({
  mutation: 'inc',
  payload: 1,
  runEvents: ['userUpdated']
});
```

Each mutation can trigger one or more events, which will re-render only components that are listening for them.

### 👂 **useSlice Hook**

The useSlice hook connects your React component to a specific slice and re-renders only when one of the listed events occurs.

```
useSlice('user', state => state, ['userUpdated']);
```

- No context

- No provider

- No prop-drilling

- Only event-driven updates

### ⚡ **Event-Driven Rendering**

Instead of tracking state changes automatically, components re-render only when you tell them to by dispatching events.
This avoids unnecessary re-renders and gives you complete control over your UI logic.

## ⚡ Quick Example

Define a new slice:

```ts
import { createSlice, useSlice } from "@scoped-observer/react-store";

const { mutate, selector } = createSlice(
  "user",
  { id: 1 },
  {
    mutations: {
      inc: (state, payload: number) => {
        state.id += payload;
        return state;
      },
    },
    getters: {
      getId: (state) => state.id,
    },
  }
);
```

Use it in a React component:

```
const App = () => {
  const user = useSlice(
    'user',
    (state) => state.id,
    ['inc']
  );

  return (
    <div>
      <h1>User ID: {user}</h1>
      <button
        onClick={() => {
          mutate({ mutation: 'inc', payload: 1, runEvents: ['inc'] });
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

✅ Result: The component will re-render only when 'inc' is dispatched.
