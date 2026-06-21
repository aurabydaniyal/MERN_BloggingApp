// Purpose: Blog routes
// Why: Defines API endpoints for blogs
// How: Maps routes to controller functions

const express = require('express');
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    addReview,
    toggleLike
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const { validateBlog } = require('../middleware/validation');

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected routes
router.post('/', protect, validateBlog, createBlog);
router.get('/me', protect, getMyBlogs);
router.put('/:id', protect, validateBlog, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/reviews', protect, addReview);
router.post('/:id/like', protect, toggleLike);

module.exports = router;