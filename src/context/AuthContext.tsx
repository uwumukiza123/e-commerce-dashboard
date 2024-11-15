import { createContext, useContext } from 'react';

type AuthContextProps = {
  isAuthenticated: boolean;
  user: any;
  token?: (userToken: string) => void;
  logout?: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: {} as any,
});

export const useAuth = () => useContext(AuthContext);
