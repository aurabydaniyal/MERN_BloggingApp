const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    theme: {
        type: String,
        enum: ['light', 'dark', 'golden'],
        default: 'dark'
    }
}, {
    timestamps: true
});

// Hash password before saving - SIMPLEST VERSION
userSchema.pre('save', function(next) {
    const user = this;
    
    // Only hash if password is modified
    if (!user.isModified('password')) return next();
    
    // Hash password using bcrypt
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);