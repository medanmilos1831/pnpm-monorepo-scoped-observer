import { HomePageCore } from "./pages/HomePageCore";
import { HomePageReact } from "./pages/HomePageReact";
import { HomePageToggle } from "./pages/HomePageToggle";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
      }}
    >
      {/* <HomePageCore /> */}
      {/* <HomePageReact /> */}
      <HomePageToggle />
    </div>
  );
}

export { App };
