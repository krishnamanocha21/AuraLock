import React, { useState } from 'react';
import { LogOut, Search, FileText, Eye, X, Filter, Shield } from 'lucide-react';
import Layout from '../components/Layout';
const ReceiverDashboard = () => {
  // Mock Data: Represents "All records created by any Sender"
  const allRecords = [
    { id: 1, fileName: 'Q4_Financials.pdf', description: 'Q4 revenue reports and audit logs.', category: 'Finance', sender: 'john.doe@example.com', date: '2026-01-14' },
    { id: 2, fileName: 'Project_Alpha_Specs.docx', description: 'Technical specifications for the new module.', category: 'Engineering', sender: 'sarah.smith@example.com', date: '2026-01-13' },
    { id: 3, fileName: 'Employee_Handbook_v2.pdf', description: 'Updated HR policies for 2026.', category: 'HR', sender: 'hr.manager@example.com', date: '2026-01-12' },
  ];

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic for search
  const filteredRecords = allRecords.filter(record => 
    record.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>  
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      

      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Global File Registry</h1>
            <p className="text-slate-400 text-sm mt-1">Read-only view of all metadata records.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search files or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-full sm:w-64 transition-all outline-none"
            />
          </div>
        </div>

        {/* --- Global Table View --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950/50 text-xs uppercase font-semibold text-slate-300">
                <tr>
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      {record.fileName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
                        {record.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{record.sender}</td>
                    <td className="px-6 py-4">{record.date}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedRecord(record)}
                        className="text-blue-400 hover:text-blue-300 font-medium text-xs flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRecords.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No records found matching your search.
            </div>
          )}
        </div>
      </main>

      {/* --- Detail Modal --- */}
      {selectedRecord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Record Details</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Name</label>
                <div className="text-slate-200 mt-1 font-medium text-lg">{selectedRecord.fileName}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                   <div className="text-slate-200 mt-1 bg-slate-800 px-3 py-1.5 rounded-lg inline-block text-sm border border-slate-700">{selectedRecord.category}</div>
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uploaded By</label>
                   <div className="text-slate-200 mt-1 text-sm">{selectedRecord.sender}</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                <div className="mt-2 p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed">
                  {selectedRecord.description}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
    </Layout>
  );
};

export default ReceiverDashboard;