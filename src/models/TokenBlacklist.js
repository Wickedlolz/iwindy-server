const { Schema, model } = require('mongoose');

const tokenBlacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
});

const TokenBlacklist = model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;
