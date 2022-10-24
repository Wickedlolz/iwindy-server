const express = require('express');
const cors = require('cors');
const auth = require('../middlewares/auth');

const whitelist = ['http://localhost:3000'];

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(auth());
};
