"use client";

import { auth } from "@/firebase";
import {getUserByFirebaseId} from "@/actions/user-actions";
import React, { createContext, useContext, useState, useEffect } from "react";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   role: string;
// }

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthStateChange = async (currentUser) => {
      try {
        if (currentUser) {
          const response = await getUserByFirebaseId(currentUser.uid)
          if (response) {
            setRole(response.role);
            setUser(response);
          }
        } else {
          setUser(null);
          setRole("");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
