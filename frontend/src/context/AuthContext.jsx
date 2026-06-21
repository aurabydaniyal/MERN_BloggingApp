// Purpose: Authentication context
// Why: Manages global auth state
// How: Provides auth data to entire app

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    // Configure axios defaults
    axios.defaults.baseURL = 'http://localhost:5000/api';
    axios.defaults.withCredentials = true;

    // Load user on mount
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await axios.get('/auth/me');
            setUser(response.data.user);
            setTheme(response.data.user.theme || 'dark');
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            setUser(response.data.user);
            setTheme(response.data.user.theme || 'dark');
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return { success: false, error: error.response?.data?.message };
        }
    };

    const login = async (userData) => {
        try {
            const response = await axios.post('/auth/login', userData);
            setUser(response.data.user);
            setTheme(response.data.user.theme || 'dark');
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return { success: false, error: error.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            await axios.get('/auth/logout');
            setUser(null);
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const updateTheme = async (newTheme) => {
        try {
            const response = await axios.put('/auth/theme', { theme: newTheme });
            setTheme(newTheme);
            setUser(response.data.user);
            toast.success('Theme updated!');
            return { success: true };
        } catch (error) {
            toast.error('Failed to update theme');
            return { success: false };
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            theme,
            register,
            login,
            logout,
            updateTheme
        }}>
            {children}
        </AuthContext.Provider>
    );
};