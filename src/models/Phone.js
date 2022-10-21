const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const phoneSchema = new Schema(
    {
        model: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        creator: {
            type: ObjectId,
            ref: 'User',
        },
        category: {
            type: String,
            enum: [
                'samsung',
                'apple',
                'huawei',
                'xiomi',
                'motorola',
                'nokia',
                'other',
            ],
            default: 'other',
        },
        comments: [{ type: ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

const Phone = model('Phone', phoneSchema);

module.exports = Phone;
