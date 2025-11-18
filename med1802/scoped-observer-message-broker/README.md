# @med1802/scoped-observer-message-broker

A lightweight message broker that sits on top of `@med1802/scoped-observer`.  
It keeps the same scoped event model, but adds convenient publish/subscribe APIs
plus per-event interceptors for validating, transforming, or blocking traffic.

## Features

- **Scoped messaging** – reuse any observer created with `createScopedObserver`.
- **Per-event interceptors** – hook into publish or subscribe for a single event.
- **Type-safe payload flow** – interceptors can rewrite `eventName` and `payload`.
- **Minimal footprint** – uses `@med1802/scoped-observer` as a peer dependency (you control the version).

## Installation

```bash
npm install @med1802/scoped-observer-message-broker
```

**Note:** `@med1802/scoped-observer` is a peer dependency, so you need to install it separately.

## Quick Start

```ts
import { createScopedObserver } from "@med1802/scoped-observer";
import { createMessageBroker } from "@med1802/scoped-observer-message-broker";

// Create a scoped observer tree (typically once per app)
const scopedObserver = createScopedObserver([{ scope: "app" }]);

// Create a broker focused on a single scope
const broker = createMessageBroker(scopedObserver, "app");

// Optionally register interceptors per event
broker.interceptor({
  eventName: "user:updated",
  onPublish: ({ eventName, payload }) => {
    if (!payload?.id) {
      // block invalid publish
      return null;
    }
    return {
      eventName,
      payload: { ...payload, interceptedAt: Date.now() },
    };
  },
  onSubscribe: ({ eventName }) => {
    // rewrite event target if needed
    return { eventName };
  },
});

// Subscribe to scoped events
const unsubscribe = broker.subscribe({
  eventName: "user:updated",
  callback: (payload) => {
    console.log("Received", payload);
  },
});

// Publish scoped events
broker.publish({
  eventName: "user:updated",
  payload: { id: "42", name: "Ada" },
});
```

## API

### `createMessageBroker(observer, scope)`

- `observer`: Instance returned by `createScopedObserver`.
- `scope`: String key that resolves to a scope node within the observer tree.
- Returns an object with:
  - `publish({ eventName, payload })`
  - `subscribe({ eventName, callback })`
  - `interceptor({ eventName, onPublish?, onSubscribe? })`

### Interceptors

```ts
broker.interceptor({
  eventName: "cart:checkout",
  onPublish: ({ eventName, payload }) => {
    // mutate payload or block by returning null/false
    return { eventName, payload };
  },
  onSubscribe: ({ eventName }) => {
    // change the target event or block subscription
    return { eventName };
  },
});
```

- `onPublish` receives `{ eventName, payload }` and can:
  - return `{ eventName, payload }` to continue (optionally mutated)
  - return `null` or `false` to abort publishing
- `onSubscribe` receives `{ eventName }` and can:
  - return `{ eventName }` to continue (optionally rewritten)
  - return `null` or `false` to abort subscription

## License

MIT © med1802
