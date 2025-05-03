import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = ()=>{
    const [User,setUser] = useState({name:"", surname:"", email:"",password:""});
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const nameChangeHandler = (e) => {
        setUser({...User,name:e.target.value});
    }
    const surnameChangeHandler = (e) => {
        setUser({...User,surname:e.target.value});
    } 
    const emailChangeHandler = (e) => {
        setUser({...User, email:e.target.value});
    }
    const passwordChangeHandler = (e) => {
        setUser({...User,password:e.target.value});
        const fullName = `${User.name} ${User.surname}`.trim(); 
        console.log(fullName);
        
    }

    const handleSubmit = async(e) =>{
        e.preventdefault();
        const fullName = `${User.name} ${User.surname}`.trim(); 
        const userToSend = {
            username: fullName,             
            email: User.email,
            password: User.password
          };
          

        try{
            const response = await axios.post("http://localhost:8081/user/register",userToSend);
            const msgs=response?.data?.message || "Kaydınız başarılı.";
            alert(msgs);
            //navigate("/main");
        }
        catch(error){
            const errormsgs = error.response?.data?.message || "Bir hata oluştu.";
            alert(errormsgs);
            console.error("kayıt hatası",error);
            
        }
        
    }


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
                required
                value={User.name}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={nameChangeHandler}
              />
              <input
                type="text"
                placeholder="Soyad"
                required
                value={User.surname}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={surnameChangeHandler}
              />
              <input
                type="email"
                placeholder="E-posta"
                required
                value={User.email}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={emailChangeHandler}
              />
              <input
                type="password"
                placeholder="Şifre"
                required
                value={User.password}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={passwordChangeHandler}
              />
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200">
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
    export default RegisterForm;
    
