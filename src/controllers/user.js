const router = require('express').Router();

const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.register(email, password);
        const token = await userService.createToken(user);

        const result = {
            email: user.email,
            id: user._id,
            accessToken: token,
        };

        res.status(201).json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const isBlacklisted = await userService.checkIfBlacklisted(
            req.user.token
        );

        if (isBlacklisted) {
            throw new Error('Token is blacklisted.');
        }

        const user = await userService.login(email, password);
        const token = await userService.createToken(user);

        const result = {
            email: user.email,
            id: user._id,
            accessToken: token,
        };

        res.status(200).json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/logout', async (req, res) => {
    try {
        await userService.logout(req.user.token);
        res.status(200).json({ message: 'Successfully logged out.' });
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
