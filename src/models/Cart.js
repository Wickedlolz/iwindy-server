const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const cartSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
        },
        productId: {
            type: ObjectId,
            ref: 'Phone',
        },
    },
    { timestamps: true }
);

const Cart = model('Cart', cartSchema);

module.exports = Cart;
