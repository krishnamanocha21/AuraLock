import React, { useState } from 'react';
import { 
  LogOut, Lock, FileText, Upload, Trash2, Download, Activity, 
  ShieldCheck, Search, ChevronLeft, ChevronRight, ArrowUp, 
  Unlock, MoreVertical, Type, List, AlignLeft 
} from 'lucide-react';
import Layout from '../components/Layout';

const SenderDashboard = () => {
  // 1. Changed default to 'files'
  const [activeTab, setActiveTab] = useState('files'); 

  // --- Upload Form State ---
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General', 
    description: '',
    password: ''
  });

  const categories = ["Finance", "Engineering", "HR", "Legal", "Marketing", "General", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading:", { file, ...formData });
    // Add your API call here
  };

  // --- Mock Audit Data ---
  const auditLogs = [
    { id: 1, timestamp: "2026-01-17, 11:30 AM", action: "File Uploaded", fileName: "Development_task.pdf", user: "John Doe", status: "Success", type: "upload" },
    { id: 2, timestamp: "2026-01-17, 10:15 AM", action: "File Uploaded", fileName: "Q4_Report.xlsx", user: "Jane Smith", status: "Success", type: "upload" },
    { id: 3, timestamp: "2026-01-17, 10:15 AM", action: "File Uploaded", fileName: "Q4_Report.xlsx", user: "John Doe", status: "Success", type: "upload" },
    { id: 4, timestamp: "2026-01-16, 04:45 PM", action: "File Deleted", fileName: "Project_Plan_v2.docx", user: "John Doe", status: "Success", type: "delete" },
    { id: 5, timestamp: "2026-01-16, 02:20 PM", action: "File Decrypted", fileName: "Financials_2025.pdf", user: "Admin", status: "Success", type: "decrypt" }
  ];

  const renderActionIcon = (type) => {
    switch(type) {
      case 'upload': return <Upload className="w-4 h-4 text-white" />;
      case 'delete': return <Trash2 className="w-4 h-4 text-white" />;
      case 'decrypt': return <Unlock className="w-4 h-4 text-white" />;
      default: return <Activity className="w-4 h-4 text-white" />;
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
              Upload Files
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

          {/* --- VIEW: UPLOAD FORM (Previously "My Files") --- */}
          {activeTab === 'files' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-4xl mx-auto">
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/20">
                
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Upload className="w-6 h-6 text-blue-500" />
                    Upload File
                  </h2>
                  <p className="text-slate-400 mt-2">
                    Encrypt and securely store your files for sharing.
                  </p>
                </div>

                <form onSubmit={handleUpload} className="space-y-6">
                  
                  {/* Row 1: Title & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Type className="w-4 h-4" /> File Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Q4 Financial Report"
                        className="w-full bg-[#070b16] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                        required
                      />
                    </div>

                    {/* Category Dropdown */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <List className="w-4 h-4" /> Category
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-[#070b16] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <AlignLeft className="w-4 h-4" /> Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Briefly describe the contents of this file..."
                      className="w-full bg-[#070b16] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600 resize-none"
                      required
                    />
                  </div>

                  {/* Row 3: Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Encryption Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full bg-[#070b16] border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                    />
                    <p className="text-xs text-slate-500">
                      Remember this password - you'll need it to decrypt the file.
                    </p>
                  </div>

                  {/* Row 4: File Input & Submit Button */}
                  <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center pt-2">
                    {/* Custom File Input Styling */}
                    <div className="flex-1 relative group">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        required
                      />
                      <div className="bg-[#070b16] border border-slate-700 border-dashed rounded-lg px-4 py-3 text-slate-400 flex items-center justify-between group-hover:border-blue-500 transition-colors">
                        <span className="truncate">
                          {file ? file.name : "Choose a file to encrypt..."}
                        </span>
                        <FileText className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>

                    {/* Upload Button */}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Securely
                    </button>
                  </div>

                </form>
              </div>

              {/* Encrypted Files List REMOVED per instruction */}
            
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