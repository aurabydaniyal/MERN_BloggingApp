// Purpose: Blog card component
// Why: Displays individual blog preview
// How: Renders blog data with hover animations

import React from 'react';
import { Link } from 'react-router-dom';
import { 
    CalendarIcon, 
    UserIcon, 
    HeartIcon, 
    ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const BlogCard = ({ blog, index }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div 
            className="glass rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-golden-400 to-golden-600 relative">
                {blog.coverPhoto && (
                    <img 
                        src={blog.coverPhoto} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white line-clamp-2">
                        {blog.title}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-gray-300 line-clamp-3 mb-4">
                    {blog.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                        <UserIcon className="w-4 h-4" />
                        <span>{blog.authorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(blog.dateStamp)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <Link 
                        to={`/blog/${blog._id}`}
                        className="text-golden-500 hover:text-golden-400 transition-colors font-medium"
                    >
                        Read More →
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
                            <span className="text-gray-400">{blog.likes?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-400">{blog.reviews?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;