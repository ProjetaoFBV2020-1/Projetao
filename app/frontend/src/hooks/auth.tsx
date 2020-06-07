import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  customer: User;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@OffTalk:token');
    const customer = localStorage.getItem('@OffTalk:user');
    api.defaults.headers.authorization = `Bearer ${token}`;
    if (token && customer) {
      return { token, customer: JSON.parse(customer) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessionsCustomer', {
      email,
      password,
    });

    const { token, customer } = response.data;
    localStorage.setItem('@OffTalk:token', token);
    localStorage.setItem('@OffTalk:user', JSON.stringify(customer));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, customer });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@OffTalk:token');
    localStorage.removeItem('@OffTalk:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.customer, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
