const router = require('express').Router();

const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.get('/profile', isAuth(), async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userService.getProfile(userId);
        res.json(user);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/cart', isAuth(), async (req, res) => {
    const userId = req.user.id;

    try {
        const cartItems = await userService.getCartItems(userId);

        res.json(cartItems);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/cart/add', isAuth(), async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const item = await userService.addToCart(userId, productId, quantity);
        res.status(201).json(item);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.delete('/cart/:productId', isAuth(), async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;

    try {
        const removedItem = await userService.removeFromCart(userId, productId);
        res.json(removedItem);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/cart/order/:productId', isAuth(), async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
        const user = await userService.makeOrder(userId, productId);
        res.status(201).json(user);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
