import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FileProvider } from './context/FileContext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>
      <FileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </FileProvider>
    </AuthProvider>
  </StrictMode>,
);
//React is a Single Page Application (SPA) library. This means your website is technically just one HTML file.
//In a standard React app, data only flows down (from parent to child). The Problem (Prop Drilling)
//The AuthProvider uses a React feature called Context. It acts like a "cloud" that floats above your entire application.