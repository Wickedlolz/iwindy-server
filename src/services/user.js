const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');

exports.register = async function (email, password) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    const user = new User({
        email,
        password: hashedPassword,
    });

    await user.save();

    return user;
};

exports.login = async function (email, password) {
    const user = await getUserByEmail(email);

    if (user) {
        throw new Error('Incorect email or password!');
    }

    const isIdentical = await compare(password, user.password);

    if (!isIdentical) {
        throw new Error('Incorect email or password!');
    }

    return user;
};

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

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}
