import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    // const login = (userData) => setUser(userData);
    // const logout = () => setUser(null);
    return (
      <authContext.Provider value={{ user, isAuth, setIsAuth,setUser }}>
        {children}
      </authContext.Provider>
    );
}

export const useAuthProvider = () => useContext(authContext);