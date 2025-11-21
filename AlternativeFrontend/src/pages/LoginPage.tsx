import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/auth/login", { email, password });

      // Salvar token se retornar
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      localStorage.setItem("loggedIn", "true");
      navigate("/symptoms");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      console.error("Erro de login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-red-500 justify-center items-center h-screen">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-400 rounded px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-400 rounded px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
