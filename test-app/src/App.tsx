import { HomePage } from "./pages";
import { ScrolliumClientProvider } from "./scrollium/react-intergation/ScrolliumClientProvider";
import { createScrolliumClient } from "./scrollium/createScrolliumClient";
const store = createScrolliumClient();
console.log(store);
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
      <ScrolliumClientProvider client={store}>
        <HomePage />
      </ScrolliumClientProvider>
    </div>
  );
}

export default App;
