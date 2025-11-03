import "./App.css";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";

function App() {

  return (
    <>
    <ThemeContextProvider>
      <Login/>
    </ThemeContextProvider>
    
    </>
  );
}

export default App;
