# react-scrollium

`react-scrollium` is a lightweight React package designed to track scroll events with type-safe hooks and components.  
It supports multiple scroll events, including `onScroll`, `onScrollStop`, `onTop`, and `onBottom`.

Built on top of a modular slice/event system, `scrollium` provides a predictable, testable, and minimal-dependency solution for scroll-aware components in React applications.

The package leverages a layered architecture:

- **@scoped-observer/core** — a core event bus system,
- **@scoped-observer/react-store** — a lightweight reactive store that manages state based on events
- **react-visibility-state** — the React-focused behavior layer providing an easy-to-use interface for visibility toggling.

This separation of concerns ensures flexibility, extensibility, and ease of maintenance.

## Installation

You can install `react-scrollium` via npm:

```bash
npm install react-scrollium
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/react-store`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

```bash
npm install react @scoped-observer/react-store
```

## Usage Example

This example demonstrates how to use `scrollium` to track scroll state across different components using the `ScrollElement` component, `useScroll` hook, and `useWatch` hook.

```tsx
import {
  SCROLL_EVENTS,
  ScrollElement,
  useScroll,
  useWatch,
} from "react-scrollium";

export const HomePage = () => {
  // Create two independent scroll objects
  const scrollOne = useScroll("scrollOne", {
    scrollPosition: 10,
    behavior: "smooth",
    throttleDelay: 10,
  });

  // Subscribe to scroll position updates for each scroll object
  const scrollPosOne = useWatch((state) => state.scrollPosition, scrollOne, [
    SCROLL_EVENTS.ON_SCROLL,
  ]);

  return (
    <>
      <p>Scroll One Position: {scrollPosOne}</p>

      {/* First scrollable area */}
      <div
        style={{
          height: "10rem",
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      >
        <ScrollElement scroll={scrollOne}>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index} style={{ padding: "0.25rem" }}>
              Item {index + 1}
            </div>
          ))}
        </ScrollElement>
      </div>
    </>
  );
};
```
