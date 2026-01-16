import React from 'react';
import { TbLock } from 'react-icons/tb';
import { LogOut } from 'lucide-react';
const Layout = ({ children }) => {
  return (
    <div className="max-h-screen  flex flex-col bg-[#070b16] font-sans text-gray-200">
      
      <nav className="border-b  border-slate-800 bg-slate-950/50 backdrop-blur-md sticky    top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
            <div className="flex  items-center gap-2">
              <div className='mt-1' >
              <TbLock className="w-9 h-9  text-blue-500" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white">AuraLock</span>
            
            <span className="text-xs text-slate-500 mt-0.5 "> Portal • john.doe@auralock.com</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors border border-slate-800 hover:border-slate-600 rounded-lg ">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="flex-grow bg-[#070b16]  w-full flex flex-col">
        {children}
      </main>

      
      <footer className="bg-[#09101b] backdrop-blur-md border-t border-gray-500 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          
          
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <span className="font-semibold text-blue-600">AuraLock</span> 
            <span className="mx-2 text-gray-600">|</span> 
            Secure File Sharing System
          </div>
          
          <div className="flex items-center gap-8 md:gap-6 text-sm">
            <span className="text-slate-500">
              Made by <span className="text-blue-500 font-medium">Krishna Manocha</span>
            </span>
            <span className="text-gray-600">
              © {new Date().getFullYear()} AuraLock
            </span>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Layout;