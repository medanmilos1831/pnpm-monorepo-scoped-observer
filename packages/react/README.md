# @scoped-observer/react

Built on top of the core `@scoped-observer/core` event system, this package enables clean and flexible communication between components using scoped events — ideal for medium to large React applications requiring modular and decoupled event handling.

## Features

- Scoped event dispatching and subscription with React hooks
- Simple context provider to easily integrate into your React app
- Fully typed with TypeScript
- Minimal dependencies and zero runtime overhead

## When to use

If you want a flexible event system for React that goes beyond simple context or Redux, and prefer fine-grained control with scoped event dispatching — `@scoped-observer/react` is designed for you.

---

## Getting Started

### Installation

You can install the package using npm or pnpm:

```bash
npm install @scoped-observer/core

npm install @scoped-observer/react
```

## Usage

### Providing the Observer

Wrap your React app (or part of it) with `ScopedObserverProvider` and pass your observer instance:

```tsx
import { createScopedObserver } from "@scoped-observer/core";
import { ScopedObserverProvider } from "@scoped-observer/react";

const observer = createScopedObserver([
  {
    scope: "counter",
  },
]);

<ScopedObserverProvider observer={observer}>
  <App />
</ScopedObserverProvider>;
```

---

### Dispatching Events

Use the `useDispatch` hook to send events within your app:

```tsx
import { useDispatch } from "@scoped-observer/react";

function SomeComponent() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      scope: "counter",
      eventName: "inc",
      payload: 1,
    });
  };

  return <button onClick={handleClick}>Select Name</button>;
}
```

---

### Subscribing

Use the `useSubscribe` hook to subscribe to events:

```tsx
import { useSubscribe } from "@scoped-observer/react";

function Counter() {
  const [counter, setCounter] = useState(0);
  useSubscribe(
    {
      scope: "counter",
      callback({ payload }) {
        setCounter((prev) => prev + payload);
      },
    },
    ["inc"]
  );

  return <div>Count: {counter}</div>;
}
```
