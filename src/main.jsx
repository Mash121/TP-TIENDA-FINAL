import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ agregado
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);