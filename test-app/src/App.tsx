import { HomePage } from "./pages";
import { scrollClient } from "./scroll";
console.log(scrollClient);
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
      <HomePage />
    </div>
  );
}

export default App;
