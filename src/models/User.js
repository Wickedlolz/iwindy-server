const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        cart: [
            {
                type: ObjectId,
                ref: 'Cart',
            },
        ],
        myProducts: [
            {
                type: ObjectId,
                ref: 'Product',
            },
        ],
        buyed: [
            {
                type: ObjectId,
                ref: 'Product',
            },
        ],
    },
    { timestamps: true }
);

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
