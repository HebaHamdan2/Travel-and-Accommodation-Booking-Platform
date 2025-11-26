import "./App.css";
import { RouterProvider } from "react-router-dom";
import GlobalNotification from "./components/GlobalNotification";
import { router } from "./routes/Router";
function App() {
  return (
    <>
      <GlobalNotification />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
