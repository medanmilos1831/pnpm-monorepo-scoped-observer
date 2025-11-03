# React Scrollium

A React library for managing scroll state and behavior with a clean, type-safe API. Perfect for scroll animations, infinite scrolling, parallax effects, or any scroll-driven UI interactions in your React app.

## Features

- **Simple API** - React components and hooks that feel natural to use
- **Scroll tracking** - Track scroll position, direction, progress, and boundaries
- **Axis support** - Handle both vertical and horizontal scrolling
- **Event system** - Listen to scroll and scroll stop events
- **Flexible state** - Access scroll state from any component, even outside the scroll container
- **TypeScript** - Fully typed for better developer experience
- **Performance** - Optimized with debounced scroll stop detection

## Installation

```bash
npm install react-scrollium
```

### Peer Dependencies

This package requires the following peer dependencies:

- `react` ^18.0.0
- `@scoped-observer/react-store` ^3.0.2

Make sure to install them if they're not already in your project:

```bash
npm install react @scoped-observer/react-store
```

## Getting Started

First, create a scrollium client by calling `createScrolliumClient()`. This returns an object with all the components and hooks you need:

```tsx
import { createScrolliumClient } from "react-scrollium";

const {
  Scroll,
  useScroll,
  useScrollCommands,
  useScrolliumSelector,
  getScrolliumClient,
} = createScrolliumClient();

// Export them for use throughout your app
export {
  Scroll,
  useScroll,
  useScrollCommands,
  useScrolliumSelector,
  getScrolliumClient,
};
```

## Setting Up a Scroll Container

Now you can use the `Scroll` component to set up your scroll container. Wrap your scrollable content with it:

```tsx
<Scroll
  id="scroll-1"
  axis="vertical"
  onScroll={(params) => {
    console.log("Scroll position:", params.scrollPosition);
  }}
>
  {/* Your scrollable content */}
</Scroll>
```

### Scroll Props

- **`id`** (required) - Unique identifier for the scroll instance
- **`axis`** (optional) - Scroll axis: `"vertical"` or `"horizontal"` (default: `"vertical"`)
- **`onScroll`** (optional) - Callback fired on scroll with scroll state

## useScroll Hook

The `useScroll()` hook gives you access to the current scroll state. It can only be used inside a `Scroll` component:

```tsx
const ScrollContent = () => {
  const scroll = useScroll();

  return (
    <div>
      <p>Position: {scroll.scrollPosition}px</p>
      <p>Progress: {scroll.progress}%</p>
      <p>Direction: {scroll.direction}</p>
      <p>Is at start: {scroll.isStart ? "Yes" : "No"}</p>
      <p>Is at end: {scroll.isEnd ? "Yes" : "No"}</p>
    </div>
  );
};
```

### Return Values

The `useScroll()` hook returns an object with:

- **`id`** - Scroll instance identifier (string)
- **`scrollPosition`** - Current scroll position in pixels (number)
- **`axis`** - Current scroll axis: `"vertical"` or `"horizontal"`
- **`direction`** - Current scroll direction: `"up"`, `"down"`, `"left"`, `"right"`, or `"none"`
- **`progress`** - Scroll progress percentage 0-100 (number)
- **`isStart`** - Boolean indicating if scroll is at the start (position 0)
- **`isEnd`** - Boolean indicating if scroll is at the end (max scroll)
- **`clientSize`** - Visible client/viewport size in pixels (number)
- **`scrollSize`** - Maximum scrollable size in pixels (number)
- **`isScrolling`** - Boolean indicating if currently scrolling (debounced 500ms)

The hook automatically re-renders when the scroll state changes (position, direction, progress, etc.).

## useScrollCommands Hook

The `useScrollCommands()` hook provides functions to control scroll position. It can only be used inside a `Scroll` component:

```tsx
const ScrollControls = () => {
  const { scrollTo, scrollToStart, scrollToEnd } = useScrollCommands();

  return (
    <div>
      <button onClick={() => scrollToStart({ behavior: "smooth" })}>
        Scroll to Start
      </button>
      <button onClick={() => scrollTo({ top: 500, behavior: "smooth" })}>
        Scroll to 500px
      </button>
      <button onClick={() => scrollToEnd({ behavior: "smooth" })}>
        Scroll to End
      </button>
    </div>
  );
};
```

