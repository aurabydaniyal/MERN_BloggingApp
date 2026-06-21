// Purpose: Signup component
// Why: Handles user registration
// How: Form with validation and API integration

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { 
    UserIcon, 
    EnvelopeIcon, 
    LockClosedIcon 
} from '@heroicons/react/24/outline';

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        const { confirmPassword, ...userData } = formData;
        const result = await register(userData);
        
        if (result.success) {
            navigate('/');
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
            <div className="glass-golden rounded-2xl p-8 w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-golden-500">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join the BlogSphere community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                minLength="3"
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400"
                                placeholder="Choose a username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-golden-500 to-golden-600 text-dark-900 font-semibold rounded-lg hover:from-golden-400 hover:to-golden-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-golden-500 hover:text-golden-400 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;