import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./pages/Login.tsx";

import { BrowserRouter, Route, Routes } from "react-router";
import Provider from "./providers/Provider.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
