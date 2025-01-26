import React, { createContext, useContext, useState } from 'react';

// Create Context for Auth
const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

// Auth Provider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // This will store the user data (username, etc.)

  // Login function to set user data
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function to clear user data
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
