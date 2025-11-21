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

// Create a scoped observer (typically once per app)
const scopedObserver = createScopedObserver();

// Create a message broker
const messageBroker = createMessageBroker(scopedObserver);

// Register an interceptor to transform payload on publish
messageBroker.interceptor({
  eventName: "increment",
  onPublish: ({ eventName, payload }) => {
    return {
      eventName,
      payload: {
        incrementBy: payload,
        timestamp: Date.now(),
        multiplier: 2,
        random: Math.random(),
      },
    };
  },
});

// Subscribe to events
messageBroker.subscribe({
  eventName: "increment",
  callback: (payload) => {
    console.log(JSON.stringify(payload, null, 2));
    // Output:
    // {
    //   "incrementBy": 1,
    //   "timestamp": 1234567890,
    //   "multiplier": 2,
    //   "random": 0.123456
    // }
  },
});

// Publish an event (payload will be transformed by interceptor)
messageBroker.publish({
  eventName: "increment",
  payload: 1,
});
```

## API

### `createMessageBroker(observer)`

- `observer`: Instance returned by `createScopedObserver`.
- Returns an object with:
  - `publish({ scope?, eventName, payload })` - Publish an event (scope is optional)
  - `subscribe({ scope?, eventName, callback })` - Subscribe to an event (scope is optional)
  - `interceptor({ eventName, onPublish?, onSubscribe? })` - Register interceptors for an event

### Interceptors

Interceptors allow you to transform or block events before they're published or subscribed:

```ts
messageBroker.interceptor({
  eventName: "increment",
  onPublish: ({ eventName, payload }) => {
    // Transform payload before publishing
    return {
      eventName,
      payload: {
        ...payload,
        timestamp: Date.now(),
      },
    };
    // Or block by returning null/false
    // return null;
  },
  onSubscribe: ({ eventName }) => {
    // Rewrite event name if needed
    return { eventName: `transformed:${eventName}` };
    // Or block subscription by returning null/false
    // return null;
  },
});
```

**Interceptor behavior:**

- `onPublish` receives `{ eventName, payload }` and can:
  - return `{ eventName, payload }` to continue (optionally mutated)
  - return `null` or `false` to abort publishing
- `onSubscribe` receives `{ eventName }` and can:
  - return `{ eventName }` to continue (optionally rewritten)
  - return `null` or `false` to abort subscription

## License

MIT © med1802
