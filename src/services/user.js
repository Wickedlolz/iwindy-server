const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');

exports.createToken = function (user) {
    const tokenPromise = new Promise((resolve, reject) => {
        const payload = {
            email: user.email,
            id: user._id,
        };

        jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
            if (error) {
                return reject(error);
            }

            resolve(token);
        });
    });

    return tokenPromise;
};

exports.validateToken = function (token) {
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) {
            throw new Error(error.message);
        }

        return decoded;
    });
};
