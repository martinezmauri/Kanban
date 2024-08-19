import React, { createContext, useState, ReactNode } from "react";

interface User {
  login: boolean;
  id: string;
  name: string;
  email: string;
  birtdate: Date;
  createdAt: Date;
  updateAt: Date;
  avatar: string;
}
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const defaulUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaulUserContext);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
