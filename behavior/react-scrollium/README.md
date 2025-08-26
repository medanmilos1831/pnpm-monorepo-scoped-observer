# react-scrollium

Lightweight, typed scroll management for React. Clean hook-based API to read and control scroll, subscribe to events, and compute progress with built‑in throttling and scroll‑stop detection.

## Features

- **Live state**: position, direction, top/bottom, isScrolling
- **Progress**: 0–100% based on scrollable height
- **Imperative control**: `scrollTop` with behavior
- **Performance**: throttled handler + scroll-stop detection
- **Composable**: hook-based API with event filtering
- **TypeScript-first**

## Installation

Install as a library in your React app:

```bash
npm i react-scrollium @scoped-observer/react-store
```

Peer dependencies: `react@^18` and `@scoped-observer/react-store`.

## Quick start

```tsx
import { createScroll, SCROLL_EVENTS } from "react-scrollium";

const { ScrollElement, useScroll, useWatch } = createScroll({
  // global defaults (optional)
  throttle: 16,
  stopDelay: 250,
  behaviour: "smooth",
});

export function App() {
  return (
    <div style={{ height: 300 }}>
      <ScrollElement name="main">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} style={{ padding: 8 }}>
            Item {i + 1}
          </div>
        ))}
      </ScrollElement>
      <Panel />
    </div>
  );
}

function Panel() {
  const api = useScroll("main", {
    // per-instance overrides (optional)
    // scrollPosition: 0,
    // behaviour: 'instant',
    // throttle: 16,
    // stopDelay: 250,
  });

  const state = useWatch(
    (s) => ({
      position: s.scrollPosition,
      progress: s.progress,
      direction: s.direction,
      isTop: s.isTop,
      isBottom: s.isBottom,
      isScrolling: s.isScrolling,
    }),
    "main",
    [SCROLL_EVENTS.ON_SCROLL, SCROLL_EVENTS.ON_SCROLL_STOP]
  );

  return (
    <div>
      <div>Position: {state.position}</div>
      <div>Progress: {state.progress}%</div>
      <div>Direction: {state.direction}</div>
      <button onClick={() => api.scrollTop({ top: 0 })}>Scroll to top</button>
    </div>
  );
}
```

## API

### createScroll(config?)

Returns:

- `ScrollElement`: React wrapper that owns the scroll container.
- `useScroll(name, config?)`: returns an API bound to `name`.
- `useWatch(selector, name, events)`: subscribes to selected state for given events.

### <ScrollElement />

- Props: `{ name: string }`
- Wrap your scrollable content. Use the same `name` in hooks.

### useScroll(name, config?)

Config fields:

- `scrollPosition?: number`
- `behaviour?: ScrollBehavior` ('smooth' | 'auto' | 'instant')
- `throttle?: number` (ms, default 16)
- `stopDelay?: number` (ms, default 250)

Returns API:

- `getPosition(): number`
- `getDirection(): 'up' | 'down' | 'none'`
- `isTop(): boolean`
- `isBottom(): boolean`
- `isScrolling(): boolean`
- `elementHeight(): number`
- `scrollableHeight(): number`
- `scrollHeight(): number`
- `getProgress(): number` (0–100)
- `scrollTop(options?: ScrollToOptions): void`

### useWatch(selector, name, events)

- `selector(state) => any`
- `name: string`
- `events: SCROLL_EVENTS[]` — `ON_SCROLL`, `ON_SCROLL_STOP`, `ON_TOP`, `ON_BOTTOM`

## Tips & patterns

- **Multiple instances**: use different `name` values.
- **Jump to position**: `useScroll('name').scrollTop({ top: 0 })`.
- **Performance**: increase `throttle` for heavy UIs; tune `stopDelay`.

## Notes

- Internal state is powered by `@scoped-observer/react-store`.
- A simple `Fallback` is rendered if `<ScrollElement>` is not ready for a given `name`.
