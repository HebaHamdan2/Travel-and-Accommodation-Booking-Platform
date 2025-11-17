import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import GlobalNotification from "./components/GlobalNotification";
function App() {
  return (
    <>
      <GlobalNotification />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
