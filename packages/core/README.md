# 🔄 Scoped Observer (Event Manager)

A lightweight, modular, and dependency-free **event system** for frontend applications. Designed to enable scoped event dispatching and subscriptions, with support for **interceptors**, **logging**, and **nested event structures** — all built on top of the native `EventTarget` API.

---

## 🚀 Features

- ✅ **Scoped architecture** — Organize events hierarchically (e.g. `app:dashboard:user`)
- ✅ **Interceptor support** — Intercept and transform event payloads
- ✅ **Zero dependencies** — Uses only native JavaScript APIs
- ✅ **Factory-driven** — Easily create and reuse scoped event modules
- ✅ **Dev-friendly logging** — Enable scope-level logging for debug insights

---

## 📦 Installation

`npm i @scoped-observer/core`

---

## ⚙️ Setup

Use the factory function createScopedObserver() to initialize your event system with a scoped structure:

```ts
const scopedObserver = createScopedObserver([
  {
    scope: "global",
    subScopes: [
      {
        scope: "company",
        subScopes: [{ scope: "user" }],
        log: true,
      },
      {
        scope: "city",
      },
    ],
  },
]);
```

Each object in the array defines a scope. Nested subScopes enable a hierarchical structure.
Use log: true to enable debug logging for any scope.

You can now refer to fully qualified scopes like:

`global:company:user`

`global:city`

## 📤 Dispatching an Event

```
scopedObserver.dispatch({
  scope: 'global:company:user',
  eventName: 'userUpdated',
  payload: { id: 1, name: 'John' },
});
```

## 📥 Subscribing to an Event

```
const unsubscribe = scopedObserver.subscribe({
  scope: 'global:company:user',
  eventName: 'userUpdated',
  callback: ({ payload }) => {
    console.log('User updated:', payload);
  },
});
```

Call unsubscribe() to stop listening.

## 🛡️ Using Interceptors

Interceptors allow you to modify event payloads before they reach subscribers:

```
scopedObserver.eventInterceptor({
  scope: 'global:company:user',
  eventName: 'userUpdated',
  callback: (data) => {
    // Modify the payload
    return { ...data, intercepted: true };
  },
});
```

## 🪵 Debug Logging

To enable logging for a scope, use log: true in the config:

```
{
  scope: 'company',
  log: true,
}
```

Console logs will display:

- Event name
- Scope
- Payload
- Action type (dispatch, subscribe, intercept)
