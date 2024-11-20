import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedToken = localStorage.getItem("token") || "";
    const storedAccess = localStorage.getItem("access") || "[]";
    const storedUser = localStorage.getItem("user") || "";

    if (storedToken && storedAccess && storedUser) {
      return {
        user: storedUser,
        token: storedToken,
        roles: storedAccess,
      };
    }

    return {};
  });

  useEffect(() => {
    if (auth.user) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("access", auth.roles);
      localStorage.setItem("user", auth.user);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("access");
      localStorage.removeItem("user");
    }
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
