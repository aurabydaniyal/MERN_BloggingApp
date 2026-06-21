// Purpose: Blog CRUD operations
// Why: Handles all blog-related operations
// How: Manages blog creation, reading, updating, deleting

const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
    try {
        const { title, description, storyline, coverPhoto } = req.body;
        const user = await User.findById(req.user.id);

        const blog = await Blog.create({
            title,
            description,
            storyline,
            coverPhoto: coverPhoto || 'default-cover.jpg',
            author: req.user.id,
            authorName: user.username,
            dateStamp: new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username email')
            .populate('reviews.user', 'username')
            .sort({ dateStamp: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get user's blogs
// @route   GET /api/blogs/me
// @access  Private
exports.getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id })
            .populate('author', 'username email')
            .populate('reviews.user', 'username')
            .sort({ dateStamp: -1 });

        res.status(200).json({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.error('Get my blogs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'username email')
            .populate('reviews.user', 'username');

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            blog
        });
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if user owns the blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this blog'
            });
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            blog
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Check if user owns the blog
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this blog'
            });
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Add review to blog
// @route   POST /api/blogs/:id/reviews
// @access  Private
exports.addReview = async (req, res) => {
    try {
        const { comment } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        const user = await User.findById(req.user.id);

        const review = {
            user: req.user.id,
            userName: user.username,
            comment
        };

        blog.reviews.push(review);
        await blog.save();

        res.status(201).json({
            success: true,
            message: 'Review added successfully',
            blog
        });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Like/Unlike blog
// @route   POST /api/blogs/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        const likeIndex = blog.likes.indexOf(req.user.id);

        if (likeIndex === -1) {
            blog.likes.push(req.user.id);
            await blog.save();
            return res.status(200).json({
                success: true,
                message: 'Blog liked',
                likes: blog.likes.length
            });
        } else {
            blog.likes.splice(likeIndex, 1);
            await blog.save();
            return res.status(200).json({
                success: true,
                message: 'Blog unliked',
                likes: blog.likes.length
            });
        }
    } catch (error) {
        console.error('Toggle like error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};