import { createContext, useState } from "react";

export const UserContext = createContext<any>({});

export function UserProvider({ children }: { children: any }) {
  const [username, setUsername] = useState<any>(() => "");
  console.log(username);
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
