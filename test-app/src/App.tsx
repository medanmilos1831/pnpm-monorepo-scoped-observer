import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "./pages";
import { createBrowserRouter } from "react-router-dom";
import { createWizardClient, WizardClientProvider } from "./wizard";

const client = createWizardClient();
const r = new QueryClient();
const w = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
]);
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