### Available Commands

- **`scrollTo(options?)`** - Scroll to a specific position. Accepts standard `ScrollToOptions` (`top`, `left`, `behavior`)
- **`scrollToStart(options?)`** - Scroll to the start (position 0). Accepts `ScrollOptions` (`behavior`)
- **`scrollToEnd(options?)`** - Scroll to the end (maximum scroll position). Accepts `ScrollOptions` (`behavior`)

All commands support smooth scrolling via the `behavior: "smooth"` option.

## useScrolliumSelector Hook

The `useScrolliumSelector()` hook gives you access to a scrollium client from anywhere in your component tree, even outside the `Scroll` component. **The key feature is that it's reactive** - it returns `undefined` if the scroll container doesn't exist yet, and automatically updates when the scroll container is created or removed.

```tsx
const ExternalScrollIndicator = () => {
  const client = useScrolliumSelector("scroll-1");

  useEffect(() => {
    if (!client) return;

    const unsubscribe = client.addEventListener("onScroll", (payload) => {
      console.log("Scroll position:", payload.scrollPosition);
    });

    return () => {
      unsubscribe();
    };
  }, [client]);

  if (!client) {
    return <div>Scroll container not ready yet</div>;
  }

  return (
    <div>
      <div>Progress: {client.getters.getProgress()}%</div>
      <button onClick={() => client.commands.scrollToStart()}>
        Scroll to Top
      </button>
    </div>
  );
};
```

### Client API

The hook returns a client object (or `undefined`) with:

- **`commands`** - Scroll commands object:
  - `scrollTo(options?)` - Scroll to specific position
  - `scrollToStart(options?)` - Scroll to start
  - `scrollToEnd(options?)` - Scroll to end
- **`getters`** - State getters object:
  - `getScrollPosition()` - Get current scroll position
  - `getAxis()` - Get scroll axis
  - `getDirection()` - Get scroll direction
  - `getProgress()` - Get scroll progress percentage
  - `getIsStart()` - Check if at start
  - `getIsEnd()` - Check if at end
  - `getClientSize()` - Get visible viewport size
  - `getScrollSize()` - Get maximum scrollable size
  - `getIsScrolling()` - Check if currently scrolling
  - `getId()` - Get scroll instance ID
- **`addEventListener(eventName, callback)`** - Listen to scroll events (`onScroll`, `onScrollStop`). Returns unsubscribe function.

The hook automatically re-renders your component when the scroll container is created or destroyed.

## getScrolliumClient Function

The `getScrolliumClient()` function gives you access to a scrollium client by its ID. It has the same API as `useScrolliumSelector()`, but **it's not reactive** - it won't trigger re-renders when the scroll container is created or destroyed. This makes it perfect for using in event handlers, regular JavaScript modules, or anywhere you need runtime access without React's reactivity.

```tsx
const MyComponent = () => {
  const handleClick = () => {
    const client = getScrolliumClient("scroll-1");
    if (client) {
      client.commands.scrollToEnd({ behavior: "smooth" });
      console.log("Current position:", client.getters.getScrollPosition());
    }
  };

  return <button onClick={handleClick}>Scroll to End</button>;
};
```

You can also use it in non-React contexts, like plain JavaScript modules:

```javascript
// In a utility module
export function scrollToPosition(position) {
  const client = getScrolliumClient("scroll-1");
  if (client) {
    client.commands.scrollTo({ top: position, behavior: "smooth" });
  }
}
```

### Client API

The function returns the same client object as `useScrolliumSelector()`:

- **`commands`** - Scroll commands (same as `useScrolliumSelector`)
- **`getters`** - State getters (same as `useScrolliumSelector`)
- **`addEventListener(eventName, callback)`** - Listen to scroll events (same as `useScrolliumSelector`)

Returns `undefined` if the scroll container doesn't exist. Unlike `useScrolliumSelector()`, this function won't trigger component re-renders when the scroll state changes.
