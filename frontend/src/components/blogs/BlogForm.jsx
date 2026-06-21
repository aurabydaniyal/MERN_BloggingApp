// Purpose: Blog creation form
// Why: Allows users to create new blogs
// How: Form with validation and API integration

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    PhotoIcon, 
    DocumentTextIcon, 
    PencilSquareIcon,
    XMarkIcon 
} from '@heroicons/react/24/outline';

const BlogForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        storyline: '',
        coverPhoto: ''
    });
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({
                    ...formData,
                    coverPhoto: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewImage('');
        setFormData({
            ...formData,
            coverPhoto: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/blogs', formData);
            toast.success('Blog created successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="glass-golden rounded-2xl p-8 max-w-3xl mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold text-golden-500 mb-6 text-center">
                    Create New Blog
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Cover Photo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Cover Photo
                        </label>
                        {previewImage ? (
                            <div className="relative">
                                <img 
                                    src={previewImage} 
                                    alt="Cover preview" 
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        ) : (
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="coverPhoto"
                                />
                                <label
                                    htmlFor="coverPhoto"
                                    className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-golden-500 transition-colors"
                                >
                                    <div className="text-center">
                                        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-400">Click to upload cover photo</p>
                                    </div>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title
                        </label>
                        <div className="relative">
                            <DocumentTextIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400"
                                placeholder="Enter blog title"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <div className="relative">
                            <PencilSquareIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                maxLength="200"
                                rows="2"
                                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400 resize-none"
                                placeholder="Short description of your blog"
                            />
                        </div>
                    </div>

                    {/* Storyline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Storyline
                        </label>
                        <textarea
                            name="storyline"
                            value={formData.storyline}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full px-4 py-3 bg-dark-800/50 border border-gray-700 rounded-lg focus:border-golden-500 focus:ring-2 focus:ring-golden-500/20 transition-all text-white placeholder-gray-400 resize-none"
                            placeholder="Write your story here..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-golden-500 to-golden-600 text-dark-900 font-semibold rounded-lg hover:from-golden-400 hover:to-golden-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating...' : 'Publish Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;