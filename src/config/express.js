const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const allowCors = require('../middlewares/allowCors');

const whitelist = [
    'https://iwindy.vercel.app/, https://iwindy-server.vercel.app/',
];

module.exports = (app) => {
    app.use(express.json());
    app.use(
        cors({
            credentials: true,
            origin: whitelist,
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
        })
    );
    // app.use(allowCors());
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(auth());
};
