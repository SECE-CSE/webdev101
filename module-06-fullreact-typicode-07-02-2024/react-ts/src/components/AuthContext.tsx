import { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    await fetch('https://todoapi.spikeysanju.workers.dev/users/verify', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 13e20026d166d99418c737e0a65cb1482ea2e7f7de5fde9986bb4006c108edde'
            },
      }).then((response) => response.json())
          .then((data) => {
            if (data.results) {
                setIsAuthenticated(true);

                
            }
        })
  };

  const logout = async () => {
    // Make a request to your backend logout endpoint
    // Set isAuthenticated to false
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
