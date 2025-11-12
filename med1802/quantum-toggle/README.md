# 🔄 Quantum UI

A powerful, modular state management framework for React applications. Built on top of `@med1802/scoped-observer`, Quantum UI provides a structured approach to managing application state, modules, and models with built-in reactivity and lifecycle management.

---

## 🚀 Features

- ✅ **Module-based architecture** — Organize your application into reusable modules
- ✅ **Model management** — Create and manage multiple model instances per module
- ✅ **State management** — Built-in state manager with mutations and getters
- ✅ **Event system** — Integrated event dispatching and subscriptions
- ✅ **Lifecycle hooks** — Manage model lifecycle events
- ✅ **TypeScript support** — Fully typed API for better developer experience

---

## 📦 Installation

```bash
npm install @med1802/quantum-ui
```

**Peer Dependencies:**

- `react` ^18.0.0
- `@med1802/scoped-observer` ^1.0.0

---

## ⚙️ Quick Start

### 1. Create a Module

First, define your module configuration:

```typescript
import { framework } from "@med1802/quantum-ui";

// Define your entity state manager
const userEntity = (props: { id: string; name: string }) => ({
  id: props.id,
  state: {
    name: props.name,
    email: "",
    isActive: false,
  },
  mutations(state) {
    return {
      setName(name: string) {
        state.name = name;
      },
      setEmail(email: string) {
        state.email = email;
      },
      toggleActive() {
        state.isActive = !state.isActive;
      },
    };
  },
  getters(state) {
    return {
      getFullInfo: () => `${state.name} (${state.email})`,
      isActive: () => state.isActive,
    };
  },
});

// Create model API client
const userModelApi = (entity, dispatch, subscribe) => {
  return {
    // Expose entity methods
    ...entity,

    // Custom methods
    activate() {
      entity.mutations.toggleActive();
      dispatch("userActivated", { id: entity.state.id });
    },

    subscribeToChanges(callback) {
      return subscribe("userChanged", callback);
    },
  };
};

// Create the module
const userModule = framework.createModule({
  name: "user",
  entity: userEntity,
  modelApiClient: userModelApi,
});
```

### 2. Create Model Instances

```typescript
// Create a new user model
userModule.createModel({ id: "user-1", name: "John Doe" });

// Check if model exists
if (userModule.hasModel("user-1")) {
  // Get the model instance
  const user = userModule.getModelById("user-1");

  // Use the model API
  user.mutations.setEmail("john@example.com");
  user.activate();

  // Access getters
  console.log(user.getters.getFullInfo());
}
```

### 3. Subscribe to Events

```typescript
// Subscribe to module-level events
const unsubscribe = userModule.subscribe("onModelLoad-user-1", (payload) => {
  console.log("Model loaded:", payload);
});

// Subscribe to model-specific events (in model API)
const user = userModule.getModelById("user-1");
const unsubscribeModel = user.subscribeToChanges((payload) => {
  console.log("User changed:", payload);
});

// Clean up
unsubscribe();
unsubscribeModel();
```

### 4. Manage Model Lifecycle

```typescript
// Trigger lifecycle event
userModule.lifeCycle("user-1");

// Remove model when done
userModule.removeModel("user-1");
```

---

## 📚 API Reference

### `framework.createModule<S, M, G, A>(config)`

Creates a new module with the specified configuration.

**Parameters:**

- `config.name` (string) - Unique module name
- `config.entity` (function) - Entity factory function that returns state manager config
- `config.modelApiClient` (function) - Factory function that creates the model API

**Returns:** `IModuleClientAPI<A>`

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

- [`@med1802/scoped-observer`](../scoped-observer) - Event system used by Quantum UI

---

## 📝 License

MIT
