import { useEffect, useState } from "react";
import {
  createBrowserVisibility,
  VisibilityProvider,
} from "./react-visibility-state-new";
import { HomePage } from "./pages";
import { visibility } from "./visibilityService";
function App() {
  return (
    <>
      <VisibilityProvider value={visibility}>
        <HomePage />
      </VisibilityProvider>
    </>
  );
}

export default App;
