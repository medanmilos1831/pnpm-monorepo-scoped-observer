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
console.log("RENDER APP", client);
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "black",
        color: "white",
      }}
    >
      <WizardClientProvider client={client}>
        <HomePage />
      </WizardClientProvider>
    </div>
  );
}

export default App;
