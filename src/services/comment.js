const Comment = require('../models/Comment');

exports.create = async function (userId, phoneId, content) {
    const comment = new Comment({
        author: userId,
        phoneId,
        content,
    });

    await comment.save();

    return comment;
};
