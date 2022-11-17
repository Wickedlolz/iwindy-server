const router = require('express').Router();

const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.post(
    '/register',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress!'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long!'),

    async (req, res) => {
        const { errors } = validationResult(req);
        const { email, password } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const user = await userService.register(email, password);
            const token = await userService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
            };

            res.cookie(process.env.COOKIE_NAME, token, { httpOnly: true });
            res.status(201).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.post(
    '/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress!'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { email, password } = req.body;

        try {
            if (errors.lenght > 0) {
                throw errors;
            }

            const user = await userService.login(email, password);
            const token = await userService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
            };

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
            });
            res.status(200).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

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
