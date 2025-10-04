import { createBrowserWizard, WizzardClientProvider } from "./wizard";

import { HomePage } from "./pages";
import { browserWizard } from "./wiz";

// const browserWizard = createBrowserWizard();

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <WizzardClientProvider value={browserWizard}>
        <HomePage />
      </WizzardClientProvider>
    </div>
  );
}

export default App;
