import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("jwtToken") || ""); 

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        
    }, []);

    const loginAction = async (data) => {
        try {
            // const response = await fetch("your-api-endpoint/auth/login", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(data),
            // });
            // const res = await response.json();
            // if (res.data) {
            //   setUser(res.data.user);
            //   setToken(res.token);
            //   localStorage.setItem("site", res.token);
            //   navigate("/dashboard");
            //   return;
            // }
            throw new Error("CUSTOM ERROR. FROM AUTHCONTEXT");
          } catch (err) {
            console.error(err);
          }
    }

    const logOut = (data) => {
        setUser(null);
        setToken("");
        localStorage.removeItem("jwtToken");
        navigate("/login");
    }

    return (
        <AuthContext.Provider 
            value={{ user, setUser, loginAction, logOut }} 
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}
