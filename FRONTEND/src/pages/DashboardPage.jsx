import React from 'react';
import { LogOut, Send, Download, Shield, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TbLock } from "react-icons/tb";
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <Layout>
    <div className="min-h-screen bg-[#070b16] text-slate-200 font-sans flex flex-col">
      

      <main className="flex-1 flex flex-col items-center justify-center -mt-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Welcome, <span className="text-blue-600">{user?.fullName || "User"}</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
          <button className="group relative flex-1 h-64 bg-[#0f172a] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-8 transition-all duration-300 hover:border-blue-600 hover:bg-[#080c16]">
            <div className="relative flex items-center justify-center">
              <Shield className="w-14 h-14 text-white group-hover:text-blue-600 transition-colors duration-300 stroke-[1.5]" />
              <Send className="w-8 h-8 text-white group-hover:text-blue-400 absolute -right-6 -bottom-2 transition-colors duration-300 stroke-[1.5]" />
            </div>
            <span className="text-lg font-medium text-slate-400 group-hover:text-white transition-colors">
              I am a Sender
            </span>
          </button>

          <button className="group relative flex-1 h-64 bg-[#0f172a] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-8 transition-all duration-300 hover:border-blue-600 hover:bg-[#080c16]">
            <div className="relative flex items-center justify-center">
              <Download className="w-8 h-8 text-white group-hover:text-blue-400 absolute -left-6 -bottom-2 transition-colors duration-300 stroke-[1.5]" />
              <Shield className="w-14 h-14 text-white group-hover:text-blue-600 transition-colors duration-300 stroke-[1.5]" />
            </div>
            <span className="text-lg font-medium text-slate-400 group-hover:text-white transition-colors">
              I am a Receiver
            </span>
          </button>
        </div>
      </main>
    </div>
    </Layout>
  );
}