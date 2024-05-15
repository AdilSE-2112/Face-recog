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
        setToken(data.access);

        localStorage.setItem("jwtToken", data.access);
        localStorage.setItem("auth_user_id", data.auth_user_id);
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
