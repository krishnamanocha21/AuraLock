import React, { useState } from 'react';
import { LogOut,Lock,FileText,Upload,Trash2,Download,Activity,ShieldCheck,Search,ChevronLeft,ChevronRight,ArrowUp,Unlock,MoreVertical} from 'lucide-react';
import Layout from '../components/Layout';

const SenderDashboard = () => {
  const [activeTab, setActiveTab] = useState('audit'); // Defaulted to audit to show changes immediately

  // Mock data matching the screenshot
  const auditLogs = [
    {
      id: 1,
      timestamp: "2026-01-17, 11:30 AM",
      action: "File Uploaded",
      fileName: "Development_task.pdf",
      user: "John Doe",
      status: "Success",
      type: "upload"
    },
    {
      id: 2,
      timestamp: "2026-01-17, 10:15 AM",
      action: "File Uploaded",
      fileName: "Q4_Report.xlsx",
      user: "Jane Smith",
      status: "Success",
      type: "upload"
    },
    {
      id: 3,
      timestamp: "2026-01-17, 10:15 AM",
      action: "File Uploaded",
      fileName: "Q4_Report.xlsx",
      user: "John Doe",
      status: "Success",
      type: "upload"
    },
    {
      id: 4,
      timestamp: "2026-01-16, 04:45 PM",
      action: "File Deleted",
      fileName: "Project_Plan_v2.docx",
      user: "John Doe",
      status: "Success",
      type: "delete"
    },
    {
      id: 5,
      timestamp: "2026-01-16, 02:20 PM",
      action: "File Decrypted",
      fileName: "Financials_2025.pdf",
      user: "Admin",
      status: "Success",
      type: "decrypt"
    }
  ];

  // Helper to render action icon based on type
  const renderActionIcon = (type) => {
    switch(type) {
      case 'upload':
        return <Upload className="w-4 h-4 text-white" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-white" />;
      case 'decrypt':
        return <Unlock className="w-4 h-4 text-white" />;
      default:
        return <Activity className="w-4 h-4 text-white" />;
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">

      {/* --- Main Content --- */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900/50 p-1 rounded-xl w-fit mb-8 border border-slate-800/50">
          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'files' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            My Files
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'audit' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Audit Log
          </button>
        </div>

        {/* --- VIEW: MY FILES --- */}
        {activeTab === 'files' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Upload Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-400" />
                  Upload File
                </h2>
                <p className="text-slate-400 text-sm mt-1">Encrypt and securely store your files for sharing.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
                    Encryption Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Remember this password - you'll need it to decrypt the file.</p>
                </div>

                <div>
                  <label className="block w-full cursor-pointer">
                    <div className="flex items-center justify-between w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-600 transition-colors group">
                      <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Choose File...</span>
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">No file chosen</span>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Encrypted Files List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  Encrypted Files (1)
                </h2>
                <p className="text-slate-400 text-sm mt-1">Your securely encrypted files.</p>
              </div>

              {/* File Item */}
              <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-950/50 border border-slate-800 hover:border-slate-700 rounded-xl transition-all">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200">Development_task.pdf</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>104.23 KB</span>
                      <span>•</span>
                      <span>1/11/2026, 11:38:56 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-400">
                    Encrypted
                  </span>
                  
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700">
                    <Download className="w-4 h-4" />
                    Decrypt
                  </button>
                  
                  <button className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW: AUDIT LOG TABLE --- */}
        {activeTab === 'audit' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
              
              {/* Table Header / Toolbar */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">Audit Log</h2>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-64 transition-all"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                      <th className="px-6 py-4 font-medium flex items-center gap-1 cursor-pointer hover:text-slate-300">
                        Timestamp <ArrowUp className="w-3 h-3" />
                      </th>
                      <th className="px-6 py-4 font-medium">Action</th>
                      <th className="px-6 py-4 font-medium">File Name</th>
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                              {renderActionIcon(log.type)}
                            </div>
                            <span className="text-slate-200 font-medium">{log.action}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {log.fileName}
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {log.user}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300">{log.status}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {(log.type === 'delete' || log.type === 'decrypt') && (
                             <button className="p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-300 rounded-lg transition-colors border border-transparent hover:border-slate-700">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-slate-800 flex items-center justify-center gap-2">
                <button className="p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-300 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-900/20">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors text-sm">
                  2
                </button>
                <button className="p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-300 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
    </Layout>
  );
};

export default SenderDashboard;