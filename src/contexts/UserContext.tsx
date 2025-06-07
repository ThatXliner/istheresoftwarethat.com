import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => {
    // Mock login implementation
    setUser({
      id: '1',
      username: 'testuser',
      email: 'test@example.com'
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};