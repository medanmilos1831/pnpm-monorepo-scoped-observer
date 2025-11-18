# 🔄 Quantum UI

Quantum UI provides a structured approach to managing application state, modules, and models with built-in reactivity, event system, and lifecycle management.

---

## 🚀 Features

- ✅ **Module-based architecture** — Organize your application into reusable modules
- ✅ **Model management** — Create and manage multiple model instances per module
- ✅ **State management** — Built-in state manager with mutations and getters
- ✅ **Event system** — Integrated event dispatching and subscriptions via scoped observer
- ✅ **Message broker** — Built-in message broker with interceptors for publish/subscribe
- ✅ **Lifecycle hooks** — Manage model lifecycle events
- ✅ **TypeScript support** — Fully typed API for better developer experience

---

## 📦 Installation

```bash
npm install @med1802/quantum-ui
```

**Dependencies (automatically installed):**

- `@med1802/scoped-observer`
- `@med1802/scoped-observer-message-broker`

---

## ⚙️ Quick Start

### 1. Create a Module

First, define your module configuration with state, mutations, getters, and model client:

```typescript
import { framework } from "@med1802/quantum-ui";

export enum INITIAL_STATE {
  ON = "on",
  OFF = "off",
}

export type initialStateType = `${INITIAL_STATE}`;

export type ToggleProps = {
  id: string;
  initState: initialStateType;
};

const toggleModule = framework.createModule({
  name: "toggle",
  model: (props: ToggleProps) => {
    return {
      id: props.id,
      state: {
        visibility: props.initState,
      },
      mutations(state) {
        return {
          setVisibility: (visibility: initialStateType) => {
            state.visibility = visibility;
          },
        };
      },
      getters(state) {
        return {
          getVisibility: () => state.visibility,
        };
      },
    };
  },
  modelClient: (model, broker) => {
    const commands = {
      onOpen: () => {
        model.mutations.setVisibility("on");
        broker.publish({
          eventName: "onChange",
          payload: "on",
        });
      },
      onClose: () => {
        model.mutations.setVisibility("off");
        broker.publish({
          eventName: "onChange",
          payload: "off",
        });
      },
      onToggle: () => {
        const newState = model.getters.getVisibility() === "on" ? "off" : "on";
        model.mutations.setVisibility(newState);
        broker.publish({
          eventName: "onChange",
          payload: newState,
        });
      },
    };
    const subscribers = {
      onChange: (callback: (payload: "on" | "off") => void) => {
        return broker.subscribe({
          eventName: "onChange",
          callback,
        });
      },
    };
    return {
      commands,
      subscribers,
      getVisibility: model.getters.getVisibility,
    };
  },
});
```

### 2. Create Model Instances

```typescript
// Create a new toggle model
toggleModule.createModel({ id: "my-toggle", initState: INITIAL_STATE.OFF });

// Check if model exists
if (toggleModule.hasModel("my-toggle")) {
  // Get the model instance
  const toggle = toggleModule.getModelById("my-toggle");

  // Use commands
  toggle.commands.onOpen();
  toggle.commands.onToggle();

  // Access state
  console.log(toggle.getVisibility()); // "on" or "off"
}
```

### 3. Subscribe to Events

```typescript
// Subscribe to model-specific events via broker
const toggle = toggleModule.getModelById("my-toggle");

const unsubscribe = toggle.subscribers.onChange((payload) => {
  console.log("Visibility changed:", payload); // "on" or "off"
});

// Subscribe to module-level events
const unsubscribeModule = toggleModule.subscribe(
  "onModelLoad-my-toggle",
  (payload) => {
    console.log("Model loaded:", payload);
  }
);

// Clean up
unsubscribe();
unsubscribeModule();
```

### 4. Manage Model Lifecycle

```typescript
// Trigger lifecycle event
toggleModule.lifeCycle("my-toggle");

// Remove model when done
toggleModule.removeModel("my-toggle");
```

## 📚 Framework API Reference

### `framework.createModule<S, M, G, A>(config)`

Creates a new module with the specified configuration.

**Parameters:**

- `config.name` (string) - Unique module name
- `config.model` (function) - Model factory function that returns state manager config with `id`, `state`, `mutations`, and `getters`
- `config.modelClient` (function) - Factory function that creates the model API client. Receives `model` (with state, mutations, getters) and `broker` (message broker instance) as parameters

**Returns:** `IModuleClientAPI<A>`

**Type Parameters:**

- `S` - State type
- `M` - Mutations type
- `G` - Getters type
- `A` - Model API client type

### Module API

#### `createModel<T>(props: T)`

Creates a new model instance. The props must include an `id` field.

#### `removeModel(id: string)`

Removes a model instance by ID.

#### `getModelById(id: string): A`

Retrieves a model instance by ID.

#### `hasModel(id: string): boolean`

Checks if a model with the given ID exists.

#### `subscribe(eventName: string, callback: (payload: any) => void): () => void`

Subscribes to module-level events. Returns an unsubscribe function.

#### `lifeCycle(id: string)`

Triggers a lifecycle event for a specific model.

---

## 🏗️ Architecture

Quantum UI follows a hierarchical architecture:

```
App
└── Modules (framework.createModule)
    └── Models (module.createModel)
        └── Entity (state, mutations, getters)
```

- **App**: Global application state manager that tracks all modules
- **Module**: Container for related models with shared configuration
- **Model**: Individual instance with its own state and API
- **Entity**: State manager with mutations and getters

---

## 💡 Best Practices

1. **Module Naming**: Use descriptive, unique names for modules
2. **Model IDs**: Always use unique IDs for model instances
3. **Event Cleanup**: Always unsubscribe from events to prevent memory leaks
4. **Type Safety**: Leverage TypeScript generics for better type inference
5. **Lifecycle Management**: Use `lifeCycle()` to notify when models are ready

---

## 🔗 Related Packages

- [`@med1802/scoped-observer`](https://www.npmjs.com/package/@med1802/scoped-observer) - Event system used by Quantum UI
- [`@med1802/scoped-observer-message-broker`](https://www.npmjs.com/package/@med1802/scoped-observer-message-broker) - Message broker with interceptors used by Quantum UI

---

## 📝 License

MIT
