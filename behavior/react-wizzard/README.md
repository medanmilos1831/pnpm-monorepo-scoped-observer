# react-wizzard

**react-wizzard** is a lightweight React package designed to manage multi-step flows (wizards) with predictable state transitions — powered by a finite state machine under the hood.

It allows you to define steps, navigate forward/backward, and track the active step in a clean, testable, and decoupled way, making it ideal for form wizards, guided tours, onboarding flows, or any multi-step UI pattern.

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

## 🎮 Demo

Try out **react-wizzard** in action with our interactive demo:

**[🚀 Live Demo on StackBlitz](https://stackblitz.com/~/github.com/medanmilos1831/react-wizzard-demo?file=src/homepage/HomePage.tsx)**

The demo showcases a complete multi-step wizard implementation with navigation controls, step validation, and real-time state management.

## 🚀 Quick Start

Here's a basic example showing how to create a wizard with multiple steps and navigate between them:

```tsx
import React from "react";
import { createWizzard } from "react-wizzard";

const { useWizzard, WizzardHandler } = createWizzard({
  keys: ["myWizard"] as const,
});

const StepOne = () => <div>Step One</div>;
const StepTwo = () => <div>Step Two</div>;
const StepThree = () => <div>Step Three</div>;

const WizardBody = () => {
  const wizard = useWizzard("myWizard", {
    activeStep: "one",
    steps: {
      one: { element: StepOne },
      two: { element: StepTwo },
      three: { element: StepThree },
    },
  });

  return (
    <div>
      <h2>Current Step: {wizard.currentStep}</h2>
      <p>
        Step {wizard.currentStepIndex + 1} of {wizard.steps.length}
      </p>
    </div>
  );
};

const WizardFooter = () => {
  const wizard = useWizzard("myWizard", {
    activeStep: "one",
    steps: {
      one: { element: StepOne },
      two: { element: StepTwo },
      three: { element: StepThree },
    },
  });

  return (
    <>
      <button onClick={() => wizard.prevStep()}>Previous</button>
      <button onClick={() => wizard.nextStep()}>Next</button>
    </>
  );
};

const WizardContent = () => {
  return (
    <WizzardHandler name="myWizard">
      {({ currentStep, steps, Element, isFirst, isLast }) => (
        <div>
          <WizardBody />
          <Element />
          <WizardFooter />
        </div>
      )}
    </WizzardHandler>
  );
};

export const App = () => <WizardContent />;
```

## 📚 API Reference

### `createWizzard(config)`

Creates a wizard manager with predefined keys for type-safe wizard instances.

**Parameters:**

- `config.keys: readonly string[]` - Array of valid wizard names for type safety

**Returns:**
An object with methods to create and manage wizard instances.

### Methods

#### `useWizzard(name, config)`

Creates a wizard instance for the specified name. Each call creates a new wizard instance if it doesn't exist.

**Parameters:**

- `name: string` - The wizard name (must be one of the defined keys)
- `config: WizzardConfig` - Configuration object with initial step and step definitions

**Returns:**

```tsx
{
  currentStep: string;           // Current step name
  currentStepIndex: number;      // Current step index (0-based)
  steps: string[];               // Array of step names
  stepsConfig: Record<string, { element: Component }>; // Step configurations
  nextStepName: string;          // Next step name
  prevStepName: string;          // Previous step name
  isFirst: boolean;              // Whether current step is the first
  isLast: boolean;               // Whether current step is the last
  infinite: boolean;             // Whether wizard loops infinitely
  nextStep(): void;              // Function to go to next step
  prevStep(): void;              // Function to go to previous step
  goToStep(step: string): void;  // Function to go to specific step
  reset(): void;                 // Function to reset to initial step
}
```

#### `WizzardHandler`

Render prop component that provides wizard state and navigation functions.

**Props:**

```tsx
{
  name: string; // Wizard name
  children: (props: WizzardHandlerChildrenProps) => JSX.Element; // Render function
}
```

**Children Props:**

```tsx
{
  name: string;                  // Wizard name
  steps: string[];               // Array of step names
  stepsConfig: Record<string, { element: Component }>; // Step configurations
  currentStep: string;           // Current step name
  activeStep: string;            // Active step name
  nextStepName: string;          // Next step name
  prevStepName: string;          // Previous step name
  isFirst: boolean;              // Whether current step is the first
  isLast: boolean;               // Whether current step is the last
  currentStepIndex: number;      // Current step index (0-based)
  infinite: boolean;             // Whether wizard loops infinitely
  Element: Component;            // Current step component
}
```

#### `useWatch(name, callback)`

Hook that watches wizard state and returns computed values.

**Parameters:**

- `name: string` - The wizard name to watch
- `callback: (wizardData: WizzardData) => C` - Function to compute derived values

**Returns:**
Only the result of the callback function.

#### `getItem(name)`

Gets a wizard instance by name for direct access.

**Parameters:**

- `name: string` - The wizard name to retrieve

**Returns:**
The wizard instance or throws error if not found.

## 🔧 Advanced Usage

### Custom Step Validation

You can add validation logic to your steps:

```tsx
const WizardBody = () => {
  const { useWizzard } = createWizzard({
    keys: ["myWizard"] as const,
  });

  const wizard = useWizzard("myWizard", {
    activeStep: "one",
    steps: {
      one: { element: StepOne },
      two: { element: StepTwo },
      three: { element: StepThree },
    },
  });

  const canProceed = () => {
    // Add your validation logic here
    return true;
  };

  const handleNext = () => {
    if (canProceed()) {
      wizard.nextStep();
    }
  };

  return (
    <div>
      {/* Step content */}
      <button onClick={handleNext} disabled={wizard.isLast}>
        Next
      </button>
    </div>
  );
};
```

### Dynamic Step Navigation

Navigate to specific steps programmatically:

```tsx
const NavigationMenu = () => {
  const { useWizzard } = createWizzard({
    keys: ["myWizard"] as const,
  });

  const wizard = useWizzard("myWizard", {
    activeStep: "one",
    steps: {
      one: { element: StepOne },
      two: { element: StepTwo },
      three: { element: StepThree },
    },
  });

  return (
    <nav>
      {wizard.steps.map((stepName) => (
        <button
          key={stepName}
          onClick={() => wizard.goToStep(stepName)}
          className={wizard.currentStep === stepName ? "active" : ""}
        >
          {stepName}
        </button>
      ))}
    </nav>
  );
};
```

### Multiple Wizards

Manage multiple independent wizards in the same application:

```tsx
const { WizzardHandler } = createWizzard({
  keys: ["userWizard", "settingsWizard"] as const,
});

const App = () => (
  <>
    <WizzardHandler name="userWizard">
      {({ Element, currentStep }) => (
        <div>
          <h2>User Wizard - {currentStep}</h2>
          <Element />
        </div>
      )}
    </WizzardHandler>

    <WizzardHandler name="settingsWizard">
      {({ Element, currentStep }) => (
        <div>
          <h2>Settings Wizard - {currentStep}</h2>
          <Element />
        </div>
      )}
    </WizzardHandler>
  </>
);
```

### Watching Wizard State

Use the `useWatch` hook to react to wizard state changes:

```tsx
const WizardProgress = () => {
  const { useWatch } = createWizzard({
    keys: ["myWizard"] as const,
  });

  const { progress, isLastStep } = useWatch("myWizard", (wizardData) => ({
    progress: Math.round(
      (wizardData.currentStepIndex / wizardData.steps.length) * 100
    ),
    isLastStep: wizardData.isLast,
  }));

  return (
    <div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span>{progress}% Complete</span>
      {isLastStep && <span>Final Step!</span>}
    </div>
  );
};
```

### Infinite Loop Wizards

Create wizards that loop infinitely:

```tsx
const { useWizzard } = createWizzard({
  keys: ["myWizard"] as const,
});

const infiniteWizard = useWizzard("myWizard", {
  activeStep: "one",
  infinite: true, // Enable infinite looping
  steps: {
    one: { element: StepOne },
    two: { element: StepTwo },
    three: { element: StepThree },
  },
});

// Now nextStep() on the last step will go to the first step
// and prevStep() on the first step will go to the last step
```

## 🎯 Features

- **🚀 Lightweight** - Minimal bundle size with no unnecessary dependencies
- **🔒 Type Safe** - Full TypeScript support with comprehensive type definitions
- **🎮 Flexible** - Support for any number of steps and custom navigation logic
- **🧪 Testable** - Clean separation of concerns makes testing straightforward
- **♻️ Reusable** - Multiple wizard instances can coexist in the same application
- **⚡ Performant** - Built on efficient state management with minimal re-renders
- **🔄 Infinite Loops** - Optional infinite looping for circular workflows
- **👀 State Watching** - Reactive state watching with computed values
- **🎯 Direct Access** - Direct instance access for external control

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](https://github.com/medanmilos1831/scoped-observer/blob/main/CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/medanmilos1831/scoped-observer/blob/main/LICENSE) file for details.

## 🔗 Related Packages

- [@scoped-observer/core](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/core) - Core event bus system
- [@scoped-observer/react-state-machine](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/react-state-machine) - React state machine implementation
- [@scoped-observer/react](https://github.com/medanmilos1831/scoped-observer/tree/main/scoped-observer/react) - React integration utilities
