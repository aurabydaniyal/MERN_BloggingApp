// Purpose: Blog schema for posts
// Why: Defines structure for blog posts
// What: Stores blog content with relationships

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [200, 'Description cannot exceed 200 characters']
    },
    storyline: {
        type: String,
        required: [true, 'Storyline is required']
    },
    coverPhoto: {
        type: String,
        default: 'default-cover.jpg'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    dateStamp: {
        type: Date,
        default: Date.now
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userName: String,
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Blog', blogSchema);