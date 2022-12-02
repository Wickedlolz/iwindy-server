const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        discount: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        sizes: [
            {
                type: String,
                required: true,
            },
        ],
        colors: [
            {
                type: String,
                required: true,
            },
        ],
        category: {
            type: String,
            enum: [
                't-shirt',
                'shirts',
                'jeans',
                'jackets',
                'shoes',
                'sleepwear',
                'sweats',
                'dresses',
                'other',
            ],
            default: 'other',
        },
        creator: {
            type: ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Product = model('Product', productSchema);

module.exports = Product;
