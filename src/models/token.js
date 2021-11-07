const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: { 
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: false,
    }

}, {timestamps: true});

module.exports = mongoose.model('Tokens', tokenSchema);
 
