const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const allowCors = require('../middlewares/allowCors');

module.exports = (app) => {
    app.use(express.json());
    app.use(allowCors());
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(auth());
};
