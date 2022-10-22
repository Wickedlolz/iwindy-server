const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const commentSchema = new Schema({
    phoneId: {
        type: ObjectId,
        ref: 'Phone',
    },
    author: {
        type: ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
