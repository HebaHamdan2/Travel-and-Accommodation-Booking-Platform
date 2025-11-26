import "./App.css";
import { RouterProvider } from "react-router-dom";
import GlobalNotification from "./components/GlobalNotification";
import { Router } from "./routes/Router";
function App() {
  return (
    <>
      <GlobalNotification />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
