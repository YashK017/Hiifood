import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    auth.seedUsers();
    setUser(auth.getSession());
    setReady(true);
  }, []);

  const value = {
    user,
    ready,
    isAdmin: user?.role === "admin",
    login(creds) {
      const u = auth.login(creds);
      setUser(u);
      return u;
    },
    signup(data) {
      const u = auth.signup(data);
      setUser(u);
      return u;
    },
    logout() {
      auth.logout();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
