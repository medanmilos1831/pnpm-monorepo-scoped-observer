# React Scroll Observer

A lightweight, event-driven React utility for tracking scroll position, direction, progress, and waypoints in any scroll container — built with TypeScript and powered by custom event management.

## Features

- Track scroll position, direction (up/down/left/right), and normalized scroll progress (0 to 100%)

- Supports vertical (y) and horizontal (x) scrolling

- Event-driven architecture with subscription-based updates

- Supports throttled scroll events for performance

- Waypoint detection via IntersectionObserver integrated as ScrollWaypoint

- Programmatic smooth scrolling support via exposed API

- Full TypeScript support with typed contexts and hooks

- Modular: includes ScrollProvider, ScrollContainer, ScrollObserver components, and useScroll hook

## Installation

```bash
npm i @scoped-observer/react-scroll
```

## API

<ScrollProvider scroll={scrollObserverInstance}>

Provides global scroll state management. Should wrap your app or scrollable parts.

```
import { ScrollProvider, ScrollObserver } from "@scoped-observer/react-scroll";

const scrollObserver = new ScrollObserver();

<ScrollProvider scroll={scrollObserver}>
  <App />
</ScrollProvider>;
```

### `<ScrollContainer>`

A scrollable container component that tracks scroll events and supports waypoints.

#### Props

- **`name`** `(string, required)`  
  Unique identifier for the scroll container.

- **`axis`** `('x' | 'y', default: 'y')`  
  The scroll axis to observe — horizontal (`x`) or vertical (`y`).

- **`throttle`** `(number, optional)`  
  Throttle delay in milliseconds to optimize scroll event frequency and improve performance.

- **`onScroll`** `(function, optional)`  
  Callback function triggered on every scroll event. Receives the current scroll state.

- **`onStart`** `(function, optional)`  
  Callback fired when the scroll reaches the start position (scroll offset 0).

- **`onEnd`** `(function, optional)`  
  Callback fired when the scroll reaches the end of the content.

- **`intersectionObserverInit`** `(IntersectionObserverInit, optional)`  
  Configuration options for the IntersectionObserver used to detect waypoints inside the scroll container.

- **`children`** `(React.ReactNode, required)`  
  The content rendered inside the scroll container.

### `ScrollContainer.ScrollWaypoint`

A child component used within a `ScrollContainer` to detect when its content enters or leaves the visible scroll area using the `IntersectionObserver` API.

#### Props

- **`status`** `(function, optional)`  
  Callback function called whenever the waypoint’s visibility changes.  
  Receives an object containing:

  - `visibilityStatus`: a string with value `'enter'` (when the element becomes visible) or `'leave'` (when it leaves visibility).
  - `observerEntry`: the full [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object with detailed intersection information.

- **`children`** `(React.ReactNode, required)`  
  The content rendered inside the waypoint element.

#### Usage Example

```tsx
<ScrollContainer name="myScrollContainer">
  <ScrollContainer.ScrollWaypoint
    status={({ visibilityStatus, observerEntry }) => {
      console.log(`Waypoint is now: ${visibilityStatus}`);
    }}
  >
    <div>Waypoint content here</div>
  </ScrollContainer.ScrollWaypoint>
</ScrollContainer>
```

### `useScroll()`

A custom React hook that subscribes to scroll state updates.

#### Returns

An object containing the current scroll state and utility methods:

- `scrollPosition` `(number)` — The current scroll offset in pixels.

- `clientHeight` `(number | undefined)` — The visible height of the scroll container.

- `direction` `(string)` — The current scroll direction, e.g. `'up'`, `'down'`, `'left'`, or `'right'`.

- `scrollProgress` `(number)` — A normalized value between 0 and 1 indicating the scroll progress relative to total scrollable content.

- `scrollTo(position: number, behavior?: ScrollToOptions['behavior'])` `(function)` — Function to programmatically scroll the container to a specific position.
  - `position`: The target scroll offset in pixels.
  - `behavior` (optional): Scroll behavior like `'auto'` or `'smooth'` (defaults to `'smooth'`).

#### Usage Example

```tsx
function MyComponent() {
  const { scrollPosition, direction, scrollProgress, scrollTo } = useScroll();

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

## Example

```

const scrollObserver = new ScrollObserver();

const ScrollExample = () => {
  return (
    <ScrollProvider scroll={scrollObserver}>
      <ScrollContainer
        name="mainScroll"
        axis="y"
        throttle={100}
        onStart={() => console.log('Scroll started')}
        onEnd={() => console.log('Scroll ended')}
        onScroll={(state) => console.log('Scrolling', state.scrollPosition)}
        intersectionObserverInit={{ rootMargin: '0px', threshold: 0.1 }}
        style={{ height: 300, border: '1px solid black' }} // optional styling >
          <ScrollableContent />
      </ScrollContainer>
    </ScrollProvider>
  );
};

const ScrollableContent = () => {
  const { scrollPosition, direction, scrollProgress, scrollTo } = useScroll();

  return (
    <div style={{ height: 1000, padding: 20 }}>
    <h2>Scroll Info</h2>
    <p>Position: {scrollPosition}px</p>
    <p>Direction: {direction}</p>
    <p>Progress: {(scrollProgress \* 100).toFixed(2)}%</p>
    <button onClick={() => scrollTo(0)}>Scroll to Top</button>

          <ScrollContainer.ScrollWaypoint
            status={({ visibilityStatus }) => {
              console.log('Waypoint is', visibilityStatus);
            }}
          >
            <div style={{ marginTop: 800, padding: 20, backgroundColor: '#eee' }}>
              Scroll Waypoint
            </div>
          </ScrollContainer.ScrollWaypoint>
        </div>

  );
};

export default ScrollExample;
```
