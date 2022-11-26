const User = require('../models/User');
const Cart = require('../models/Cart');

exports.getProfile = async function (userId) {
    const user = await User.findById(userId).populate('myProducts');

    const modifiedUser = {
        cart: user.cart,
        createdAt: user.createdAt,
        email: user.email,
        updatedAt: user.updatedAt,
        _id: user._id,
        myProducts: user.myProducts,
        buyed: user.buyed,
    };

    return modifiedUser;
};

exports.addToMyProducts = async function (userId, productId) {
    const user = await User.findById(userId);
    user.myProducts.push(productId);

    await user.save();
};

exports.getCartItems = async function (userId) {
    const user = await User.findById(userId).populate('cart').lean();

    if (!user) {
        throw new Error('User not found');
    }

    return user.cart;
};

exports.addToCart = async function (userId, productId) {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found!');
    }

    const item = new Cart({ userId, productId });
    await item.save();

    user.cart.push(item);

    await user.save();

    return item;
};

exports.makeOrder = async function (userId) {
    const user = await User.findById(userId).populate('cart');
    user.buyed.push(...user.cart);
    user.cart.splice(0);

    await user.save();

    return user;
};
