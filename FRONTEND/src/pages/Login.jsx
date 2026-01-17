import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { TbLock } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {

 //frontend part
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const { login, register } = useAuth();
  /*backend part*/
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // 2. Handle typing in inputs
  //...formData (The Spread Operator): This is crucial. It means: "Copy everything currently inside formData."
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Updated Submit Logic (Cleaner & simpler)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // --- LOGIN LOGIC ---
      // We call the context function. It handles the API and State internally.
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // If successful, just navigate. The Context already saved the user data.
        navigate("/dashboard");
      } else {
        // If failed, show the error message returned by the context
        alert(result.message);
      }

    } else {
      // --- REGISTER LOGIC ---
      const result = await register(formData);

      if (result.success) {
        alert("Registration Successful! Please Login.");
        setIsLogin(true); // Switch to login tab
      } else {
        alert(result.message);
      }
    }
  };
 /*-------------------------- */

  
  return (
    <div className="min-h-screen w-full bg-[#070b16] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#10131e] rounded-2xl shadow-2xl p-8 border border-slate-800">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4 text-blue-500">
            <TbLock size={64} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-wide">
            AuraLock
          </h1>
        </div>

        <div className="flex bg-[#1e293b] rounded-lg p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              isLogin
                ? 'bg-[#10141e] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              !isLogin
                ? 'bg-[#10141e] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User size={18} />
                </div>
                <input
                /*added in every field */
                  name="fullName" 
                  value={formData.fullName}
                  onChange={handleChange}
                /*-------- */
                  type="text"
                  placeholder="Krishna Manocha "
                  className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail size={18} />
              </div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="krishna@gmail.com"
                className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <TbLock size={18} />
              </div>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#1e293b] border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit" 
            //removed the to option from button it is now handled by handlesubmit function
            //to="/dashboard"
            className="w-full text-white bg-[#10141e] hover:bg-[#080c16] border border-slate-800 focus:ring-4 focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all shadow-lg shadow-blue-500/9"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}