// AuthContext.tsx or AuthContext.ts

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  email: string;
  // other properties
};

type AuthContextType = {
  user: User | null;
  login: (newUser: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Your login logic here
    // setUser({ email: 'retrieved email' });
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    // persist login state
  };

  const logout = () => {
    setUser(null);
    // clear persisted login state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
