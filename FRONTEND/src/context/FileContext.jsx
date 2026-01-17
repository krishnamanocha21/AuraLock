import { createContext, useContext, useState } from "react";
import api from "../api/axios"; // Your existing Axios instance
import { useAuth } from "./AuthContext"; // To ensure we only upload if logged in

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const { user } = useAuth(); // Access current user
  const [uploading, setUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [error, setError] = useState(null);

  // 1. Upload Function
  const uploadFile = async (formData) => {
    setUploading(true);
    setError(null);
    try {
      // Important: 'Content-Type': 'multipart/form-data' is usually set automatically
      // by axios when passing FormData, but explicit headers help sometimes.
      const response = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Add the new file to the top of the history list instantly
      if (response.data?.data) {
        setUploadHistory((prev) => [response.data.data, ...prev]);
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      console.error("Upload Error:", err);
      const msg = err.response?.data?.message || "Upload failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setUploading(false);
    }
  };

  // 2. Fetch History Function
  const fetchUploadHistory = async () => {
    try {
      const response = await api.get("/files/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data?.data) {
        setUploadHistory(response.data.data);
      }
    } catch (err) {
      console.error("Fetch History Error:", err);
    }
  };

  return (
    <FileContext.Provider
      value={{
        uploadFile,
        fetchUploadHistory,
        uploadHistory,
        uploading,
        error,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => useContext(FileContext);