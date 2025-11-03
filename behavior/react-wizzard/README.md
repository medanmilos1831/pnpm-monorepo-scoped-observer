# React Wizzard

A React library for building multi-step wizards and workflows with a clean, type-safe API. Perfect for multi-page forms, onboarding flows, checkout processes, or any step-by-step user journey in your React app.

## 🎯 Live Demo

Check out the interactive demo to see React Wizzard in action:

**[👉 View Live Demo](https://medanmilos1831.github.io/react-wizard-demo/)**

## Features

- **Simple API** - React components and hooks that feel natural to use
- **Step validation** - Validate user input before allowing navigation
- **Middleware support** - Hook into navigation events with custom logic per step
- **Dynamic steps** - Add or remove steps at runtime
- **Flexible state** - Access wizard state from any component, even outside the wizard tree
- **TypeScript** - Fully typed for better developer experience
- **Event system** - Listen to step changes, reset, and finish events

## Installation

```bash
npm install react-wizzard
```

### Peer Dependencies

This package requires the following peer dependencies:

- `react` ^18.0.0
- `@scoped-observer/core` ^2.3.5

Make sure to install them if they're not already in your project:

```bash
npm install react @scoped-observer/core
```

## Getting Started

First, create a wizard client by calling `createWizardClient()`. This returns an object with all the components and hooks you need:

```tsx
import { createWizardClient } from "react-wizzard";

const {
  Wizard,
  Step,
  useWizard,
  useWizardCommands,
  useWizardSelector,
  getWizardClient,
} = createWizardClient();

// Export them for use throughout your app
export {
  Wizard,
  Step,
  useWizard,
  useWizardCommands,
  useWizardSelector,
  getWizardClient,
};
```

## Setting Up a Wizard

Now you can use the `Wizard` component to set up your wizard. Wrap your wizard content with it:

```tsx
<Wizard
  id="wizard-1"
  steps={["stepOne", "stepTwo", "stepThree"]}
  activeStep="stepOne"
  onFinish={() => {
    console.log("Wizard completed!");
  }}
  onReset={() => {
    console.log("Wizard reset");
  }}
>
  {/* Your wizard content */}
</Wizard>
```

### Wizard Props

- **`id`** (required) - Unique identifier for the wizard instance
- **`steps`** (required) - Array of step names (strings)
- **`activeStep`** (required) - Initial step name (must be one of the steps)
- **`onFinish`** (optional) - Callback fired when the wizard reaches the last step and tries to go next
- **`onReset`** (optional) - Callback fired when the wizard is reset

## useWizard Hook

The `useWizard()` hook gives you access to the current wizard state. It can only be used inside a `Wizard` component:

```tsx
const StepsMap = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
};

const Body = () => {
  const { activeStep } = useWizard();
  let Step = StepsMap[activeStep as keyof typeof StepsMap];

  return (
    <div>
      <Step />
    </div>
  );
};
```

### Return Values

The `useWizard()` hook returns an object with:

- **`activeStep`** - Current active step name (string)
- **`nextStep`** - Next step name or `null` if on last step
- **`previousStep`** - Previous step name or `null` if on first step
- **`isLast`** - Boolean indicating if currently on the last step
- **`isFirst`** - Boolean indicating if currently on the first step
- **`steps`** - Array of all step names
- **`wizardId`** - The wizard's ID string

The hook automatically re-renders when the wizard state changes (step navigation, reset, or step updates).

## Setting Up Steps

Use the `Step` component to wrap each step's content. The `Step` component must be used inside a `Wizard` component and accepts optional middleware props for validation and navigation hooks:

```tsx
<Step
  onNext={(params) => {
    console.log(`Navigating from ${params.from} to ${params.to}`);
  }}
  onPrevious={(params) => {
    console.log(`Navigating back from ${params.from} to ${params.to}`);
  }}
  validate={(params) => {
    // Validate before navigation
    if (params.payload?.name === "John") {
      // Show error or prevent navigation
      return;
    }
    // Call resolve to allow navigation
    params.resolve();
  }}
>
  <h1>Step Content</h1>
  {/* Your step content */}
</Step>
```

### Step Props

- **`onNext`** (optional) - Callback fired before navigating to the next step. Receives `{ from: string, to: string }`
- **`onPrevious`** (optional) - Callback fired before navigating to the previous step. Receives `{ from: string, to: string }`
- **`validate`** (optional) - Validation function that runs before navigation. Receives:
  - `payload` - Any data passed to the navigation command
  - `command` - The navigation command (`next`, `previous`, or `goToStep`)
  - `activeStep` - Current step name
  - `toStep` - Target step name
  - `resolve()` - Call this function to allow navigation to proceed

The `validate` function gives you full control over navigation. If you don't call `resolve()`, navigation will be blocked until you do.

## useWizardCommands Hook

The `useWizardCommands()` hook provides functions to control wizard navigation. It can only be used inside a `Wizard` component:

```tsx
const WizControls = () => {
  const { next, previous, reset, goToStep, updateSteps } = useWizardCommands();

  return (
    <div>
      <button onClick={() => previous()}>Previous</button>
      <button onClick={() => next({ name: "John" })}>Next</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => goToStep("stepThree", { data: "custom" })}>
        Go to Step Three
      </button>
      <button onClick={() => updateSteps((steps) => [...steps, "stepFour"])}>
        Add Step
      </button>
    </div>
  );
};
```

### Available Commands

- **`next(payload?)`** - Navigate to the next step. Optionally pass data that will be available in validation and middleware callbacks
- **`previous(payload?)`** - Navigate to the previous step. Optionally pass data
- **`reset()`** - Reset the wizard to its initial state (the step defined in `activeStep`)
- **`goToStep(toStep, payload?)`** - Jump directly to a specific step by name. Optionally pass data
- **`updateSteps(callback)`** - Dynamically update the steps array. The callback receives the current steps array and should return the new steps array

All navigation commands go through validation and middleware. If a step has a `validate` function, navigation will wait until you call `resolve()` to proceed.

## useWizardSelector Hook

The `useWizardSelector()` hook gives you access to a wizard client from anywhere in your component tree, even outside the `Wizard` component. **The key feature is that it's reactive** - it returns `undefined` if the wizard doesn't exist yet, and automatically updates when the wizard is created or removed.

```tsx
const SomeComponent = () => {
  const client = useWizardSelector("wizard-1");

  useEffect(() => {
    if (!client) return;

    const unsubscribe = client.addEventListener("onStepChange", (payload) => {
      console.log("Step changed:", payload);
    });

    return () => {
      unsubscribe();
    };
  }, [client]);

  if (!client) {
    return <div>Wizard not ready yet</div>;
  }

  return (
    <div>
      <button onClick={() => client.commands.next()}>Next</button>
    </div>
  );
};
```

### Client API

The hook returns a client object (or `undefined`) with:

- **`commands`** - Navigation commands object:
  - `next(payload?)` - Navigate to next step
  - `previous(payload?)` - Navigate to previous step
  - `reset()` - Reset wizard
  - `goToStep(toStep, payload?)` - Jump to specific step
  - `updateSteps(callback)` - Update steps array
- **`getters`** - State getters object:
  - `getActiveStep()` - Get current step name
  - `getSteps()` - Get all steps array
  - `getWizardId()` - Get wizard ID
  - `isLast()` - Check if on last step
  - `isFirst()` - Check if on first step
  - `getNextStep()` - Get next step name or null
  - `getPreviousStep()` - Get previous step name or null
- **`addEventListener(eventName, callback)`** - Listen to wizard events (`onStepChange`, `onReset`, `onFinish`). Returns unsubscribe function.

The hook automatically re-renders your component when the wizard is created or destroyed.

## getWizardClient Function

The `getWizardClient()` function gives you access to a wizard client by its ID. It has the same API as `useWizardSelector()`, but **it's not reactive** - it won't trigger re-renders when the wizard is created or destroyed. This makes it perfect for using in event handlers, regular JavaScript modules, or anywhere you need runtime access without React's reactivity.

```tsx
const MyComponent = () => {
  const handleClick = () => {
    const client = getWizardClient("wizard-1");
    if (client) {
      client.commands.next();
      console.log("Current step:", client.getters.getActiveStep());
    }
  };

  return <button onClick={handleClick}>Next Step</button>;
};
```

You can also use it in non-React contexts, like plain JavaScript modules:

```javascript
// In a utility module
export function navigateToStep(stepName) {
  const client = getWizardClient("wizard-1");
  if (client) {
    client.commands.goToStep(stepName);
  }
}
```

### Client API

The function returns the same client object as `useWizardSelector()`:

- **`commands`** - Navigation commands (same as `useWizardSelector`)
- **`getters`** - State getters (same as `useWizardSelector`)
- **`addEventListener(eventName, callback)`** - Listen to wizard events (same as `useWizardSelector`)

Returns `undefined` if the wizard doesn't exist. Unlike `useWizardSelector()`, this function won't trigger component re-renders when the wizard state changes.
