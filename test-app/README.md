# Wizard System

A powerful, flexible wizard system built with React and TypeScript that provides step-by-step navigation with validation, event handling, and state management.

## Features

- 🎯 **Step Navigation**: Next, previous, go to specific step
- ✅ **Validation**: Built-in validation system for each step
- 🔄 **State Management**: Reactive state updates with subscriptions
- 🎨 **React Integration**: Hooks and components for easy React integration
- 📡 **Event System**: Subscribe to wizard events (step change, reset, finish)
- 🎛️ **Flexible Configuration**: Customizable wizard behavior and rendering

## Quick Start

### 1. Setup Wizard Client

```tsx
import { createWizardClient, WizardClientProvider } from "./wizard";

const client = createWizardClient();

function App() {
  return (
    <WizardClientProvider client={client}>
      {/* Your app content */}
    </WizardClientProvider>
  );
}
```

### 2. Create a Wizard

```tsx
import { Wizard, useStep, useWizardCommands } from "./wizard";

function MyWizard() {
  return (
    <Wizard
      id="my-wizard"
      steps={["stepOne", "stepTwo", "stepThree"]}
      activeStep="stepOne"
      onFinish={({ render, reset }) => {
        render(); // Show success screen
      }}
      renderOnFinish={({ reset }) => (
        <div>
          <h2>Wizard Completed!</h2>
          <button onClick={reset}>Start Over</button>
        </div>
      )}
    >
      <WizardContent />
    </Wizard>
  );
}
```

### 3. Create Step Components

```tsx
import { Wizard } from "./wizard";

function StepOne() {
  return (
    <Wizard.Step
      onNext={(params) => {
        // Handle next step logic
        console.log("Moving to:", params.toStep);
      }}
      onPrevious={(params) => {
        // Handle previous step logic
      }}
      validate={(params) => {
        // Validation logic
        if (isValid) {
          params.resolve(); // Allow navigation
        }
      }}
    >
      <div>
        <h2>Step One Content</h2>
        <p>Your step content here</p>
      </div>
    </Wizard.Step>
  );
}
```

### 4. Use Wizard Hooks

```tsx
function WizardControls() {
  const { stepName, steps, isFirst, isLast } = useStep();
  const { next, previous, reset, goToStep } = useWizardCommands();

  return (
    <div>
      <button onClick={previous} disabled={isFirst}>
        Previous
      </button>
      <button onClick={() => next({ actionType: "validate" })}>Next</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => goToStep("stepTwo")}>Go to Step Two</button>
    </div>
  );
}
```

## API Reference

### Wizard Component

The main wizard component that manages the wizard state and lifecycle.

```tsx
interface IWizardConfig {
  id: string; // Unique wizard identifier
  steps: string[]; // Array of step names
  activeStep: string; // Initial active step
  onReset?: () => void; // Called when wizard resets
  onFinish?: (params: {
    // Called when wizard finishes
    reset: () => void;
    render: () => void;
  }) => void;
  renderOnFinish?: (params: {
    // Custom finish screen renderer
    reset: () => void;
  }) => React.ReactNode;
}
```

### Wizard.Step Component

Wraps step content and provides step-specific callbacks.

```tsx
interface IWizardStep {
  onNext?: (params: IOnNextPreviousParams) => void;
  onPrevious?: (params: IOnNextPreviousParams) => void;
  validate?: (params: IOnValidateParams) => void;
}

interface IOnNextPreviousParams {
  activeStep: string;
  toStep: string;
  updateSteps: (callback: (steps: string[]) => string[]) => void;
}

interface IOnValidateParams {
  actionType?: string;
  command: WizardCommands;
  activeStep: string;
  toStep: string;
  resolve: () => void;
}
```

### Hooks

#### useStep()

Returns current step information and navigation state.

```tsx
const { stepName, steps, wizardId, isLast, isFirst } = useStep();
```

#### useWizardCommands()

Returns wizard navigation functions.

```tsx
const { next, previous, reset, goToStep } = useWizardCommands();
```

### Wizard Commands

```tsx
enum WizardCommands {
  NEXT = "next",
  PREVIOUS = "previous",
}

enum WizardEvents {
  ON_STEP_CHANGE = "onStepChange",
  ON_RESET = "onReset",
  ON_FINISH = "onFinish",
}
```

## Advanced Usage

### Custom Step Navigation

```tsx
function CustomNavigation() {
  const { steps, stepName } = useStep();
  const { goToStep } = useWizardCommands();

  return (
    <div className="step-indicators">
      {steps.map((step) => (
        <button
          key={step}
          className={step === stepName ? "active" : ""}
          onClick={() => goToStep(step, { actionType: "validate" })}
        >
          {step}
        </button>
      ))}
    </div>
  );
}
```

### Step Validation

```tsx
function ValidatedStep() {
  const [isValid, setIsValid] = useState(false);

  return (
    <Wizard.Step
      validate={(params) => {
        if (isValid) {
          params.resolve();
        } else {
          // Show validation error
          alert("Please complete all required fields");
        }
      }}
    >
      <form>
        <input
          required
          onChange={(e) => setIsValid(e.target.value.length > 0)}
        />
      </form>
    </Wizard.Step>
  );
}
```

### Event Subscriptions

```tsx
function WizardWithEvents() {
  const { getClient } = useWizardClient();
  const client = getClient("my-wizard");

  useEffect(() => {
    const unsubscribe = client.subscribe(
      WizardEvents.ON_STEP_CHANGE,
      (data) => {
        console.log("Step changed to:", data);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <Wizard id="my-wizard" steps={["step1", "step2"]} activeStep="step1" />
  );
}
```

## Architecture

The wizard system is built with a modular architecture:

- **Store**: Core state management with entities and observers
- **React Integration**: Hooks and components for React integration
- **Event System**: Pub/sub pattern for wizard events
- **Validation**: Flexible validation system for step transitions
