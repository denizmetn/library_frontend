import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    try {
      const response = await fetch("#", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Giriş başarısız.");
      }
      const data = await response.json();
      console.log("Giriş başarılı:", data);

      localStorage.setItem("authToken", data.token);
    } catch (error) {
      console.error("Giriş hatası:", error);
      setError(error.message);
    }
    console.log("Giriş başarılı:", { email, password });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl space-y-6">
        <h1 className="font-bold text-3xl text-gray-800 flex justify-center">
          Giriş Yap
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Giriş Yap
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Hesabın yok mu?
          <a href="/register" className="text-blue-600 hover:underline">
            Hesap Oluştur
          </a>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
