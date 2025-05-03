import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm =()=>{
    const [userLogin, setUserLogin] = useState({email:"",password:""});
    const navigate = useNavigate();

    const mailChangeHandler = (e) =>{
        setUserLogin({...userLogin, email:e.target.value});
    };
    const passwordChangeHandler = (e) =>{
        setUserLogin({...userLogin,password:e.target.value});
    };
  
    const loginHandleSubmit = async (e) => {
      e.preventDefault();

      const userToSend = {             
        email: userLogin.email,
        password: userLogin.password
      };

      try{
        const response = await axios.post("http://localhost:8081/user/register",userToSend);
        const msgs=response?.data?.message || "Giriş Başarıyla Gerçekleştirildi.";
        alert(msgs);
        //navigate("/main");
        }
    catch(error){
        const errormsgs = error.response?.data?.message || "Mail veya Şifre geçersiz.";
        alert(errormsgs);
        console.error("Giriş başarısız.",error);
        
        }
    };
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl space-y-6">
          <h1 className="font-bold text-3xl text-gray-800 flex justify-center">
            Giriş Yap
          </h1>
  
          <form className="flex flex-col space-y-4" onSubmit={loginHandleSubmit}>
            <input
              type="email"
              placeholder="E-posta"
              required
              value={userLogin.email}
              onChange={mailChangeHandler}
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Şifre"
              required
              value={userLogin.password}
              onChange={passwordChangeHandler}
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
  
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
}
export default LoginForm;