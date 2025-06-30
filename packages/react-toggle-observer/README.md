# Scoped observer toggle manager react

A lightweight, event-driven toggle service for React applications.  
Designed for full flexibility, deep encapsulation, and zero direct state access — ideal for managing modals, drawers, or any toggleable UI component.

## ✨ Features

- 🔌 **Plug-and-play**: Drop it into any component.
- 🎯 **Encapsulated State**: Internal manager with no direct external mutations.
- 📡 **Event-based**: Toggle any UI component using scoped events.
- 🚫 **No Redux or context**: Simple by design, no global state libraries.
- 🧩 **Composable**: Works with any UI library (Ant Design, MUI, custom).

---

## 🚀 Installation

```bash
npm i @scoped-observer/react-toggle-observer
```

## 🧠 Core Concepts

This service uses a centralized, encapsulated manager and scoped events to update and toggle UI state.

- Internally Used Tools scoped-observer for event dispatch and subscriptions

- React's useState and useEffect

## 📦 Usage

Wrap your component with ToggleController

```
import {
  ToggleController,
  toggleHandler,
} from 'toggle-event-service';

const HomePage = () => {
  return (
    <>
        <ToggleController name="userModal">
            {({ status, payload, toggle }) => {
                return (
                    <Modal
                    open={status}
                    onCancel={() => {
                        toggle();
                    }}
                    >
                        <ModalComponent />
                    </Modal>
                );
            }}
        </ToggleController>
      </>
  );
};
```

Trigger externally (optional)

```
toggleHandler({ name: 'userModal' });
```

or

```
toggleHandler({ name: 'userModal', payload: { userId: 42 } });
```
