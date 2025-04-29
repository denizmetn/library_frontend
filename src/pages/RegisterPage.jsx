import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !surname || !email || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    try {
      const response = await fetch("#", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Kayıt başarısız oldu. Hata kodu: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Kayıt başarılı:", data);
    } catch (error) {
      console.error("Kayıt hatası:", error);
      setError(
        error.message ||
          "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
    console.log("Kayıt başarılı:", { name, surname, email, password });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl space-y-6">
        <h1 className="font-bold text-3xl text-gray-800 flex justify-center">
          Kayıt Ol
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ad"
            value={name}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyad"
            value={surname}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Kayıt Ol
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Zaten hesabın var mı?
          <a href="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </a>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
