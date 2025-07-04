# Scroll Observer

A lightweight and flexible React utility for tracking scroll position, direction, and progress — perfect for building custom scroll-based interactions and animations.

## Features

- Observe scroll position and direction on any container or window
- Track scroll progress as a normalized value (0 to 1)
- Easily subscribe to scroll events with React hooks or a dedicated ScrollObserver component
- Supports both vertical and horizontal scrolling
- Built with TypeScript for type safety and great DX

## Installation

```bash
npm i @scoped-observer/react-scroll
```

## ScrollObserver

`ScrollObserver` is a React component and service designed to efficiently track scroll behavior within any scrollable container or the `window` object.

### Features

- Tracks current scroll position (horizontal or vertical)
- Detects scroll direction (`up`, `down`, `left`, `right`)
- Calculates scroll progress as a normalized value between 0 and 1
- Provides callbacks for scroll start, ongoing scroll, and scroll end events
- Supports throttling to optimize performance on scroll events
- Supports waypoints using the `IntersectionObserver` API for fine-grained scroll event detection

---

#### `ScrollObserver`

```tsx
import React from "react";
import { ScrollObserver } from "react-scroll-scoped-observer";

const MyComponent = () => {
  const handleScroll = ({ scrollPosition, direction, scrollProgress }) => {
    console.log("Scroll position:", scrollPosition);
    console.log("Scroll direction:", direction);
    console.log("Scroll progress:", scrollProgress);
  };

  return (
    <ScrollObserver name="myScrollContainer">
      <div style={{ height: "400px", overflowY: "auto" }}>
        {/* Scrollable content */}
      </div>
    </ScrollObserver>
  );
};
```

- 🔑 **`name`** _(string, required)_  
  Unique identifier for the scroll container.

- ↔️ **`axis`** _('x' | 'y', required)_  
  Scroll axis to observe — horizontal (`x`) or vertical (`y`).

- ⏳ **`throttle`** _(number, optional)_  
  Throttle delay in milliseconds for scroll events.

- 🚦 **`onStart`** _(() => void, optional)_  
  Callback fired when scrolling starts.

- 🔄 **`onScroll`** _((scroll: scroll) => void, optional)_  
  Callback fired on every scroll event, receives scroll data.

- 🛑 **`onEnd`** _(() => void, optional)_  
  Callback fired when scrolling ends.

- ⚙️ **`config`** _(object, required)_  
  Axis-specific scroll configuration:

  - 🧭 `scrollPosition` — Property for scroll position (`scrollTop` or `scrollLeft`).

  - 📏 `client` — Visible container size (`clientHeight` or `clientWidth`).

  - 📐 `scroll` — Total scrollable size (`scrollHeight` or `scrollWidth`).

  - 🔁 `direction` — Function to calculate scroll direction: `(current: number, previous: number) => DIRECTION`.

  - 🌊 `overflow` — Relevant CSS overflow property (`overflowY` or `overflowX`).

- 🔍 **`intersectionObserverInit`** _(IntersectionObserverInit, optional)_  
  Configuration for IntersectionObserver to detect waypoints inside the scroll container.

---

#### `ScrollWaypoint`

`ScrollWaypoint` is a child component of `ScrollObserver` that tracks visibility changes of its content within the scroll container.

It uses an `IntersectionObserver` (provided via context) to detect when the waypoint enters or leaves the visible viewport inside the scroll container. It triggers the `status` callback accordingly with detailed information.

```tsx
<ScrollObserver name="myScrollContainer">
  <ScrollObserver.ScrollWaypoint
    status={({ visibilityStatus, observerEntry }) => {
      console.log(`Waypoint is now: ${visibilityStatus}`);
    }}
  >
    <div>Waypoint content here</div>
  </ScrollObserver.ScrollWaypoint>
</ScrollObserver>
```

- 🔄 **`status`** _(optional)_  
  A callback function called whenever the waypoint's visibility changes. It receives an object containing:

  - `visibilityStatus`:
    - `'enter'` — the waypoint element is now visible in the viewport
    - `'leave'` — the waypoint element is no longer visible
  - `observerEntry`: The full [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object providing detailed info about the intersection event.

- 📦 **`children`** _(required)_  
  React nodes/elements that are rendered inside the waypoint container.

---

## 🎯 `useScroll` Hook

`useScroll` is a custom React hook that subscribes to scroll state updates for a named scroll container managed by the `scrollService`.

It provides real-time information about the scroll position, scroll direction, scroll progress, and client container height, and also exposes a convenient method to programmatically scroll the container.

### 🔧 Returned State & Methods

- **`scrollPosition`** `(number)`  
  The current scroll offset (in pixels) along the vertical axis.

- **`clientHeight`** `(number | undefined)`  
  The visible height of the scroll container.

- **`direction`** `(DIRECTION)`  
  The current scroll direction. Possible values:

  - `DIRECTION.UP`
  - `DIRECTION.DOWN`

- **`scrollProgress`** `(number)`  
  Scroll progress as a value between 0 and 1 indicating how far the user has scrolled relative to the total scrollable content.

- **`scrollTo(position: number, behavior?: ScrollToOptions["behavior"])`** `(function)`  
  Programmatically scrolls the container to a specific vertical position.
  - `position`: target scroll offset in pixels.
  - `behavior` (optional): scroll behavior, e.g. `"auto"` or `"smooth"`. Defaults to `"smooth"`.

### ⚙️ How It Works

- Subscribes to scroll events scoped to the container identified by `name`.
- Updates internal state with the latest scroll information when events occur.
- Returns current scroll state and the `scrollTo` method for smooth programmatic scrolling

### 📖 Example Usage

```tsx
import { useScroll, DIRECTION } from "your-scroll-library";

function MyComponent() {
  const { scrollPosition, direction, scrollProgress, scrollTo } =
    useScroll("myScrollContainer");

  return (
    <div>
      <p>Scroll position: {scrollPosition}px</p>
      <p>Scroll direction: {direction}</p>
      <p>Scroll progress: {(scrollProgress * 100).toFixed(2)}%</p>
      <button onClick={() => scrollTo(0)}>Scroll to top</button>
    </div>
  );
}
```
