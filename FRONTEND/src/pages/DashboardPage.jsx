import React from 'react';
import { LogOut, Send, Download, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Assuming you have this context
import { TbLock } from "react-icons/tb";
import Layout from '../components/Layout'; // Assuming you have a Layout component
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSenderClick = () => {
    navigate('/senderDashboard');
  };

  const handleReceiverClick = () => {
    navigate('/receiverDashboard');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#070b16] text-slate-200 font-sans flex flex-col">
        

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 gap-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Secure File Transfer
            </h1>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              Choose your role to get started. Encrypt and send files securely, or decrypt and receive them.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl justify-center">
            
            {/* SENDER CARD */}
            <button
              onClick={handleSenderClick}
              className="group relative flex-1 h-64 bg-[#0f172a] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-8 transition-all duration-300 hover:border-blue-600 hover:bg-[#080c16] hover:shadow-2xl hover:shadow-blue-900/20"
            >
              <div className="relative flex items-center justify-center scale-110 group-hover:scale-125 transition-transform duration-300">
                <Shield className="w-14 h-14 text-slate-400 group-hover:text-blue-600 transition-colors duration-300 stroke-[1.5]" />
                <div className="absolute -right-5 -bottom-2 bg-[#0f172a] group-hover:bg-[#080c16] rounded-full p-1 transition-colors duration-300">
                  <Send className="w-7 h-7 text-slate-500 group-hover:text-blue-400 transition-colors duration-300 stroke-[1.5]" />
                </div>
              </div>
              <span className="text-xl font-medium text-slate-400 group-hover:text-white transition-colors">
                I am a Sender
              </span>
            </button>

            {/* RECEIVER CARD */}
            <button
              onClick={handleReceiverClick}
              className="group relative flex-1 h-64 bg-[#0f172a] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center gap-8 transition-all duration-300 hover:border-blue-600 hover:bg-[#080c16] hover:shadow-2xl hover:shadow-blue-900/20"
            >
              <div className="relative flex items-center justify-center scale-110 group-hover:scale-125 transition-transform duration-300">
                <Shield className="w-14 h-14 text-slate-400 group-hover:text-blue-600 transition-colors duration-300 stroke-[1.5]" />
                <div className="absolute -left-5 -bottom-2 bg-[#0f172a] group-hover:bg-[#080c16] rounded-full p-1 transition-colors duration-300">
                  <Download className="w-7 h-7 text-slate-500 group-hover:text-blue-400 transition-colors duration-300 stroke-[1.5]" />
                </div>
              </div>
              <span className="text-xl font-medium text-slate-400 group-hover:text-white transition-colors">
                I am a Receiver
              </span>
            </button>

          </div>
        </main>
      </div>
    </Layout>
  );
}