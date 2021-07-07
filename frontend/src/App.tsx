import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";
import "./styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
