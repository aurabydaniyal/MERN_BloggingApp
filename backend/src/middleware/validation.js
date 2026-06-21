// Purpose: Input validation middleware
// Why: Validates user input before processing
// How: Uses custom validation logic

exports.validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    if (!username || username.length < 3) {
        errors.push('Username must be at least 3 characters');
    }

    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
        errors.push('Please enter a valid email');
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

exports.validateBlog = (req, res, next) => {
    const { title, description, storyline } = req.body;
    const errors = [];

    if (!title || title.length < 3) {
        errors.push('Title must be at least 3 characters');
    }

    if (!description || description.length < 10) {
        errors.push('Description must be at least 10 characters');
    }

    if (!storyline || storyline.length < 20) {
        errors.push('Storyline must be at least 20 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};