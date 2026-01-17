import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  LogOut, 
  Lock, 
  Unlock, 
  FileText, 
  Download, 
  Search, 
  Eye, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Mock data representing files available to the receiver
const initialReceivedFiles = [
  {
    id: 'file-101',
    name: 'Q4_Financial_Report_Final.pdf',
    size: '2.4 MB',
    date: '2026-01-17, 09:30 AM',
    sender: 'john.doe@auralock.com',
    isLocked: true,
    // In a real app, password validation happens on the backend. 
    // This is just for mockup simulation.
    correctPassword: 'password123' 
  },
  {
    id: 'file-102',
    name: 'Project_Alpha_Blueprints.zip',
    size: '156 MB',
    date: '2026-01-16, 04:15 PM',
    sender: 'sarah.smith@design.com',
    isLocked: true,
    correctPassword: 'securepass'
  },
  {
    id: 'file-103',
    name: 'Meeting_Notes_Jan15.docx',
    size: '45 KB',
    date: '2026-01-15, 11:00 AM',
    sender: 'john.doe@auralock.com',
    isLocked: true,
    correctPassword: 'notes'
  }
];

const ReceiverDashboard = () => {
  // State to manage the list of files and their locked status
  const [files, setFiles] = useState(initialReceivedFiles);
  
  // State to manage password inputs for each file independently
  // Object shape: { 'file-101': 'userTypedPassword', 'file-102': '' }
  const [passwordInputs, setPasswordInputs] = useState({});

  // State to manage error messages for specific files
  // Object shape: { 'file-101': 'Incorrect password' }
  const [errors, setErrors] = useState({});

  // Handle typing in a password field for a specific file
  const handlePasswordChange = (fileId, value) => {
    setPasswordInputs(prev => ({ ...prev, [fileId]: value }));
    // Clear error when user starts typing again
    if (errors[fileId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fileId];
        return newErrors;
      });
    }
  };

  // Handle the unlock attempt
  const handleUnlock = (fileId) => {
    const inputPassword = passwordInputs[fileId];
    const fileToUnlock = files.find(f => f.id === fileId);

    if (!inputPassword) {
      setErrors(prev => ({ ...prev, [fileId]: "Please enter a password." }));
      return;
    }

    // Simulate backend validation check
    if (inputPassword === fileToUnlock.correctPassword) {
      // Success: Update file state to unlocked
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === fileId ? { ...file, isLocked: false } : file
        )
      );
      // Clear input and errors
      setPasswordInputs(prev => ({ ...prev, [fileId]: '' }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fileId];
        return newErrors;
      });
    } else {
      // Failure: Set error message
      setErrors(prev => ({ ...prev, [fileId]: "Incorrect decryption password." }));
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">

      {/* --- Main Content --- */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-white">Received Files</h1>
            <p className="text-slate-400 mt-1">Access files secured and shared with you.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="block w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Files List */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          {files.map((file) => (
            <div key={file.id} className={`group bg-slate-900 border ${file.isLocked ? 'border-slate-800' : 'border-emerald-900/50 bg-emerald-950/10'} rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/20 transition-all`}>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* File Info Section */}
                <div className="flex-1 flex items-start gap-4">
                  <div className={`p-4 rounded-xl ${file.isLocked ? 'bg-slate-800 text-slate-400' : 'bg-emerald-500/20 text-emerald-400'} transition-colors`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-slate-100 truncate">{file.name}</h3>
                        {file.isLocked ? (
                            <span className="flex items-center gap-1 text-xs font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                                <Lock className="w-3 h-3" /> Locked
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs font-medium bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900/50">
                                <CheckCircle2 className="w-3 h-3" /> Unlocked
                            </span>
                        )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span>{file.size}</span>
                      <span className="text-slate-700">•</span>
                      <span>{file.date}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                      Sent by: <span className="text-slate-300 font-medium">{file.sender}</span>
                    </p>
                  </div>
                </div>

                {/* Action Section (Unlock/Download) */}
                <div className="lg:w-72 flex flex-col justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6 pt-4 lg:pt-0">
                  {file.isLocked ? (
                    // Locked State: Password Input
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                          Decryption Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={passwordInputs[file.id] || ''}
                            onChange={(e) => handlePasswordChange(file.id, e.target.value)}
                            className={`block w-full pl-4 pr-10 py-2.5 bg-slate-950 border rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${errors[file.id] ? 'border-red-500/50 focus:ring-red-500/50' : 'border-slate-800 focus:ring-emerald-500/50 focus:border-emerald-500'}`}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleUnlock(file.id) }}
                          />
                           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-slate-500" />
                          </div>
                        </div>
                        {errors[file.id] && (
                          <p className="flex items-center gap-1 text-xs text-red-400 mt-2 animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="w-3 h-3" /> {errors[file.id]}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => handleUnlock(file.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors border border-slate-700 hover:border-slate-600 focus:ring-2 focus:ring-slate-700"
                      >
                        <Unlock className="w-4 h-4" />
                        Unlock File
                      </button>
                    </div>
                  ) : (
                    // Unlocked State: Download Actions
                    <div className="flex flex-col gap-3 h-full justify-center animate-in zoom-in-95 duration-300">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                        <Download className="w-5 h-5" />
                        Download File
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 text-emerald-400 hover:text-emerald-300 text-sm font-medium rounded-xl transition-colors border border-slate-800 hover:border-emerald-900/50">
                        <Eye className="w-4 h-4" />
                        Quick View
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
    </Layout>
  );
};

export default ReceiverDashboard;