const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const commentSchema = new Schema({});

const Comment = model('Comment', commentSchema);
