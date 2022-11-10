const router = require('express').Router();

const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');

router.post('/register', isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.register(email, password);
        const token = await userService.createToken(user);

        const result = {
            email: user.email,
            id: user._id,
        };

        res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });
        res.status(201).json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);
        const token = await userService.createToken(user);

        const result = {
            email: user.email,
            id: user._id,
        };

        res.cookie(process.env.COOKIE_NAME, token, {
            httpOnly: true,
        });
        res.status(200).json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/logout', isAuth(), async (req, res) => {
    res.status(200)
        .clearCookie(process.env.COOKIE_NAME)
        .json({ message: 'Successfully logged out.' });
});

router.post('/add-to-cart', isAuth(), async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const item = await userService.addToCart(userId, productId);
        res.status(201).json(item);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
