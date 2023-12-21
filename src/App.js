import "./App.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProductPage1 from "./pages/productPage1";
import ProductPage2 from "./pages/productPage2";

import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product1" element={<ProductPage1 />} />
        <Route path="/product2" element={<ProductPage2 />} />



        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
