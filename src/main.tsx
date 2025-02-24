import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
