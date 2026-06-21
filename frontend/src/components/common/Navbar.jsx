// Purpose: Navigation component
// Why: Provides navigation and theme controls
// How: Renders responsive navbar with glass effect

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
    HomeIcon, 
    PlusCircleIcon, 
    UserCircleIcon,
    ArrowRightOnRectangleIcon,
    SunIcon,
    MoonIcon,
    SparklesIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout, theme, updateTheme } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleTheme = () => {
        const themes = ['dark', 'light', 'golden'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        updateTheme(nextTheme);
    };

    const getThemeIcon = () => {
        switch(theme) {
            case 'light': return <SunIcon className="w-5 h-5" />;
            case 'golden': return <SparklesIcon className="w-5 h-5 text-golden-500" />;
            default: return <MoonIcon className="w-5 h-5" />;
        }
    };

    return (
        <nav className={`glass fixed top-0 left-0 right-0 z-50 px-4 py-3 ${theme === 'dark' ? 'bg-dark-900/80' : theme === 'golden' ? 'bg-golden-900/80' : 'bg-white/80'}`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-golden-500">✨</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-golden-400 to-golden-600 bg-clip-text text-transparent">
                        BlogSphere
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/" className="text-gray-300 hover:text-golden-400 transition-colors">
                                <HomeIcon className="w-6 h-6" />
                            </Link>
                            <Link to="/create-blog" className="text-gray-300 hover:text-golden-400 transition-colors">
                                <PlusCircleIcon className="w-6 h-6" />
                            </Link>
                            <Link to="/profile" className="text-gray-300 hover:text-golden-400 transition-colors">
                                <UserCircleIcon className="w-6 h-6" />
                            </Link>
                            <button 
                                onClick={toggleTheme}
                                className="text-gray-300 hover:text-golden-400 transition-colors"
                            >
                                {getThemeIcon()}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-1"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                <span className="text-sm">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-golden-400 transition-colors">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-golden-500 text-dark-900 rounded-lg hover:bg-golden-400 transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-300 hover:text-golden-400 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 space-y-3 glass p-4 rounded-lg">
                    {user ? (
                        <>
                            <Link to="/" className="block text-gray-300 hover:text-golden-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link to="/create-blog" className="block text-gray-300 hover:text-golden-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Create Blog
                            </Link>
                            <Link to="/profile" className="block text-gray-300 hover:text-golden-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Profile
                            </Link>
                            <button 
                                onClick={() => {
                                    toggleTheme();
                                    setIsMenuOpen(false);
                                }}
                                className="block text-gray-300 hover:text-golden-400 transition-colors w-full text-left"
                            >
                                Change Theme
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="block text-red-400 hover:text-red-300 transition-colors w-full text-left"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-gray-300 hover:text-golden-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className="block text-golden-500 hover:text-golden-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;