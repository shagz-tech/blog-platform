import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Register
  const register = async (name, email, password) => {
    const { data } = await axios.post(
      'http://localhost:5000/api/users/register',
      { name, email, password }
    );
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Login
  const login = async (email, password) => {
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password }
    );
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
