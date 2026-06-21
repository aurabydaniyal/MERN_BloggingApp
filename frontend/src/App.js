// Purpose: Main app component
// Why: Routes and layout configuration
// How: Sets up routing and providers

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import BlogForm from './components/blogs/BlogForm';

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-golden-500 border-t-transparent"></div>
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

function AppContent() {
    const { theme } = useAuth();

    return (
        <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-100' : theme === 'golden' ? 'bg-gradient-to-br from-golden-900/20 to-dark-900' : 'bg-dark-900'}`}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                    path="/create-blog" 
                    element={
                        <ProtectedRoute>
                            <BlogForm />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1a1a1a',
                        color: '#fff',
                        border: '1px solid rgba(233, 185, 60, 0.2)',
                    },
                }}
            />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default App;