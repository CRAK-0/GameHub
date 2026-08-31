"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/services/auth.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const login = async (data) => {
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
