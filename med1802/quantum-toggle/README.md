# 🔄 Quantum Toggle

A lightweight React library for managing toggle/visibility state in your applications. Built on top of `@med1802/quantum-ui-react`, Quantum Toggle provides a simple, type-safe API for controlling on/off states with automatic lifecycle management.

Perfect for managing modals, drawers, tooltips, accordions, dropdowns, and any component that needs toggle functionality. Each toggle instance is automatically created when you use it in a component and cleaned up when the component unmounts.

---

## 📦 Installation

```bash
npm install @med1802/quantum-toggle
```

---

## ⚡ Quick Start

```ts
// toggleClient.ts
import { createToggleClient } from "@med1802/quantum-toggle";

const toggleClient = createToggleClient();

export { toggleClient };
```
