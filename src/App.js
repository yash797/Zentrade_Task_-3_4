import "./App.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
