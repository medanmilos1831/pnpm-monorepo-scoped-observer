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

### Complete Example

```typescript
import { framework } from "@med1802/quantum-ui";

interface ToggleProps {
  id: string;
  initState: "open" | "close";
}
interface ToggleState {
  status: "open" | "close";
}
interface ToggleMutations {
  onOpen: () => void;
  onClose: () => void;
}
interface ToggleGetters {
  getStatus: () => "open" | "close";
}
interface ToggleApiClient {
  commands: {
    onOpen: () => void;
    onClose: () => void;
  };
}
const toggleModule = framework.createModule<
  ToggleState,
  ToggleMutations,
  ToggleGetters,
  ToggleApiClient
>({
  name: "toggle-module",
  model: (props: ToggleProps) => {
    return {
      id: props.id,
      state: {
        status: props.initState,
      },
      mutations(state) {
        return {
          onOpen: () => {
            state.status = "open";
          },
          onClose: () => {
            state.status = "close";
          },
        };
      },
      getters(state) {
        return {
          getStatus: () => state.status,
        };
      },
    };
  },
  modelClient: (model, broker) => {
    return {
      commands: {
        onOpen: () => {
          model.mutations.onOpen();
          broker.publish({
            eventName: "onChange",
            payload: model.getters.getStatus(),
          });
        },
        onClose: () => {
          model.mutations.onClose();
          broker.publish({
            eventName: "onChange",
            payload: model.getters.getStatus(),
          });
        },
      },
    };
  },
});

toggleModule.onModelMount("some-model", (payload) => {
  console.log("onModelMount", payload);
});
toggleModule.onModelUnmount("some-model", (payload) => {
  console.log("onModelUnmount", payload);
});
toggleModule.createModel({ id: "some-model", initState: "open" });
const model = toggleModule.getModelById("some-model");
console.log(model.commands);
toggleModule.removeModel("some-model");
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

#### `onModelMount(id: string, callback: (params: any) => void): () => void`

Subscribes to model mount events. Returns an unsubscribe function. The callback is triggered when a model with the specified ID is created.

#### `onModelUnmount(id: string, callback: (params: any) => void): () => void`

Subscribes to model unmount events. Returns an unsubscribe function. The callback is triggered when a model with the specified ID is removed.

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
5. **Lifecycle Management**: Use `onModelMount()` and `onModelUnmount()` to handle model lifecycle events

---

## 🔗 Related Packages

- [`@med1802/scoped-observer`](https://www.npmjs.com/package/@med1802/scoped-observer) - Event system used by Quantum UI
- [`@med1802/scoped-observer-message-broker`](https://www.npmjs.com/package/@med1802/scoped-observer-message-broker) - Message broker with interceptors used by Quantum UI

---

## 📝 License

MIT
