import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No BrowserRouter needed here
import Login from './pages/Login';
import SenderDashboard from './pages/SenderDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/senderDashboard" element={<SenderDashboard />} />
      <Route path="/receiverDashboard" element={<ReceiverDashboard />} />
    
    </Routes>
  );
}

export default App;