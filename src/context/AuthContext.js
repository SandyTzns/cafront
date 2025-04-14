// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { checkSession } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await checkSession();
      console.log("🌀 fetchUser ran in AuthContext");
      console.log("🔐 isLoggedIn from backend:", res.isLoggedIn);
      console.log("👤 user_id from backend:", res.user_id);
      if (res.success && res.user) {
        setUser(res.user); // Stores { id, first_name, pseudo, avatar }
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
