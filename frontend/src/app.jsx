import React, { useState } from "react";
import CeoDashboard from "./pages/CeoDashboard";
import Login from "./pages/login";
import "./styles/globals.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return loggedIn ? (
    <CeoDashboard />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}
