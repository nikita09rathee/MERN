import { createContext,useContext,useState } from "react";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [authState,setAuthState] = useState({ isAuth: true, token: null });
    const login = (token) => {
        setAuthState({isAuth:true,token:token})
    }
    const logout = () => {
        setAuthState({isAuth:false,token:null})
    }
  
    return<AuthContext.Provider value={{login,logout,authState}}>{children}</AuthContext.Provider>

}