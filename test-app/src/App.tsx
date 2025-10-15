import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "./pages";
import { createBrowserWizard, WizardClientProvider } from "./wizard";

const client = createBrowserWizard();
const r = new QueryClient();
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <QueryClientProvider client={r}>
        <WizardClientProvider client={client}>
          <HomePage />
        </WizardClientProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
