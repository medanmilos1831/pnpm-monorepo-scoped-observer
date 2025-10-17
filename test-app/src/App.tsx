import { QueryClient, QueryClientProvider } from "react-query";
import { HomePage } from "./pages";
import { createBrowserRouter } from "react-router-dom";
import { createWizardClient, WizardClientProvider } from "./wizard";
import {
  createReferenceStore,
  UiReferencesClientProvider,
} from "./UIReferenceStore";

const client = createWizardClient();
const r = new QueryClient();
const w = createBrowserRouter([
  {
    path: "/",
    element: <></>,
  },
]);
const store = createReferenceStore();
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <UiReferencesClientProvider client={store}>
        <HomePage />
      </UiReferencesClientProvider>
    </div>
  );
}

export default App;
