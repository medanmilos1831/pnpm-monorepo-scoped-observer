# react-wizzard

**react-wizzard** is a lightweight React package designed to manage multi-step flows (wizzards) with predictable state transitions — powered by a finite state machine under the hood.

It allows you to define steps, navigate forward/backward, and track the active step in a clean, testable, and decoupled way, making it ideal for form wizzards, guided tours, onboarding flows, or any multi-step UI pattern.

The package is built on a layered architecture:

- **@scoped-observer/core** — a core event bus system
- **@scoped-observer/react-state-machine** — a finite state machine built on top of the core
- **react-wizzard** — the React behavior layer providing a streamlined API for defining steps and controlling navigation

This separation of concerns ensures flexibility, extensibility, and ease of maintenance.

Use **react-wizzard** to simplify your multi-step navigation logic with a robust, minimal dependency solution that stays consistent across any UI framework or styling approach.

## 📦 Installation

You can install **react-wizzard** via npm:

```bash
npm install react-wizzard
```

> **Note:**  
> This package has peer dependencies on `react` (version 18 or above) and `@scoped-observer/react-state-machine`.  
> Make sure to install these dependencies in your project to avoid warnings or errors during installation or runtime.

```bash
npm install react @scoped-observer/react-state-machine
```

## 🚀 Usage Example

Here's a basic example showing how to create a wizard with multiple steps and navigate between them:

```tsx
import React from "react";
import {
  WizzardProvider,
  WizzardClient,
  Wizzard,
  useWizzard,
} from "react-wizzard";

const wizzardClient = new WizzardClient();

const StepOne = () => <div>Step One</div>;
const StepTwo = () => <div>Step Two</div>;
const StepThree = () => <div>Step Three</div>;

const WizardBody = () => {
  const wizard = useWizzard("myWizard");
  return (
    <div>
      <h2>Current Step: {wizard.activeStep}</h2>
    </div>
  );
};
const WizzFooter = () => {
  const wizz = useWizzardClient().getWizzardClient("myWizard");
  return (
    <>
      <button onClick={() => wizz.prevStep()}>Prev</button>
      <button onClick={() => wizz.nextStep()}>Next</button>
    </>
  );
};

export const App = () => (
  <WizzardProvider client={wizzardClient}>
    <Wizzard
      name="myWizard"
      init="one"
      steps={{
        one: { element: StepOne },
        two: { element: StepTwo },
        three: { element: StepThree },
      }}
    >
      <WizardBody />
      <WizzFooter />
    </Wizzard>
  </WizzardProvider>
);
```
