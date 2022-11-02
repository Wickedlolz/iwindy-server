const { validateToken } = require('../services/user');

module.exports = function () {
    return async (req, res, next) => {
        const token = req.cookies[process.env.COOKIE_NAME] || undefined;

        if (token) {
            try {
                const payload = validateToken(token);

                req.user = {
                    email: payload.email,
                    id: payload.id,
                    token,
                };
            } catch (error) {
                return res
                    .status(403)
                    .json({ message: 'Invalid access token. Please sign in.' });
            }
        }

        next();
    };
};
