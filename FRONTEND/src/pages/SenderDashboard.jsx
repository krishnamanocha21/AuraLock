import React, { useState } from 'react';
import { LogOut, Upload, FileText, Trash2, Clock, Plus, FolderOpen, Search, X } from 'lucide-react';

import Layout from '../components/Layout';
const SenderDashboard = () => {
  // --- State Management ---
  
  // 1. Form State (For creating new metadata records)
  const [formData, setFormData] = useState({
    fileName: '',
    category: 'Finance', // Default selection
    description: ''
  });

  // 2. Mock Database (The sender's personal history)
  const [myRecords, setMyRecords] = useState([
    { id: 1, fileName: 'Q3_Budget_Review.pdf', category: 'Finance', description: 'Internal audit of Q3 expenses.', date: '2026-01-10' },
    { id: 2, fileName: 'Client_Outreach_Plan.docx', category: 'Marketing', description: 'Draft for the upcoming email campaign.', date: '2026-01-12' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fileName || !formData.description) return;

    setIsSubmitting(true);

    // Simulate Network Request
    setTimeout(() => {
      const newRecord = {
        id: Date.now(),
        fileName: formData.fileName,
        category: formData.category,
        description: formData.description,
        date: new Date().toISOString().split('T')[0] // Current YYYY-MM-DD
      };

      // Add to top of list
      setMyRecords([newRecord, ...myRecords]);
      
      // Reset Form
      setFormData({ fileName: '', category: 'Finance', description: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    setMyRecords(myRecords.filter(record => record.id !== id));
  };

  return (
    <Layout>
    
      
      

      {/* --- Main Content --- */}
      <main className="max-w-6xl  mx-auto pt-11 px-6 pb-11  text-slate-200 font-sans">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  ">
          
          {/* LEFT COLUMN: Metadata Entry Form (4 Columns wide) */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-black/20  top-28">
                <div className="mb-6 border-b border-slate-800 pb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-400" />
                    New Record
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Create a metadata entry for the global registry.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Input: File Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      File Name
                    </label>
                    <input
                      type="text"
                      name="fileName"
                      value={formData.fileName}
                      onChange={handleInputChange}
                      placeholder="e.g. Q4_Report.pdf"
                      className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Input: Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Category Tag
                    </label>
                    <div className="relative">
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="Finance">Finance</option>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Legal">Legal</option>
                        <option value="Marketing">Marketing</option>
                        <option value="General">General</option>
                      </select>
                      {/* Custom Arrow Icon */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                        <FolderOpen className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Input: Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Brief details about the file content..."
                      className="block w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Saving...</span>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Submit Record
                      </>
                    )}
                  </button>
                </form>
             </div>
          </div>

          {/* RIGHT COLUMN: Personal History List (8 Columns wide) */}
          <div className="lg:col-span-8">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden h-[600px] flex flex-col">

              
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">My Upload History</h2>
                  <p className="text-slate-400 text-sm mt-1">Manage the records you have added to the system.</p>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">
                  {myRecords.length} Records
                </div>
              </div>

              {/* List Content */}
              <div className="divide-y divide-slate-800 overflow-y-auto flex-1 scrollbar-thin
 scrollbar-thumb-transparent
 hover:scrollbar-thumb-slate-600
 scrollbar-track-transparent">
                {myRecords.length > 0 ? (
                  myRecords.map((record) => (
                    <div key={record.id} className="p-5 hover:bg-slate-800/40 transition-colors group">
                      <div className="flex items-start justify-between">
                        
                        {/* File Icon & Info */}
                        <div className="flex gap-4">
                          <div className="p-3 bg-slate-800 rounded-xl text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors h-fit">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-200 group-hover:text-white transition-colors">
                              {record.fileName}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                <Clock className="w-3 h-3" /> {record.date}
                              </span>
                              <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-blue-400">
                                <FolderOpen className="w-3 h-3" /> {record.category}
                              </span>
                            </div>

                            <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-xl">
                              {record.description}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-4">
                          <button 
                            onClick={() => handleDelete(record.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <div className="p-4 bg-slate-800/50 rounded-full mb-4">
                      <Search className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-sm">No records found.</p>
                    <p className="text-xs mt-1 opacity-60">Create a new entry using the form.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    
    </Layout>
  );
};

export default SenderDashboard;