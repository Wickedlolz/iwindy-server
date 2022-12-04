const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const allowCors = require('../middlewares/allowCors');

const whitelist = [
    'https://iwindy.vercel.app/, https://iwindy-server.vercel.app/',
];

module.exports = (app) => {
    const corsOptions = function (req, callback, next) {
        let options = {
            origin: req.headers('origin'),
            credentials: true,
            allowedHeaders: [
                'x-authorization',
                'X-CSRF-Token',
                'X-Requested-With',
                'Accept',
                'Accept-Version',
                'Content-Length',
                'Content-MD5',
                'Content-Type',
                'Date',
                'X-Api-Version',
            ],
        };

        callback(null, options);
    };

    app.use(express.json());
    app.use(cors(corsOptions));
    // app.use(allowCors());
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(auth());
};
