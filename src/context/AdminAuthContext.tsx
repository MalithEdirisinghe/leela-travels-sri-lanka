import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AdminAuthContextType {
  adminUser: User | null;
  loading: boolean;
  adminLogin: (email: string, pass: string) => Promise<void>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const adminLogin = async (email: string, pass: string) => {
    // Pure Firebase Authentication call directly to Firebase servers
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const adminLogout = async () => {
    await signOut(auth);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        loading,
        adminLogin,
        adminLogout
      }}
    >
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
