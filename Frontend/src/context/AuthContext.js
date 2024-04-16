import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  const login = (token, user) => {
    setAuth({ token, user });
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
