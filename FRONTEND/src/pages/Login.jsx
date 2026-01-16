import React, { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { TbLock } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

import api from '../api/axios';
export default function LoginPage() {

 //frontend part
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 


  /*backend part*/
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // 2. Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit (Login or Register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        // We only send email and password for login
        const response = await api.post("/users/login", {
          email: formData.email,
          password: formData.password
        });
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        // --- REGISTER LOGIC ---
        // We send all fields for register
        await api.post("/users/register", formData);
        alert("Registration Successful! Please Login.");
        setIsLogin(true); // Switch to login tab
      }
    } catch (error) {
      console.error("Auth Error:", error);
      // Show the exact error message from backend
      alert(error.response?.data?.message || "Something went wrong");
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