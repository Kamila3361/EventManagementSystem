import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        setAuthenticated(!!token);
    }, []);

    const login = (token, username) => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('username', username, { expires: 7 });
        setAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('username');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
