import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No BrowserRouter needed here
import Login from './pages/Login';
import SenderDashboard from './pages/SenderDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/senderDashboard" element={<SenderDashboard />} />
      <Route path="/receiverDashboard" element={<ReceiverDashboard />} />
      {/* <Route 
        path="/sender" 
        element={
          <ProtectedRoute allowedRoles={['sender']}>
            <Layout>
              <SenderDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/receiver" 
        element={
          <ProtectedRoute allowedRoles={['receiver']}>
            <Layout>
              <ReceiverDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />

      <Route path="/unauthorized" element={<Unauthorized />} /> */}
    </Routes>
  );
}

export default App;