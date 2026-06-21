// Purpose: Homepage component
// Why: Displays all blogs and marquee
// How: Fetches and displays blogs with animations

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import BlogCard from '../blogs/BlogCard';
import { SparklesIcon } from '@heroicons/react/24/solid';

const Home = () => {
    const { user, theme } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marqueeItems] = useState([
        '✨ Welcome to BlogSphere - Where Ideas Come to Life',
        '📝 Share Your Stories with the World',
        '🌟 Join Our Community of Writers',
        '💡 Inspire Others with Your Words'
    ]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/blogs');
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 pb-12">
            {/* Marquee */}
            <div className="marquee-container mb-8">
                <div className="marquee-content text-golden-400 font-medium">
                    {marqueeItems.map((item, index) => (
                        <span key={index} className="mx-8">
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <div className="glass-golden rounded-2xl p-8 mb-12 text-center animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-golden-500 mb-4">
                    Welcome to BlogSphere
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Discover amazing stories, share your thoughts, and connect with writers from around the world.
                </p>
                {!user && (
                    <div className="mt-6 flex justify-center space-x-4">
                        <a href="/signup" className="px-6 py-3 bg-golden-500 text-dark-900 rounded-lg font-semibold hover:bg-golden-400 transition-colors">
                            Get Started
                        </a>
                    </div>
                )}
            </div>

            {/* Blogs Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-golden-500 border-t-transparent"></div>
                </div>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <BlogCard key={blog._id} blog={blog} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No blogs yet. Be the first to share your story!</p>
                </div>
            )}
        </div>
    );
};

export default Home;