'use client';
import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';

export interface IUser {
  userId?: string;
  email?: string;
}

export const AuthContext = createContext<{user: IUser, setUser: (user: IUser) => void}>({
  user: {},
  setUser: () => {}
});

type AuthProps = {
  children: React.ReactNode;
};

export const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>({});

  const values = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const cookie = document.cookie.split(';').map((cookie) => cookie.split('='));
    const userCookie = cookie.find((c) => c[0].trim() === 'user');
    const emailCookie = cookie.find((c) => c[0].trim() === 'email');

    console.log(document.cookie)
    
    if (userCookie && emailCookie) {
      setUser({
        userId: userCookie[1],
        email: emailCookie[1],
      });
    }
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
