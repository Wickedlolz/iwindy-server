const router = require('express').Router();

const authService = require('../services/auth');
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

            const user = await authService.register(email, password);
            const token = await authService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
            };

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
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

            const user = await authService.login(email, password);
            const token = await authService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
            };

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            });
            res.status(200).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.get('/logout', isAuth(), async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
        .status(204)
        .json({ message: 'Successfully logged out.' });
});

module.exports = router;
