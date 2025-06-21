import { createContext, useContext, useState, useCallback } from "react";

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

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => {
    // Mock login implementation
    setUser({
      id: "1",
      username: "testuser",
      email: "test@example.com",
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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import type { Software } from "./components/common/data";

interface SoftwareContextType {
  getAllSoftware: () => Promise<Software[]>;
  getSoftwareById: (id: string) => Promise<Software>;
  searchSoftware: (query: string) => Promise<Software[]>;
  addToBookmarks: (id: string) => Promise<void>;
  upvoteSoftware: (id: string, reason: string) => Promise<void>;
  downvoteSoftware: (id: string, reason: string) => Promise<void>;
}

export const SoftwareContext = createContext<SoftwareContextType | undefined>(
  undefined,
);

export const SoftwareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This is a mock implementation. In a real app, these would interact with your backend
  const getAllSoftware = useCallback(async (): Promise<Software[]> => {
    return [];
  }, []);

  const getSoftwareById = useCallback(async (id: string): Promise<Software> => {
    throw new Error("Software not found");
  }, []);

  const searchSoftware = useCallback(
    async (query: string): Promise<Software[]> => {
      return [];
    },
    [],
  );

  const addToBookmarks = useCallback(async (id: string): Promise<void> => {
    // Implementation would go here
  }, []);

  const upvoteSoftware = useCallback(
    async (id: string, reason: string): Promise<void> => {
      // Implementation would go here
    },
    [],
  );

  const downvoteSoftware = useCallback(
    async (id: string, reason: string): Promise<void> => {
      // Implementation would go here
    },
    [],
  );

  const value = {
    getAllSoftware,
    getSoftwareById,
    searchSoftware,
    addToBookmarks,
    upvoteSoftware,
    downvoteSoftware,
  };

  return (
    <SoftwareContext.Provider value={value}>
      {children}
    </SoftwareContext.Provider>
  );
};

export const useSoftware = () => {
  const context = useContext(SoftwareContext);
  if (context === undefined) {
    throw new Error("useSoftware must be used within a SoftwareProvider");
  }
  return context;
};
