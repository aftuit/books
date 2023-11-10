import { createContext, useContext, useEffect, useState } from "react";

const RegisterContext = createContext({});

export function useRegister() {
  return useContext(RegisterContext);
}

// eslint-disable-next-line react/prop-types
export function RegisterProvider({ children }) {

  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")) || {});
  const [search, setSearch] = useState('');

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  return (
    <RegisterContext.Provider value={{ user, setUser, search, setSearch }}>
      {children}
    </RegisterContext.Provider>
  );
}
