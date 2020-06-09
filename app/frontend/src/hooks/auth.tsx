import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import { string } from 'yup';

interface User {
  id: string;
  name: string;
}

interface SignInCredentials {
  email: string;
  password: string;
  userType: string;
}

interface AuthState {
  token: string;
  user: User;
  userType: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  userType: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@OffTalk:token');
    const user = localStorage.getItem('@OffTalk:user');
    const userType = localStorage.getItem('@Offtalk:userType');
    api.defaults.headers.authorization = `Bearer ${token}`;
    if (token && user && userType) {
      return { token, user: JSON.parse(user), userType };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, userType }) => {
    if (userType === 'Customer') {
      const response = await api.post('sessionsCustomer', {
        email,
        password,
      });
      const { token, customer } = response.data;
      localStorage.setItem('@OffTalk:token', token);
      localStorage.setItem('@OffTalk:user', JSON.stringify(customer));
      localStorage.setItem('@Offtalk:userType', userType);
      api.defaults.headers.authorization = `Bearer ${token}`;
      const user = customer;
      setData({ token, user, userType });
    } else if (userType === 'Company') {
      const response = await api.post('sessionsCompany', {
        email,
        password,
      });
      const { token, company } = response.data;
      localStorage.setItem('@OffTalk:token', token);
      localStorage.setItem('@OffTalk:user', JSON.stringify(company));
      localStorage.setItem('@Offtalk:userType', userType);

      api.defaults.headers.authorization = `Bearer ${token}`;

      const user = company;
      setData({ token, user, userType });
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@OffTalk:token');
    localStorage.removeItem('@OffTalk:user');
    localStorage.removeItem('@Offtalk:userType');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, userType: data.userType }}
    >
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
