import { createContext, useContext, useState, useEffect } from 'react';

import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is logged in when app loads
  useEffect(() => {
    //The server does not remember you. The server is "stateless." It only knows you are logged in because your browser re-sends the proof (the token) immediately upon refresh,because of the useEffect hook
    const checkUserLoggedIn = async () => {
      try {
        const response = await api.get('/users/current-user', {
          // This is the "shipping label" we just discussed.
          //Without this header, your backend (specifically the verifyJWT middleware) would see the request as "anonymous" and reject it with a 401 Unauthorized error.
          //Since GET requests don't have a "body" (you aren't sending a file or a form), the headers are the only place to carry the security token
          headers: {
            //When this code runs, it creates a string that looks like this
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        

        // it check weather response.data.data is there or not if yes save that data to the User
        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else {
          
          setUser(response.data); // Try setting it directly
        }
      } catch (error) {
        console.error('Session check failed', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      const data = response.data;

      if (data.data?.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
      }

      setUser(data.data.user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // 3. Register Function
  const register = async (userData) => {
    try {
      await api.post('/users/register', userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // 4. Logout Function
  const logOut = async () => {
    try {
      await api.post(
        '/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

