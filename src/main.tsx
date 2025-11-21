// import "tailwindcss/tailwind.css"; // Tailwind v4 auto-includes all utilities
import "./index.css"; // This imports your CSS file with @import "tailwindcss"

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/* Import your CSS variables */
import "./styles/globals.css";
import "./styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
