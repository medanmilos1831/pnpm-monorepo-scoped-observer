# 🔄 Quantum UI React

React hooks integration layer for `@med1802/quantum-ui` modules. It wires
lifecycle hooks and `useSyncExternalStore` so that React components can subscribe
to `quantum-ui` models without writing boilerplate.

## ✨ Features

- `useModelSelector(id)` – subscribe to a specific model instance
- `useCreateModel(id, props)` – create/remove models inside React effects
- Full TypeScript support with generics for your module API
- Lightweight wrapper around existing `quantum-ui` modules

## 🚀 Usage

```tsx
import { framework } from "@med1802/quantum-ui";
import { quantumUiReact } from "@med1802/quantum-ui-react";

const toggleModule = framework.createModule({
  /* ... */
});
const toggleReact = quantumUiReact(toggleModule);

const Toggle = () => {
  toggleReact.useCreateModel("toggle", { id: "toggle", initState: "open" });
  const model = toggleReact.useModelSelector("toggle");

  if (!model) return null;
  return (
    <div>
      <p>Status: {model.getters.getStatus()}</p>
      <button onClick={model.commands.onToggle}>Toggle</button>
    </div>
  );
};
```
