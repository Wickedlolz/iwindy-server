const express = require('express');
const cors = require('cors');

const whitelist = ['http://localhost:3000'];

module.exports = (app) => {
    app.json();
    app.use(cors());
};
