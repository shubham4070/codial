const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique : true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); // Set timestamps option to an object with createdAt and updatedAt properties

const User = mongoose.model('User', userSchema); // Rename 'user' to 'User' and export it as a variable

module.exports = User;
