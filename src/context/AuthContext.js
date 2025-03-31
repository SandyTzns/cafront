// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { checkSession } from "../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await checkSession();
      if (res.isLoggedIn) {
        // You can replace this with a call to get_user.php to fetch full user details
        setUser({ id: res.user_id });
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
