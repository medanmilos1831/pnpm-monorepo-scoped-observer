// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Layout } from "./components";

import { ContactPage } from "./pages";
import { HomePage } from "./pages/homepage/HomePage";

// Router configuration - commented out
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "about",
//         element: <AboutPage />,
//       },
//       {
//         path: "contact",
//         element: <ContactPage />,
//       },
//     ],
//   },
// ]);

function App() {
  return <HomePage />;
}

export default App;
