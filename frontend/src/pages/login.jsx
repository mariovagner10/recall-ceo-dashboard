import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-dark text-gray-200 p-6"
    >
      <div className="bg-darkCard rounded-2xl p-8 shadow-lg w-full max-w-sm border border-gray-700">
        <h1 className="text-2xl font-semibold mb-4 text-center">🔐 Login do CEO</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button>Entrar</Button>
        </form>
      </div>
    </motion.div>
  );
}
